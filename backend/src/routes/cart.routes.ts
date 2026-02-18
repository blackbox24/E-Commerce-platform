import {Router} from "express"
import { getCartItems, addCartItem, removeCartItem, updateCartItem } from "../controllers/cart.controller.ts"
import authMiddleware from "../middleware/jwt.middleware.ts"

const router = Router()

router.get("/",authMiddleware, getCartItems);
router.post("/",authMiddleware, addCartItem);
router.patch("/:cart_id/",authMiddleware,updateCartItem);
router.delete("/:cart_id/",authMiddleware,removeCartItem);


export default router;