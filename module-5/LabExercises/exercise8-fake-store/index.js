const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
// import routes
const productRoutes = require('./routes/productRoutes');
// import data
const productModel = require('./models/products');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// map the products routes to our app
app.use('/api/products', productRoutes);

// Initialize products data
async function initializeApp() {
  try {
    await productModel.fetchProducts();
    console.log('Products loaded successfully');

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/store.html`);
    });
  } catch (error) {
    console.error('App Initialisation Failed:', error);
  }
}

initializeApp();
