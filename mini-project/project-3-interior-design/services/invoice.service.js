const {
  Invoice,
  Quotation,
  QuotationItem,
  Project,
  Staff,
} = require('../models');

module.exports = {
  async getAllInvoices(req, res) {
    try {
      // Filter invoices by id
      const { invoice_id, page = 1, limit = 5 } = req.query;
      const where = {
        is_deleted: false,
      };

      // function to filter invoices by id
      if (invoice_id) {
        where.invoice_id = invoice_id;
      }

      // Validate pagination parameters
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      // Calculate offset
      const offset = (pageNum - 1) * limitNum;

      // Fetch invoices with count for pagination
      const { count, rows: invoices } = await Invoice.findAndCountAll({
        where,
        attributes: [
          'invoice_id',
          'invoice_number',
          'issue_date',
          'due_date',
          'total_amount',
          'status',
        ],
        include: [
          {
            model: Quotation,
            as: 'quotation',
            attributes: ['quotation_id', 'total_amount', 'status'],
            include: [
              {
                model: QuotationItem,
                as: 'quotationItems',
                attributes: [
                  'item_id',
                  'description',
                  'quantity',
                  'unit_price',
                  'line_total',
                ],
                where: { is_deleted: false },
                required: false,
              },
              {
                model: Staff,
                as: 'createdBy',
                attributes: ['staff_id', 'name', 'email'],
                where: { is_deleted: false },
                required: false,
              },
            ],
            where: { is_deleted: false },
            required: false,
          },
          {
            model: Project,
            as: 'project',
            attributes: ['project_id', 'project_name'],
            where: { is_deleted: false },
            required: false,
          },
        ],
        order: [['invoice_id', 'ASC']],
        limit: limitNum,
        offset: offset,
        distinct: true,
      });

      // Calculate pagination info
      const totalPages = Math.ceil(count / limitNum);

      const response = {
        message: invoice_id
          ? `Showing Invoice with ID '${invoice_id}'`
          : 'Showing all Invoices',
        data: invoices,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount: count,
          limit: limitNum,
        },
      };

      res.json(response);
    } catch (err) {
      console.error('Error in getAllInvoices:', err);
      res.status(500).json({
        error: 'Failed to retrieve invoices',
        details: err.message,
      });
    }
  },
  // PUT Update invoice status
  async updateInvoiceStatus(req, res) {
    try {
      const { invoice_id } = req.params;
      const { status } = req.body;

      console.log('Invoice ID:', invoice_id);
      console.log('New Status:', status);

      // Validate invoice_id
      if (!invoice_id) {
        return res.status(400).json({
          error: 'Invoice ID is required',
        });
      }

      // Validate status
      if (!status) {
        return res.status(400).json({
          error: 'Status is required',
        });
      }

      // Define valid invoice statuses
      const validStatuses = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];
      const normalizedStatus = status.toLowerCase();

      if (!validStatuses.includes(normalizedStatus)) {
        return res.status(400).json({
          error: 'Invalid status value',
          validStatuses: validStatuses,
        });
      }

      // Check if invoice exists
      const existingInvoice = await Invoice.findOne({
        where: {
          invoice_id: invoice_id,
          is_deleted: false,
        },
      });

      if (!existingInvoice) {
        return res.status(404).json({
          error: 'Invoice not found',
        });
      }

      // Business logic validation
      const currentStatus = existingInvoice.status.toLowerCase();

      // Prevent invalid status transitions
      if (currentStatus === 'cancelled') {
        return res.status(400).json({
          error: 'Cannot update status of cancelled invoice',
        });
      }

      if (currentStatus === 'paid' && normalizedStatus !== 'paid') {
        return res.status(400).json({
          error: 'Cannot change status of already paid invoice',
        });
      }

      // Update the invoice status
      const [updatedRows] = await Invoice.update(
        {
          status: normalizedStatus,
          updated_at: new Date(),
        },
        {
          where: {
            invoice_id: invoice_id,
            is_deleted: false,
          },
        }
      );

      if (updatedRows === 0) {
        return res.status(404).json({
          error: 'Invoice not found or no changes made',
        });
      }

      // Fetch updated invoice with related data
      const updatedInvoice = await Invoice.findOne({
        where: {
          invoice_id: invoice_id,
          is_deleted: false,
        },
        include: [
          {
            model: Quotation,
            as: 'quotation',
            attributes: ['quotation_id', 'total_amount', 'status'],
            where: { is_deleted: false },
            required: false,
          },
        ],
        attributes: [
          'invoice_id',
          'invoice_number',
          'issue_date',
          'due_date',
          'total_amount',
          'status',
          'updated_at',
        ],
      });

      res.json({
        success: true,
        message: `Invoice status updated from '${existingInvoice.status}' to '${normalizedStatus}' successfully`,
        data: updatedInvoice,
      });
    } catch (err) {
      console.error('Error in updateInvoiceStatus:', err);
      res.status(500).json({
        error: 'Failed to update invoice status',
        details: err.message,
      });
    }
  },
};
