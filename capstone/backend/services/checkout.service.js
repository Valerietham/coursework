import stripeModel from '../models/stripe.model.js';
import { handleCheckoutSessionCompleted } from '../controllers/webhook.controller.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1) Create Checkout Session (One-time payment)
export async function handleCheckoutSession(email) {
  try {
    const sessionData = {
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        kibbles_qty: '5',
      },
    };

    const session = await stripeModel.createCheckoutSession(sessionData);

    return { checkoutUrl: session.url };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// 2) Retrieve a Checkout Session (to get customer, subscription, status)
export async function handleGetCheckout(sessionId) {
  if (!sessionId) throw new Error('Missing session_id');

  const session = await stripeModel.retrieveCheckoutSession(sessionId);

  // If payment was successful, record the transaction (fallback to webhooks)
  if (session.payment_status === 'paid' && session.status === 'complete') {
    try {
      await handleCheckoutSessionCompleted(session);
    } catch (error) {
      console.error(
        'Failed to record transaction on session retrieval:',
        error
      );
      // Don't fail the request, just log the error
    }
  }
  return session;
}

export function handleWebhook(body, signature) {
  return stripeModel.constructWebhookEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

export async function fetchStripeLineItems(sessionId, limit = 1) {
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit,
    });
    return lineItems.data;
  } catch (err) {
    throw err;
  }
}
