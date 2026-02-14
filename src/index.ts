import express from "express";
import type {Request, Response} from "express"
import cors from "cors";
import * as dotenv from "dotenv"
import auth_router from "./routes/auth.routes.ts"
dotenv.config()


const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth/",auth_router);

app.get("/api/healthy",async(req: Request, resp: Response)=>{
    resp.status(200).json({message:"Server is healthy and running on PORT "+ PORT})
});

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})