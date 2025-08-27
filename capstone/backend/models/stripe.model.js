import stripe from '../config/stripe.js';

class StripeModel {
  async createCheckoutSession(sessionData) {
    if (!stripe) {
      throw new Error('Stripe not configured - missing STRIPE_SECRET_KEY');
    }
    return await stripe.checkout.sessions.create(sessionData);
  }

  async retrieveCheckoutSession(sessionId) {
    if (!stripe) {
      throw new Error('Stripe not configured - missing STRIPE_SECRET_KEY');
    }
    return await stripe.checkout.sessions.retrieve(sessionId);
  }

  constructWebhookEvent(body, signature, secret) {
    if (!stripe) {
      throw new Error('Stripe not configured - missing STRIPE_SECRET_KEY');
    }
    return stripe.webhooks.constructEvent(body, signature, secret);
  }
}

export default new StripeModel();
