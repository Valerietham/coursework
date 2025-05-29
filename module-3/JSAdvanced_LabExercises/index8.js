// Decorator function

function orderItems(itemName) {
  return `Order placed for: ${itemName}`;
}
// create a decorated version of the original function
const validatedOrderItem = validateStringArg(orderItems);
console.log(validatedOrderItem('Apple Watch')); // Order placed for: Apple Watch
// console.log(validatedOrderItem(123)); // Error: Argument must be a string

// a) Create a decorator function validateStringArg(fn) which will validate an
// argument passed to fn to ensure that it is a string, throwing an error if not

function validateStringArg(fn) {
  return function (...args) {
    for (const arg of args) {
      if (typeof arg !== 'string') {
        throw new Error('Argument must be a string');
      }
    }
    return fn(...args);
  };
}

// b) Extend orderItems to use the ... rest operator, allowing multiple item name
// arguments, and include them all in the returned string

function orderItems(...itemNames) {
  return `Order placed for: ${itemNames.join(', ')}`;
}

console.log(validatedOrderItem('iPhone', 'MacBook')); // Order placed for: iPhone, MacBook

// c) Extend the decorator function to validate as strings all arguments passed to fn

function validateStringArg(fn) {
  return function (...args) {
    // Check if every argument is a string
    if (!args.every((arg) => typeof arg === 'string')) {
      throw new Error('Error: All arguments must be strings');
    }
    return fn(...args);
  };
}

console.log(validatedOrderItem('iPhone', 'MacBook', 'ipad')); // Output: Order placed for: iPhone, MacBook, ipad
// console.log(validatedOrderItem('iPad', 123)); // Throws an error: Error: All arguments must be strings

// d) When testing the decorated function, use try-catch blocks to handle errors thrown for non-string arguments

try {
  console.log(validatedOrderItem('iPad', 123));
} catch (error) {
  console.error(error.message);
}

// output: Error: All arguments must be strings
