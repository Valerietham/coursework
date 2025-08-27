import db from '../models/index.js';

export async function createTransaction(transactionData) {
  try {
    const transaction = await db.Transaction.create({
      adopter_id: transactionData.adopter_id,
      kibbles_qty: transactionData.kibbles_qty,
      stripe_product_id: transactionData.stripe_product_id,
      stripe_price_id: transactionData.stripe_price_id,
      amount_sgd: transactionData.amount_sgd,
      stripe_transaction_id: transactionData.stripe_transaction_id,
      status: transactionData.status,
    });
    return transaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

export async function updateTransactionStatus(stripeTransactionId, status) {
  try {
    const transaction = await db.Transaction.findOne({
      where: { stripe_transaction_id: stripeTransactionId }
    });
    
    if (transaction) {
      await transaction.update({ status });
      return transaction;
    }
    return null;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw error;
  }
}

export async function getTransactionByStripeId(stripeTransactionId) {
  try {
    return await db.Transaction.findOne({
      where: { stripe_transaction_id: stripeTransactionId },
      include: [
        {
          model: db.Adopter,
          as: 'adopter',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}
