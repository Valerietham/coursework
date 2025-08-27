import express from 'express';
import {
  createCheckout,
  getCheckoutSession,
} from '../controllers/checkout.controller.js';

// getCheckoutSession, createPortalSession,
const router = express.Router();

// Create Checkout Session
router.post('/create-checkout-session', createCheckout);
// Retrieve a Checkout Session (to get customer, subscription, status)
router.get('/checkout-session', getCheckoutSession);

export default router;
