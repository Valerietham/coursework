import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import getUsers from '../controllers/user.controller.js';
import { upsertAdopterFromJwtPayload } from '../services/adopter.service.js';

const router = express.Router();

// requireAuth middleware applied to ensure user is authenticated before accessing the route
// Test at http://localhost:3000/api/users/private
router.get('/private', requireAuth, getUsers);

// Idempotent upsert of adopter record once SPA has a valid Auth0 access token
router.post('/me', requireAuth, async (req, res) => {
  try {
    // express-oauth2-jwt-bearer populates req.auth with JWT claims
    const adopter = await upsertAdopterFromJwtPayload(req.auth?.payload, req.body || {});
    res.json({ adopter });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
