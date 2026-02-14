import { Router } from "express";
import { getAllProducts, getSingleProduct } from "../controllers/product.controller.ts";
import authMiddleware from "../middleware/jwt.middleware.ts";

const router = Router();

router.get("/",authMiddleware, getAllProducts)
router.get("/:id", authMiddleware, getSingleProduct)

export default router;