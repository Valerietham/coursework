const productModel = require('../models/products');

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

// Get products by category
async function getProductsByCategory(req, res) {
  try {
    const { category } = req.params;
    const products = productModel.getProductsByCategory(category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter products' });
  }
}

module.exports = {
  getAllProducts,
  getProductsByCategory,
};
