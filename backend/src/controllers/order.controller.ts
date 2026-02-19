import type { Response } from "express";
import pool from "../config/db.ts";
import type { AuthRequest } from "../middleware/jwt.middleware.ts";

export const getAllClientOrders = async(req: AuthRequest, resp: Response) => {
    try{
        const user_id = req.user.id;
        const results = await pool.query(`
            SELECT  
                o.id AS order_id,
                o.total_amount, 
                o.status,
                o.created_at,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'name', p.name,
                        'quantity', oi.quantity,
                        'unit_price', oi.unit_price,
                        'photo', p.photo_url
                    )
                ) AS items
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON p.id = oi.product_id
            WHERE user_id = $1
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `,[user_id]);
        if(results.rows.length === 0){
            return resp.status(200).json({message:"You do not have any orders"})
        }

        return resp.status(200).json({message:"Success",orders:results.rows})
    }catch(error){
        console.error(error);
        return resp.status(500).json({message:"Unexpected error occurred",error:error})
    }
}

export const getAllAdminOrders = async(req: AuthRequest, resp: Response) => {
    try{
        const results = await pool.query(`
            SELECT  
                o.id AS order_id,
                o.total_amount, 
                o.status,
                o.created_at,
                u.username,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'name', p.name,
                        'quantity', oi.quantity,
                        'unit_price', oi.unit_price,
                        'photo', p.photo_url
                    )
                ) AS items
            FROM orders o
            JOIN users u ON o.user_id = u.id
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON p.id = oi.product_id
            GROUP BY o.id, u.username
            ORDER BY o.created_at DESC
        `);
        if(results.rows.length === 0){
            return resp.status(200).json({message:"No orders found"})
        }

        return resp.status(200).json({message:"Success",orders:results.rows})
    }catch(error){
        console.error(error);
        return resp.status(500).json({message:"Unexpected error occurred",error:error})
    }
}