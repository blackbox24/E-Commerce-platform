import express from "express";
import * as dotenv from "dotenv"

dotenv.config()


const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})