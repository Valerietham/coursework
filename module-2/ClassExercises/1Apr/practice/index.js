// Exercise #1: Create a table in HTML and populate it with data from a JavaScript array

const products = [
  { name: 'Laptop', price: 999.99, inStock: true },
  { name: 'Smartphone', price: 599.49, inStock: false },
  { name: 'Keyboard', price: 49.99, inStock: true },
];

// Function to create a table and populate it with product data

function myFunction() {
  var table = document.getElementById('product-list');

  // Loop through the products array
  for (let i = 0; i < products.length; i++) {
    var row = table.insertRow(-1); // -1 appends to the end of the table
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.textContent = products[i].name;
    cell2.textContent = '$' + products[i].price.toFixed(2);
    cell3.textContent = products[i].inStock ? 'Yes' : 'No';
  }
}

// Exercise #2: Create a filter for the table

// Step 1: Get value of the filter
const filterSelect = document.getElementById('stock-filter');

//  Initial table render - default is all option
renderTable('all');


all.textContent = ;


//Handle filter change
filterSelect.addEventListener('change', () => {
  // Make a new function to re-redner the table when the filter change
  renderTable(filterSelect.value);
});

function renderTable(filter) {
  for (let i = 0; i < products.length; i++) {
    // Filter logic
    if (filter === 'in-stock' && !products.inStock) {
      row.style.display = 'none';
    } else if (filter === 'out-of-stock' && products.inStock) {
      row.style.display = 'none';
    } else {
      row.style.display = '';
    }
  }
}
