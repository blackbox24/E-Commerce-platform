import type {Request, Response } from "express"
import pool from "../config/db.ts";

export const getAllProducts = async(req: Request, resp:Response) => {
    try{
        const { name, price } = req.query;

        let products;
        if (name || price){
            const nameSearch = `%${name}%` || null;
            const priceSearch = `%${price}%` || null;
            const query = `
                SELECT name, price, quantity 
                FROM products 
                WHERE ($1::text IS NOT NULL AND name ILIKE $1)
                OR ($2::text IS NOT NULL AND price::text LIKE $2)
            `;
            products = await pool.query(query,[nameSearch,priceSearch]);
        }else{
            products = await pool.query(`SELECT name, price, quantity FROM products`);
        }
        if(products.rows.length === 0){
            return resp.status(200).json({message:"Success",products:[]})
        }
        
        return resp.status(200).json({message:"Success",products:products.rows})
    }catch(error){
        console.error("An error occurried",error)
        return resp.status(500).json({message: "An error occurried",error:error})
    }
}

export const getSingleProduct = async(req: Request, resp:Response) => {
    try{
        const { id } = req.params;

        const product = await pool.query(`SELECT name, price, quantity FROM products WHERE id = $1`, [id]);
        if(product.rows.length === 0){
            return resp.status(404)
                .json(
                    {
                        message: "Product cannot be found",
                        product:[]
                    }
                );
        }

        return resp.status(200).json({message:"Success",product:product.rows[0]})
    }catch(error){
        console.error("An error occurried",error)
        return resp.status(500).json({message: "An error occurried",error:error})
    }
}

