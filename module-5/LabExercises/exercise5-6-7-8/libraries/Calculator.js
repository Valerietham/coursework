// Lab Exercise 7
// Part 1: Expand the Calculator library from slide 71 to include functions for the other operations, and modify your controller to use the library.
// Part 2: Change the Calculator library to use a randomly generated ID instead of a timestamp
// Part 3: Create a second Logger library to handle logging, and modify the Calculator library to use this Logger to log all requests.

// second Logger Library see -> /libraries/Logger
const Logger = require('./Logger');

class Calculator {
  constructor() {
    this.id = Date.now();
    // use a randomly generated ID instead of a timestamp
    this.id = Math.floor(Math.random() * 1000);
    this.logger = new Logger('Calculator', this.id);
  }

  // Function 1: Add
  add(num1, num2) {
    const value = num1 + num2;
    this.logger.log(value);
    return value;
  }

  // Function 2: Minus
  subtract(num1, num2) {
    const value = num1 - num2;
    this.logger.log(value);
    return value;
  }

  // Function 3: Multiply
  multiply(num1, num2) {
    const value = num1 * num2;
    this.logger.log(value);
    return value;
  }

  // Function 4: Divide
  divide(num1, num2) {
    const value = num1 / num2;
    this.logger.log(value);
    return value;
  }
}
module.exports = Calculator;
