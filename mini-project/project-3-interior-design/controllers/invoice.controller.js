const InvoiceService = require('../services/invoice.service');

module.exports = {
  getAllInvoices: (req, res) => InvoiceService.getAllInvoices(req, res),
  updateInvoiceStatus: (req, res) =>
    InvoiceService.updateInvoiceStatus(req, res),
};
