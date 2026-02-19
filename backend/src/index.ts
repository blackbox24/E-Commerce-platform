import express from "express";
import type {Request, Response} from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv"
import auth_router from "./routes/auth.routes"
import product_router from "./routes/products.routes"
import cart_router from "./routes/cart.routes"
import checkout_router from "./routes/checkout.routes"
import order_router from "./routes/orders.routes"
import user_router from "./routes/user.route";

import { fileURLToPath } from 'url';
import path from 'path';


dotenv.config()


const PORT = process.env.PORT || 3000

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))
app.use(express.json({
    verify: (req: any, res, buf) => {
        if (req.originalUrl.startsWith('/api/checkout/webhook')) {
            req.rawBody = buf;
        }
    }
}))
app.use(cookieParser())

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
