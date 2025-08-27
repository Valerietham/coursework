import express from 'express';
import { handleStripeWebhook } from '../controllers/webhook.controller.js';
import { bodyParserMiddleware } from '../middleware/webhook.middleware.js';

const router = express.Router();

router.post('/', bodyParserMiddleware, handleStripeWebhook);

export default router;
