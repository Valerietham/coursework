const CatalogService = require('../services/catalog.service');

module.exports = {
  deleteSupplier: (req, res) => CatalogService.deleteSupplier(req, res),
};
