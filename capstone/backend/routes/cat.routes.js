import express from 'express';
import {
  getCats,
  getThisCatById,
  createNewCat,
} from '../controllers/cat.controller.js';

const router = express.Router();

// Get all cats (localhost:3000/api/cats)
router.get('/', getCats);
// Get a specific cat by ID (localhost:3000/api/cats/:id)
router.get('/:id', getThisCatById);
// Create a new cat (localhost:3000/api/cats)
router.post('/', createNewCat);

export default router;
