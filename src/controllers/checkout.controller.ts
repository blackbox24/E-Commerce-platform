import type { Request, Response } from "express"
import pool from "../config/db.ts"
import type { AuthRequest } from "../middleware/jwt.middleware.ts"
import Stripe from "stripe"
import * as dotenv from "dotenv";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
export const checkout = async(req: AuthRequest, resp: Response) => {
    const client = await pool.connect();
    try{
        // TODO 
        // BEGIN AND END TRANSACTION
        // CREATE AN ORDER
        // ADD THE PRODUCTS TO THE ORDER ITEMS TABLE
        // REMOVE ITEMS FROM CART

        const user_id  = req.user.id;
        await client.query("BEGIN");

        const CartQuery = `
            SELECT c.user_id, c.quantity, c.product_id, p.name, p.price, p.quantity as stock
            FROM cart_items c
            JOIN products p ON p.id = c.product_id
            WHERE c.user_id =  $1 FOR UPDATE OF p`
        
        const cart = await client.query(CartQuery,[user_id])
        if(cart.rows.length === 0){
            throw new Error("Cart is empty")
        }

        let totalAmount = 0;
        for(const item of cart.rows){
            if(item.stock < item.quantity){
                throw new Error("Insufficient stock for product ID: " + item.product_id)
            }
            totalAmount += item.price * item.quantity;
        }

        // create the order
        const orderResult = await client.query(
            "INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, 'paid') RETURNING id",
            [user_id, totalAmount]
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

        return resp.status(200).json({ message: "Checkout successful", orderId });

    }catch(error){
        await client.query('ROLLBACK'); // Undo everything if any step fails
        console.error(error);
        return resp.status(400).json({ message: error?.message || "Checkout failed" });
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