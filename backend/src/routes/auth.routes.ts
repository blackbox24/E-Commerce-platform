import { Router } from "express";
import { Signup, Login, Logout, GetMe } from "../controllers/auth.controller.ts";
import authMiddleware from "../middleware/jwt.middleware.ts";

const router = Router()

router.post("/register/",Signup);
router.post("/login/",Login);
router.post("/logout/",Logout);
router.get("/me", authMiddleware, GetMe);


export default router;