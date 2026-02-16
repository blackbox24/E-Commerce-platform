import type {Request, Response } from "express"
import pool from "../config/db.ts";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

const BCRYPT_SALT = process.env.BCRYPT_SALT || "10";

export const getAllUsers = async(req: Request, resp: Response) => {
    try {
        const users = await pool.query("SELECT username, first_name, middle_name, last_name, email, role FROM users");
        return resp.status(200).json({message:"users",users:users})
    } catch (error) {
        return resp.status(500).json({message: "Failed to save product", error:error})
    }
}

export const getSingleUser = async(req: Request, resp: Response) => {
    try {
        const { id } = req.params;
        const users = await pool.query("SELECT username, first_name, middle_name, last_name, email, role FROM users WHERE id = $1", [id]);
        if(users.rows.length === 0){
            return resp.status(404).json({message:"User cannot be found"})
        }
        return resp.status(200).json({message:"users",users:users.rows})
    } catch (error) {
        return resp.status(500).json({message: "Failed to save product", error:error})
    }
}

export const addUser = async(req: Request, resp: Response) => {
    try {
        const {
            first_name,
            middle_name,
            last_name,
            username,
            email,
            role,
        } = req.body;

        if(!first_name || !last_name || !username || !email || !role){
            return resp.status(400).json({message: "All fields are required"});
        }

        // auto generate password
        const hash_password = await bcrypt.hash(username, BCRYPT_SALT);
        const query = `
            INSERT INTO 
                users(first_name, middle_name, last_name, username, email, role, password)
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const values = [
            first_name, 
            middle_name || "",
            last_name,
            username,
            email,
            role,
            hash_password
        ]
        const { rows } = await pool.query(query,values);

        return resp.status(201).json({message:"Successfully create a new user",user:rows[0]})

    }catch(error){
        console.log(error);
        if (error?.code === '23505') {
            return resp.status(409).json({ message: "A user with these detail already exists" });
        }
        return resp.status(500).json({message: "Failed to save product", error:error})
    }
}