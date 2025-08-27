import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import {
  getAdopterInterests,
  getAdopterLikes,
  recordCatInterest,
} from '../controllers/interest.controller.js';

const router = express.Router();

// Get all interests for an adopter (with cat details)
router.get('/adopter/:adopterId', requireAuth, getAdopterInterests);
// Get only likes for an adopter (with cat details)
router.get('/adopter/:adopterId/likes', requireAuth, getAdopterLikes);
// Record a like or pass action
router.post('/record', recordCatInterest);

export default router;
