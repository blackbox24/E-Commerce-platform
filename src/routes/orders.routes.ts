import { Router } from "express";
import { getAllOrders } from "../controllers/order.controller.ts";
import authMiddleware from "../middleware/jwt.middleware.ts";

const router = Router();

router.get("",authMiddleware, getAllOrders);


export default router;