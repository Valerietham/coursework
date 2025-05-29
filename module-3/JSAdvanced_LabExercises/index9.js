// PROMISE, TRY CATCH

/* We can delay execution of a function using setTimeout, where we need to provide both
the callback function and the delay after which it should execute.

/* a) Create a promise-based alternative randomDelay() that delays execution for a
random amount of time (between 1 and 20 seconds) and returns a promise we can use
via .then(), as in the starter code below */

// ✅ Enhanced Random Delay Function (Promise-Based)
function randomDelay() {
  return new Promise((resolve, reject) => {
    // Generate a random delay between 1 and 20 seconds (1000ms - 20000ms)
    const delay = Math.floor(Math.random() * 20000 + 1000);

    // setTimeout triggers the promise resolution or rejection after the specified delay.
    setTimeout(() => {
      /*  b) If the random delay is even, consider this a successful delay and resolve the promise,
    and if the random number is odd, consider this a failure and reject it  */
      if (delay % 2 === 0) {
        resolve(`Success: Delay of ${delay}ms`); // even number
      } else {
        reject(`Failure: Delay of ${delay}ms`); // odd number
      }
    }, delay);
  });
}

// Using .then() and .catch() with the Promise
// c) Update the testing code to catch rejected promises and print a different message
// d) Try to update the then and catch messages to include the random delay value - ${error}
randomDelay()
  .then((message) => console.log(message))
  .catch((error) =>
    console.error(`Promise Rejected: ${error}. Please try again.`)
  );
