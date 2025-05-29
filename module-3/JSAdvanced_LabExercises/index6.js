// MATH OPERATORS

/* Use the Function prototype to add a new delay(ms) function to all functions, which can
be used to delay the call to that function by ms milliseconds. */

Function.prototype.delay = function (ms) {
  const func = this;
  return function (...args) {
    setTimeout(() => {
      func(...args);
    }, ms);
  };
};

function multiply(a, b) {
  console.log(a * b);
}

/* a) Use the example multiply function below to test it with, as above, and assume that all
delayed functions will take two parameters */

multiply.delay(500)(10, 7); // prints 25 after 500 milliseconds

// b) Use apply to improve your solution so that delayed functions can take any number of parameters

// c) Modify multiply to take 4 parameters and multiply all of them, and test that your delay prototype function still works. */

function multiplyFour(a, b, c, d) {
  console.log(a * b * c * d);
}

multiplyFour.delay(500)(10, 7, 2, 1);
