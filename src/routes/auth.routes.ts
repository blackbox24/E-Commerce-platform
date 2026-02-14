import { Router } from "express";
import { Signup } from "../controllers/auth.controller.ts";

const router = Router()

router.post("/register/",Signup)


export default router;