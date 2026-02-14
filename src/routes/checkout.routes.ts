import {Router } from "express"
import { checkout } from "../controllers/checkout.controller.ts"
import authMiddleware from "../middleware/jwt.middleware.ts"

const router  = Router()

router.get("",authMiddleware,checkout)

export default router;