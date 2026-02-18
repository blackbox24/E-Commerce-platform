import { Router } from "express";
import { Signup, Login } from "../controllers/auth.controller.ts";

const router = Router()

router.post("/register/",Signup);
router.post("/login/",Login);


export default router;