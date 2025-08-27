import {
  handleWebhook,
  fetchStripeLineItems,
} from '../services/checkout.service.js';
import {
  createTransaction,
  updateTransactionStatus,
} from '../services/transaction.service.js';
import { addCredits } from '../services/credits.service.js';
import db from '../models/index.js';

export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = handleWebhook(req.body, sig);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function handleStripeEvent(eventData, eventType) {
  console.log(`Processing ${eventType}:`, eventData.id);

  let transactionId, status, kibblesQty, amountTotal, stripePriceId;

  if (eventType === 'checkout.session.completed') {
    // Handle checkout session
    transactionId = eventData.payment_intent || eventData.id;
    status = eventData.payment_status;
    kibblesQty = parseInt(eventData.metadata?.kibbles_qty || '5');
    amountTotal = eventData.amount_total / 100;

    // Get line item details
    let lineItem = eventData.line_items?.data?.[0];
    if (!lineItem) {
      try {
        const lineItems = await fetchStripeLineItems(eventData.id, 1);
        lineItem = lineItems[0];
      } catch (err) {
        console.error('Failed to fetch line items:', err);
        return;
      }
    }
    stripePriceId = lineItem.price.id;
  } else {
    // Handle payment intent events (succeeded/failed)
    transactionId = eventData.id;
    status = eventData.status;
  }

  // Check if transaction already exists
  const existingTransaction = await db.Transaction.findOne({
    where: { stripe_transaction_id: transactionId },
  });

  if (existingTransaction) {
    // Update existing transaction status
    if (existingTransaction.status !== status) {
      await existingTransaction.update({ status });
      console.log(
        `Transaction ${existingTransaction.id} status updated to ${status}`
      );
    }
    return existingTransaction;
  }

  // Create new transaction (only for checkout.session.completed)
  if (eventType === 'checkout.session.completed') {
    const transactionData = {
      adopter_id: null,
      kibbles_qty: kibblesQty,
      stripe_price_id: stripePriceId,
      amount_sgd: amountTotal,
      stripe_transaction_id: transactionId,
      status: status,
    };

    try {
      const transaction = await createTransaction(transactionData);
      console.log('Transaction recorded successfully:', transaction);
      return transaction;
    } catch (error) {
      console.error('Failed to record transaction:', error);
      throw error;
    }
  }

  console.log(`No transaction found for ${eventType}:`, transactionId);
}

// This function can be called from webhooks OR when retrieving sessions
export async function handleCheckoutSessionCompleted(session) {
  console.log('Checkout session completed:', session.id);

  // Check if transaction already exists
  const existingTransaction = await db.Transaction.findOne({
    where: { stripe_transaction_id: session.payment_intent || session.id },
  });
  console.log('Existing transaction query result:', existingTransaction);

  if (existingTransaction) {
    console.log('Transaction already recorded:', existingTransaction.id);
    return existingTransaction;
  }

  // Extract metadata and session details
  const kibblesQty = parseInt(session.metadata?.kibbles_qty || '5');
  const amountTotal = session.amount_total / 100; // Convert from cents to dollars

  // Get the line item details
  let lineItem = session.line_items?.data?.[0];
  if (!lineItem) {
    // Fetch line items from Stripe API via service if not present in session
    try {
      const lineItems = await fetchStripeLineItems(session.id, 1);
      lineItem = lineItems[0];
      console.log('Fetched line item from Stripe API:', lineItem);
    } catch (err) {
      console.error('Failed to fetch line items from Stripe:', err);
      return;
    }
  }

  // Try to find the adopter by email
  let adopter = null;
  if (session.customer_email) {
    adopter = await db.Adopter.findOne({
      where: { email: session.customer_email },
    });
    console.log('Adopter query result:', adopter);
  }

  // Create transaction record
  const transactionData = {
    adopter_id: adopter?.id || null,
    kibbles_qty: kibblesQty,
    stripe_product_id: lineItem.price.product,
    stripe_price_id: lineItem.price.id,
    amount_sgd: amountTotal,
    stripe_transaction_id: session.payment_intent || session.id,
    status: 'success',
  };

  console.log('Transaction data to be recorded:', transactionData);

  try {
    const transaction = await createTransaction(transactionData);
    console.log('Transaction recorded successfully:', transaction);
    
    // Add credits to the adopter's account if we have an adopter
    if (adopter?.id) {
      try {
        const updatedCredits = await addCredits(adopter.id, kibblesQty);
        console.log('Credits added successfully:', updatedCredits);
      } catch (creditsError) {
        console.error('Failed to add credits:', creditsError);
        // Don't throw here as the transaction was successful
      }
    }
    
    return transaction;
  } catch (error) {
    console.error('Failed to record transaction:', error);
    throw error;
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);

  // Update transaction status if it exists
  try {
    const transaction = await updateTransactionStatus(
      paymentIntent.id,
      'success'
    );
    if (transaction) {
      console.log('Transaction status updated to success:', transaction.id);
    }
  } catch (error) {
    console.error('Failed to update transaction status:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent) {
  console.log('Payment failed:', paymentIntent.id);

  // Update transaction status if it exists
  try {
    const transaction = await updateTransactionStatus(
      paymentIntent.id,
      'failed'
    );
    if (transaction) {
      console.log('Transaction status updated to failed:', transaction.id);
    }
  } catch (error) {
    console.error('Failed to update transaction status:', error);
  }
}
