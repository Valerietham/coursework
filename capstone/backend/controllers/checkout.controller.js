import {
  handleCheckoutSession,
  handleGetCheckout,
} from '../services/checkout.service.js';

// 1. Create checkout sessions
export async function createCheckout(req, res) {
  try {
    const { email } = req.body;
    const session = await handleCheckoutSession(email);
    res.json({ url: session.checkoutUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// 2. Retrieve a Checkout Session (to get customer, subscription, status)
export async function getCheckoutSession(req, res) {
  try {
    const { session_id } = req.query;
    if (!session_id)
      return res.status(400).json({ error: 'Missing session_id' });
    const session = await handleGetCheckout(session_id);
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
