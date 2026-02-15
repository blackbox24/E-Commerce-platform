import express from "express";
import type {Request, Response} from "express"
import cors from "cors";
import * as dotenv from "dotenv"
import auth_router from "./routes/auth.routes.ts"
import product_router from "./routes/products.routes.ts"
import cart_router from "./routes/cart.routes.ts"
import checkout_router from "./routes/checkout.routes.ts"
import order_router from "./routes/orders.routes.ts"
import multer, { type StorageEngine} from "multer";

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now you can use it as usual
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage:StorageEngine  = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})


const upload = multer({ storage: storage})

dotenv.config()


const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",auth_router);
app.use("/api/products",  upload.single('photo_url'), product_router);
app.use("/api/carts", cart_router);
app.use("/api/checkout",checkout_router);
app.use("/api/orders",order_router);

app.get("/api/healthy",async(req: Request, resp: Response)=>{
    resp.status(200).json({message:"Server is healthy and running on PORT "+ PORT})
});

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})