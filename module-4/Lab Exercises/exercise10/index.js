// Empty array to store all products
let allProducts = [];

// create a product card for each item
function addCard(product) {
  // find card template
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
function filterProducts(category) {
  // Display all products if all categories are selected
  if (category === 'all') {
    displayProducts(allProducts);
  } else {
    // Display selected category
    const filtered = allProducts.filter(
      (product) => product.category === category
    );
    displayProducts(filtered);
  }
}

// Add event listeners to dropdown items
document.addEventListener('DOMContentLoaded', function () {
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const dropdownButton = document.querySelector('#categoryFilter');

  dropdownItems.forEach((item) => {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      const category = this.getAttribute('data-category');
      dropdownButton.textContent = this.textContent;
      // Filter products
      filterProducts(category);
    });
  });
});

// Fetch products from fake API store
fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then((data) => {
    allProducts = data.map((product) => ({
      image: product.image,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
    }));

    // Display all products on first load
    displayProducts(allProducts);
    console.log(allProducts);
  })
  .catch((error) => {
    console.error('Oops..Error fetching products:', error);
  });
