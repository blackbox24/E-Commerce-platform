import { Router } from "express";
import { getAllAdminOrders, getAllClientOrders } from "../controllers/order.controller.ts";
import authMiddleware from "../middleware/jwt.middleware.ts";
import { checkAdminRole } from "../middleware/permission.middleware.ts";

const router = Router();

router.get("",authMiddleware, getAllClientOrders);
router.get("",authMiddleware,checkAdminRole,getAllAdminOrders);


export default router;