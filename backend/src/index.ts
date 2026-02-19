import express from "express";
import type {Request, Response} from "express"
import cors from "cors";
import * as dotenv from "dotenv"
import auth_router from "./routes/auth.routes.ts"
import product_router from "./routes/products.routes.ts"
import cart_router from "./routes/cart.routes.ts"
import checkout_router from "./routes/checkout.routes.ts"
import order_router from "./routes/orders.routes.ts"
import user_router from "./routes/user.route.ts";
import multer, { type StorageEngine} from "multer";

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


dotenv.config()


const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",auth_router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);app.use("/api/products", product_router);
app.use("/api/carts", cart_router);
app.use("/api/checkout",checkout_router);
app.use("/api/orders",order_router);
app.use("/api/users",user_router);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/healthy",async(req: Request, resp: Response)=>{
    resp.status(200).json({message:"Server is healthy and running on PORT "+ PORT})
});

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})