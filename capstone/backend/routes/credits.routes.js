import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import {
  createCreditsRecord,
  getAdopterCredits,
  addCreditsToAdopter,
  subtractCreditsFromAdopter,
  getAdopterCreditsBalance,
} from '../controllers/credits.controller.js';

const router = express.Router();

// Create new credits record for an adopter
router.post('/create', requireAuth, createCreditsRecord);

// Get credits for a specific adopter
router.get('/adopter/:adopterId', requireAuth, getAdopterCredits);

// Get current credits balance for an adopter
router.get('/adopter/:adopterId/balance', requireAuth, getAdopterCreditsBalance);

// Add credits to an adopter's account
router.put('/add', requireAuth, addCreditsToAdopter);

// Subtract credits from an adopter's account
router.put('/subtract', requireAuth, subtractCreditsFromAdopter);

export default router;
