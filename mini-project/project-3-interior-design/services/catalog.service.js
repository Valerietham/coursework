const { Catalog } = require('../models');

module.exports = {
  // Soft delete supplier items
  async deleteSupplier(req, res) {
    try {
      const { supplier } = req.body;

      // Check supplier name
      if (!supplier || supplier.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Please provide a supplier name in request body',
        });
      }

      const [affectedRows] = await Catalog.update(
        {
          is_deleted: 1,
          updated_at: new Date(),
        },
        {
          where: {
            supplier: supplier.trim(),
            is_deleted: 0,
          },
        }
      );

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: `No active items found for supplier: ${supplier}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Successfully deleted ${affectedRows} items from supplier: ${supplier}`,
        affectedRows: affectedRows,
      });
    } catch (error) {
      console.error('Error deleting supplier:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete supplier',
        error: error.message,
      });
    }
  },
};
