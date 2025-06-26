const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalog.controller');

router.put('/supplier/delete', catalogController.deleteSupplier);
// http://localhost:8000/api/catalog/supplier/delete
// Suppliers: LuxeLiving, DesignHaus, UrbanCore

module.exports = router;
