import type { Request, Response } from "express"
import pool from "../config/db.ts"
import type { AuthRequest } from "../middleware/jwt.middleware.ts"

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