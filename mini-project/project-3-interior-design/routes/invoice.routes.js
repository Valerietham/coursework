const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice.controller');

// 1. Get all invoices - GET /invoices, GET /invoices?invoice_id=1
router.get('', invoiceController.getAllInvoices);
// 2. Change invoice status - PUT /invoices/:invoice_id/status
router.put('/:invoice_id/status', invoiceController.updateInvoiceStatus);

module.exports = router;
