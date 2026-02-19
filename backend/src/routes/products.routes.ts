import { Router } from "express";
import { getAllProducts, getSingleProduct, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller";
import authMiddleware from "../middleware/jwt.middleware";
import { checkAdminRole } from "../middleware/permission.middleware";
import { upload } from "../config/multer";



const router = Router();

router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)
router.post("/",authMiddleware, checkAdminRole, upload.single('photo_url'), addProduct);
router.patch("/:id", authMiddleware, checkAdminRole, upload.single('photo_url'), updateProduct);
router.delete("/:id", authMiddleware, checkAdminRole, deleteProduct);

export default router;
