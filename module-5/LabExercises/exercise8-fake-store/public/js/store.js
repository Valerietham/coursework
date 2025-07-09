let allProducts = [];

// Create a product card for each item
function addCard(product) {
  const template = document
    .getElementById('card-template')
    .content.cloneNode(true);

  // Display Image
  const image = template.querySelector('.card-image');
  image.src = product.image;
  image.alt = product.title;

  // Display Title, Description and Price in SGD
  template.querySelector('.card-title').innerText = product.title;
  template.querySelector('.card-text').innerText = product.description;
  template.querySelector('.card-price').innerText = `SGD $${product.price}`;

  // Set Product Category as an attribute for filtering later
  const cardCol = template.querySelector('.col-12');
  cardCol.setAttribute('data-category', product.category);

  // Appends data
  document.querySelector('#card-list').appendChild(template);
}

// Function to display a list of products
function displayProducts(products) {
  document.querySelector('#card-list').innerHTML = '';
  products.forEach(addCard);
}

// Filter Function
async function filterProducts(category) {
  try {
    const response = await fetch(`/api/products/category/${category}`);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error filtering products:', error);
  }
}

// Load products on page load
async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    allProducts = await response.json();
    displayProducts(allProducts);
    console.log('Products loaded:', allProducts);
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
  // Load products
  loadProducts();

  // Dropdown event listeners
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const dropdownButton = document.querySelector('#categoryFilter');

  dropdownItems.forEach((item) => {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      const category = this.getAttribute('data-category');
      dropdownButton.textContent = this.textContent;
      filterProducts(category);
    });
  });
});
