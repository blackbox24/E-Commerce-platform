import {Router } from "express"
import { createStripeSession, stripeWebhook } from "../controllers/checkout.controller.ts"
import authMiddleware from "../middleware/jwt.middleware.ts"

const router  = Router()

router.get("",authMiddleware,createStripeSession)
router.get("/webhook",authMiddleware,stripeWebhook)

export default router;