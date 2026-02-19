import type {Request, Response } from "express";
import pool from "../config/db.ts";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()

const BCRYPT_SALT = process.env.BCRYPT_SALT || "10"
const JWT_SECRET = process.env.JWT_SECRET || "secret-here";

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

        const user_exists = await pool.query("SELECT username, email, password, role FROM users WHERE username = $1", [username])

        if(user_exists.rows.length > 0){
            return resp.status(409).json({message:"User already exists"})
        }

        const hashpassword = await bcrypt.hash(password, parseInt(BCRYPT_SALT))
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

        return resp.status(201).json({message: "User successfully created",user:newUser.rows[0]})

    }catch(error){
        console.log(error)
        return resp.status(500).json({message: "An error occurred",error:error})
    }
}


export const Login = async(req: Request, resp: Response) => {
    try{
        const {
            username,
            password
        } = req.body
        const user_exists = await pool.query("SELECT * FROM users WHERE username = $1 ", [username])
        if(user_exists.rows.length === 0){
            return resp.status(400).json({message:"username or password is incorrect"})
        }
        const hash_password = user_exists.rows[0].password;
        const email = user_exists.rows[0].email;
        const role = user_exists.rows[0].role;
        const user_id = user_exists.rows[0].id;
        const validPassword = await bcrypt.compare(password, hash_password);

        if(!validPassword){
           return resp.status(400).json({message:"username or password is incorrect"}); 
        }

                const access_token = jwt.sign({
                    id:user_id,
                    username,email,role
                }, JWT_SECRET as string, {expiresIn: '1d'} )
        
                // Set HTTP-only cookie
                resp.cookie('accessToken', access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });
        
                return resp.status(200).json({message: "Login successfully", user: {
                    username, email, role
                }})
        
        
            }catch(error){
                console.log(error)
                return resp.status(500).json({ message: "An unexpected error occurred during login"});
            }
        }
        
        export const GetMe = async (req: any, resp: Response) => {
            try {
                const user = req.user; // Set by authMiddleware
                if (!user) return resp.status(401).json({ message: "Not authenticated" });
                return resp.status(200).json({ user });
            } catch (error) {
                return resp.status(500).json({ message: "Internal server error" });
            }
        }
        
        export const Logout = async (req: Request, resp: Response) => {
            resp.clearCookie('accessToken');
            return resp.status(200).json({ message: "Logged out successfully" });
        }
        