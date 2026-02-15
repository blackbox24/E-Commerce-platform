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
                SELECT id, name, price, quantity 
                FROM products 
                WHERE ($1::text IS NOT NULL AND name ILIKE $1)
                OR ($2::text IS NOT NULL AND price::text LIKE $2)
            `;
            products = await pool.query(query,[nameSearch,priceSearch]);
        }else{
            products = await pool.query(`SELECT id, name, price, quantity FROM products`);
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


export const addProduct = async(req:Request, resp: Response) => {
    try{
        const {
            name, 
            quantity,
            price,
        } = req.body

        if(!name || !quantity || !price){
            return resp.status(400).json({message: "Name, quantity and price fields are required"})
        }
        if(price <= 0 || quantity < 1){
            return resp.status(400).json({message: "Quantity or price should be more than 1"});
        }
        let photo_url;
        if( req.file ){
            // store the file locally
            photo_url = req.file.path;
            console.log(req.file.path)
        }
        else{
            photo_url = null;
        }
        const {rows} = await pool.query(`
            INSERT INTO products(name, price, quantity, photo_url) VALUES ($1, $2, $3, $4) RETURNING *;
        `,[
            name, 
            price,
            quantity,
            photo_url
            
        ])

        return resp.status(201).json({message: "Success", product: rows[0]})
    }catch(error){
        console.log(error);
        if (error?.code === '23505') {
            return resp.status(409).json({ message: "A product with this name already exists" });
        }
        return resp.status(500).json({message: "Failed to save product", error:error})
    }
}