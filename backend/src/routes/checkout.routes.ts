import {Router } from "express"
import { createStripeSession, stripeWebhook } from "../controllers/checkout.controller"
import authMiddleware from "../middleware/jwt.middleware"

const router  = Router()

router.get("",authMiddleware,createStripeSession)
router.post("/webhook",stripeWebhook)

export default router;
