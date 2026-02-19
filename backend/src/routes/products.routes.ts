import { Router } from "express";
import { getAllProducts, getSingleProduct, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller.ts";
import authMiddleware from "../middleware/jwt.middleware.ts";
import { checkAdminRole } from "../middleware/permission.middleware.ts";
import { upload } from "../config/multer.ts";



const router = Router();

router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)
router.post("/",authMiddleware, checkAdminRole, upload.single('photo_url'), addProduct);
router.patch("/:id", authMiddleware, checkAdminRole, upload.single('photo_url'), updateProduct);
router.delete("/:id", authMiddleware, checkAdminRole, deleteProduct);

export default router;