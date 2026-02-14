import type {Request, Response } from "express";
import pool from "../config/db.ts";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config()

const BCRYPT_SALT = process.env.BCRYPT_SALT || 10

export const Signup = async(req: Request, resp: Response) => {
    try{
        const {
            username,
            email,
            password,
            cpassword,
            first_name,
            middle_name,
            last_name
        } = req.body;

        if(!username || !email || !password || !cpassword || !first_name || !last_name ){
            return resp.status(400).json({message:"All fields are required"});
        }

        if(password !== cpassword){
            return resp.status(400).json({message:"Passwords are not the same"})
        }

        const user_exists = await pool.query("SELECT * FROM users WHERE username = $1 ", [username])

        if(user_exists.rows.length > 0){
            return resp.status(409).json({message:"User already exists"})
        }

        const hashpassword = await bcrypt.hash(password, BCRYPT_SALT)
        const query = `
            INSERT INTO users(first_name, middle_name, last_name, username,email, password, role)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, username, email, role
        `;
        const values = [
            first_name,
            middle_name || "",
            last_name,
            username,
            email,
            hashpassword,
            "user"
        ]

        const newUser = await pool.query(query,values);

        return resp.status(201).json({message: "User successfully created",user:newUser})

        return 
    }catch(error){
        console.log(error)
        resp.status(500).json({message: "An error occurred",error:error})
    }
}