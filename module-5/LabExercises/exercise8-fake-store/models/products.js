// This will handle data operations
let allProducts = [];

// Fetch products from fake API store (or you could use a database later)
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();

    allProducts = data.map((product) => ({
      id: product.id,
      image: product.image,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
    }));

    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Get all products
function getAllProducts() {
  return allProducts;
}

// Filter products by category
function getProductsByCategory(category) {
  if (category === 'all') {
    return allProducts;
  }
  return allProducts.filter((product) => product.category === category);
}

module.exports = {
  fetchProducts,
  getAllProducts,
  getProductsByCategory,
};
