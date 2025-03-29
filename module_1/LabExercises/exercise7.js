// Write a specification comment for each function
// Write at least 3 unit tests for each function
// In the unit tests, try to include both expected and non-typical test values (such as zero, decimal or negative numbers)

// let a be the first number
// let b be the second number

function sum(a, b) {
  return a + b; // returns the sum of a and b
}

function subtract(a, b) {
  return a - b; // returns the difference of a and b
}

function multiply(a, b) {
  return a * b; // returns the multiplication of a and b
}

function divide(a, b) {
  if (b === 0) {
    // check if b is zero, if b is zero, return an error message
    return 'Cannot divide by zero';
  }
  return a / b; // returns the division of a by b
}

// Unit tests for sum function
if (sum(2, 3) !== 5) {
  console.error('Test Case 1 Failed');
}
if (sum(-1, 1) !== 0) {
  console.error('Test Case 2 Failed');
}
if (sum(2.5, 3.5) !== 6) {
  console.error('Test Case 3 Failed');
}

// Unit tests for subtraction function
if (subtract(5, 3) !== 2) {
  console.error('Test Case 4 Failed');
}
if (subtract(0, 5) !== -5) {
  console.error('Test Case 5 Failed');
}
if (subtract(2.5, 1.5) !== 1) {
  console.error('Test Case 6 Failed');
}

// Unit tests for multiplication function
if (multiply(2, 3) !== 6) {
  console.error('Test Case 7 Failed');
}
if (multiply(-2, 3) !== -6) {
  console.error('Test Case 8 Failed');
}
if (multiply(2.5, 2) !== 5) {
  console.error('Test Case 9 Failed');
}

// Unit tests for division function
if (divide(6, 3) !== 2) {
  console.error('Test Case 10 Failed');
}
if (divide(-5, 2) !== -2.5) {
  console.error('Test Case 11 Failed');
}
if (divide(10, 0) !== 'Cannot divide by zero') {
  console.error('Test Case 12 Failed');
}

console.log('All test cases executed!');
