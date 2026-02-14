import { Pool } from "pg";

import * as dotenv from "dotenv"

dotenv.config()


const DB_USERNAME = process.env.DB_USERNAME || "postgres"
const DB_NAME = process.env.DB_NAME || "test_db"
const DB_PORT = process.env.DB_PORT || "5432"
const DB_PASSWORD = process.env.DB_PASSWORD || ""
const DB_HOST = process.env.DB_HOST || "localhost"

const pool = new Pool({
    user:DB_USERNAME,
    host: DB_HOST,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT),
    database: DB_NAME
})


export default pool;