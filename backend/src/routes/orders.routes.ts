import { Router } from "express";
import { getAllAdminOrders, getAllClientOrders } from "../controllers/order.controller";
import authMiddleware from "../middleware/jwt.middleware";
import { checkAdminRole } from "../middleware/permission.middleware";

const router = Router();

router.get("/",authMiddleware, getAllClientOrders);
router.get("/admin",authMiddleware,checkAdminRole,getAllAdminOrders);


export default router;
