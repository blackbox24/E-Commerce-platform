import type { Response } from "express"
import pool from "../config/db"
import type { AuthRequest } from "../middleware/jwt.middleware"
import Stripe from "stripe"
import * as dotenv from "dotenv";

dotenv.config()
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(STRIPE_SECRET_KEY)

export const checkout = async(session: Stripe.Checkout.Session) => {
    const client = await pool.connect();
    try{
        const user_id  = session.metadata?.user_id;
        const stripe_session_id = session.id;
        if (!user_id) throw new Error("No user_id found in session metadata");

        await client.query("BEGIN");

        // Idempotency check: Has this session already been processed?
        const orderExists = await client.query("SELECT id FROM orders WHERE stripe_session_id = $1", [stripe_session_id]);
        if (orderExists.rows.length > 0) {
            console.log(`Order for session ${stripe_session_id} already processed. Skipping.`);
            await client.query("ROLLBACK");
            return;
        }

        const CartQuery = `
            SELECT c.user_id, c.quantity, c.product_id, p.name, p.price, p.quantity as stock
            FROM cart_items c
            JOIN products p ON p.id = c.product_id
            WHERE c.user_id =  $1 FOR UPDATE OF p`
        
        const cart = await client.query(CartQuery,[user_id])
        if(cart.rows.length === 0){
            throw new Error("Cart is empty")
        }

        const totalAmount = (session.amount_total || 0) / 100

        // create the order
        const orderResult = await client.query(
            "INSERT INTO orders (user_id, total_amount, status, stripe_session_id) VALUES ($1, $2, 'paid', $3) RETURNING id",
            [user_id, totalAmount, stripe_session_id]
        );
        const orderId = orderResult.rows[0].id;

        for (const item of cart.rows) {
            // Add to order_items
            await client.query(
                "INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)",
                [orderId, item.product_id, item.quantity, item.price]
            );

            // Deduct stock from products
            await client.query(
                "UPDATE products SET quantity = quantity - $1 WHERE id = $2",
                [item.quantity, item.product_id]
            );
        }

        await client.query("DELETE FROM cart_items WHERE user_id = $1", [user_id]);

        await client.query('COMMIT'); // Finalize everything

        console.log(`Order ${orderId} fulfilled successfully for user ${user_id}`);

    }catch(error){
        await client.query('ROLLBACK'); // Undo everything if any step fails
        console.error(error);
        throw error;
    } finally {
        client.release(); // Return connection to pool
    }
}

export const createStripeSession = async(req: AuthRequest, resp: Response) => {
    try {
        const user_id = req.user.id;
        const query = `
            SELECT c.* , p.name, p.price FROM cart_items c
            JOIN products p ON p.id = c.product_id
            WHERE user_id = $1
        `;
        const {rows: cart_items } = await pool.query(query,[user_id]);
        if(cart_items.length === 0){
            return resp.status(400).json({message:"Cart is empty"})
        }

        const line_items = cart_items.map(item => ({
            price_data: {
                currency: "usd",
                product_data: {name: item.name},
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            customer_email: req.user.email,
            metadata: { user_id: user_id.toString() } 
        });

        return resp.status(200).json({message:"session created successfully", url: session.url})
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: "Stripe error", error:error });
    }
}

export const stripeWebhook = async(req: any, resp: Response) => {
    const sig = req.headers['stripe-signature'] || "";
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
    let event;

    try {
        if (!req.rawBody) {
            throw new Error("No raw body found. Ensure express.json({verify:...}) is configured.");
        }
        event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Signature Verification Failed: ${err.message}`);
        return resp.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        try{
            await checkout(session); 
        }catch(error){
            console.error("Order fulfillment failed:", error);
            // We return 200 here to Stripe to acknowledge receipt, 
            // but log the error for internal fixing.
        }
    }

    resp.json({ received: true });
}
