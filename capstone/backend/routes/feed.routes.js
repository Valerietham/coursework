import express from 'express';
import * as feedController from '../controllers/feed.controller.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

// POST /api/feeds/record - Record a new feeding event
router.post('/record', feedController.recordFeed);

// GET /api/feeds/adopter/:adopterId - Get all feeds by a specific adopter
router.get('/adopter/:adopterId', feedController.getAdopterFeeds);

// GET /api/feeds/cat/:catId - Get all feeds for a specific cat
router.get('/cat/:catId', feedController.getCatFeeds);

// GET /api/feeds/stats/:adopterId - Get feeding statistics for an adopter
router.get('/stats/:adopterId', feedController.getAdopterFeedStats);

export default router;
