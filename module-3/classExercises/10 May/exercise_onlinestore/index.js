class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  reduceStock(quantity) {
    // reduce stock after an order
    if (quantity <= this.stock && quantity > 0) {
      this.stock -= quantity;
      return true; // stocks available
    } else {
      return false; // not enough stock
    }
  }
}

class Customer {
  constructor(id, name, email, orders) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.orders = []; // Initialize as an empty array
  }

  placeOrder(order) {
    // adds order to their list
    this.orders.push(order);
    return order;
  }
}

class Order {
  constructor(id, customer, items, status) {
    this.id = id;
    this.customer = customer;
    this.items = items; // array of { product, quantity }
    this.status = status;
  }

  calculateTotal() {
    return this.items.reduce((total, item) => {
      // total price for the order
      return total + item.product.price * item.quantity;
    }, 0);
  }

  markAsPaid() {
    // changing status to paid
    this.status = 'paid';
  }
}

class Payment {
  constructor(order, amount, method, isSuccessful) {
    this.order = order;
    this.amount = amount;
    this.method = method;
    this.isSuccessful = false;
  }

  process() {
    // simulates payment success and updates order status
    if (this.amount === this.order.calculateTotal()) {
      this.isSuccessful = true;
      this.order.markAsPaid();
      return true;
    }
    return false;
  }
}

function testProductClass() {
  // Create a test product
  const laptop = new Product(101, 'Gaming Laptop', 1299.99, 10);

  // Test product properties
  console.log(
    `Created product: ${laptop.name}, Price: $${laptop.price}, Stock: ${laptop.stock}`
  );

  // Test reduceStock method with valid quantity
  console.log('\nReducing stock by 3 units...');
  const result1 = laptop.reduceStock(3);
  console.log(`Stock reduction successful: ${result1}`);
  console.log(`New stock level: ${laptop.stock}`);

  // Test reduceStock method with excessive quantity
  console.log(
    '\nAttempting to reduce stock by 20 units (more than available)...'
  );
  const result2 = laptop.reduceStock(20);
  console.log(`Stock reduction successful: ${result2}`);
  console.log(`Stock level remains: ${laptop.stock}`);
}

// testProductClass();

/* class Customer {
  constructor(id, name, email, orders) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.orders = []; // Initialize as an empty array
  }

  placeOrder(order) {
    // adds order to their list
    this.orders.push(order);
    return order;
  }
} */

function testCustomerClass() {
  const customer1 = (1001, 'Valerie', 'valerie@gmail.com');
  console.log(`new customer: ${customer1.name}, ${customer1.email}`);
}

testCustomerClass();
