import {
  createCredits,
  getCreditsByAdopterId,
  addCredits,
  subtractCredits,
  getCreditsBalance,
} from '../services/credits.service.js';

// Create new credits record for an adopter
export async function createCreditsRecord(req, res) {
  try {
    const { adopter_id, initial_kibbles = 0 } = req.body;
    
    if (!adopter_id) {
      return res.status(400).json({ error: 'adopter_id is required' });
    }
    
    const credits = await createCredits(adopter_id, initial_kibbles);
    res.status(201).json(credits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// Get credits for a specific adopter
export async function getAdopterCredits(req, res) {
  try {
    const { adopterId } = req.params;
    
    if (!adopterId) {
      return res.status(400).json({ error: 'adopterId is required' });
    }
    
    const credits = await getCreditsByAdopterId(adopterId);
    
    if (!credits) {
      return res.status(404).json({ error: 'No credits record found for this adopter' });
    }
    
    res.json(credits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// Add credits to an adopter's account
export async function addCreditsToAdopter(req, res) {
  try {
    const { adopter_id, kibbles_to_add } = req.body;
    
    if (!adopter_id || !kibbles_to_add) {
      return res.status(400).json({ 
        error: 'adopter_id and kibbles_to_add are required' 
      });
    }
    
    if (kibbles_to_add <= 0) {
      return res.status(400).json({ 
        error: 'kibbles_to_add must be greater than 0' 
      });
    }
    
    const updatedCredits = await addCredits(adopter_id, kibbles_to_add);
    res.json(updatedCredits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// Subtract credits from an adopter's account
export async function subtractCreditsFromAdopter(req, res) {
  try {
    const { adopter_id, kibbles_to_subtract } = req.body;
    
    if (!adopter_id || !kibbles_to_subtract) {
      return res.status(400).json({ 
        error: 'adopter_id and kibbles_to_subtract are required' 
      });
    }
    
    if (kibbles_to_subtract <= 0) {
      return res.status(400).json({ 
        error: 'kibbles_to_subtract must be greater than 0' 
      });
    }
    
    const updatedCredits = await subtractCredits(adopter_id, kibbles_to_subtract);
    res.json(updatedCredits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// Get current credits balance for an adopter
export async function getAdopterCreditsBalance(req, res) {
  try {
    const { adopterId } = req.params;
    
    if (!adopterId) {
      return res.status(400).json({ error: 'adopterId is required' });
    }
    
    const balance = await getCreditsBalance(adopterId);
    res.json(balance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
