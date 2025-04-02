// Use the learnings from this lesson to design some very simple functions. Call them with different values.
// 1. Create 4 functions for the 4 main mathematical operations (-,+,/,*). Return the calculated value and then output it to the screen.

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Cannot divide by zero';
  }
  return a / b;
}

console.log('Sum:', sum(8, 4));
console.log('Subtract:', subtract(8, 13));
console.log('Multiply:', multiply(4, 7));
console.log('Divide:', divide(20, 4));
console.log('Divide:', divide(3, 0));

// 2. Create a function that takes the name of a person as an argument, and prints out “Hello <name>” to the console. Hint: search online on how to concatenate two strings.

let name = 'Valerie';

function greet(name) {
  return 'Hello ' + name + '!';
}
console.log(greet(name));
