// SET INTERVAL & SET TIMEOUT

/* The Fibonacci sequence of numbers is a famous pattern where the next number in the
sequence is the sum of the previous 2.
e.g. 1, 1, 2, 3, 5, 8, 13, 21, 34, etc.

a) Write a function printFibonacci() using setInterval that outputs a number in
the Fibonacci sequence every second.
*/

function printFibonacci() {
  let firstNumber = 0;
  let secondNumber = 1;
  let thirdNumber = firstNumber + secondNumber;

  const intervalId = setInterval(() => {
    const thirdNumber = firstNumber + secondNumber;
    console.log(thirdNumber);
    firstNumber = secondNumber;
    secondNumber = thirdNumber;
  }, 1000);
}

// printFibonacci();

// b) Write a new version printFibonacciTimeouts() that uses nested setTimeout calls to do the same thing

function printFibonacciTimeouts(limit) {
  let firstNumber = 0;
  let secondNumber = 1;
  let count = 0; // limit counter

  function printNext() {
    if (count >= limit) {
      console.log(`Fibonacci sequence of ${limit} numbers have been completed`);
      return; // Stop the recursion
    }

    const thirdNumber = firstNumber + secondNumber;
    console.log(thirdNumber);

    firstNumber = secondNumber;
    secondNumber = thirdNumber;
    count++;

    // using set timeout to continue the sequence after 1 second
    setTimeout(printNext, 1000);
  }

  // using set timeout to start the sequence
  setTimeout(printNext, 1000);
}

printFibonacciTimeouts(10);
