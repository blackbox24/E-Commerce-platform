import {Router } from "express"
import { checkout, createStripeSession, stripeWebhook } from "../controllers/checkout.controller.ts"
import authMiddleware from "../middleware/jwt.middleware.ts"

const router  = Router()

router.get("",authMiddleware,createStripeSession)
router.get("/webhook",authMiddleware,createStripeSession)

export default router;