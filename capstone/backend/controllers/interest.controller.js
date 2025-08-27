import {
  getInterestsByAdopter,
  getInterestsByAction,
  createInterest,
  updateInterest,
} from '../services/interest.service.js';

export async function getAdopterInterests(req, res) {
  try {
    const { adopterId } = req.params;
    const interests = await getInterestsByAdopter(adopterId);
    res.json(interests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAdopterLikes(req, res) {
  try {
    const { adopterId } = req.params;
    const likes = await getInterestsByAction(adopterId, 'like');
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function recordCatInterest(req, res) {
  try {
    const { adopterId, catId, action } = req.body;

    if (!['like', 'pass'].includes(action)) {
      return res.status(400).json({ error: 'No action recorded' });
    }

    const interest = await updateInterest(adopterId, catId, action);
    res.json(interest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
