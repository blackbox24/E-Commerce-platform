import { Router } from "express";
import { getAllProducts, getSingleProduct, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller.ts";
import authMiddleware from "../middleware/jwt.middleware.ts";
import { checkAdminRole } from "../middleware/permission.middleware.ts";



const router = Router();

router.get("/",authMiddleware, getAllProducts)
router.get("/:id", authMiddleware, getSingleProduct)
router.post("/",authMiddleware, checkAdminRole,addProduct);
router.patch("/:id", authMiddleware, checkAdminRole, updateProduct);
router.delete("/:id", authMiddleware, checkAdminRole, deleteProduct);

export default router;