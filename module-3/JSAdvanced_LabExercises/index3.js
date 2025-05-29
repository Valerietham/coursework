// DEBOUNCING

// a) Debounce function thst suspends calls to func until there's 1000 milliseconds of inactivity
// solution from: https://www.freecodecamp.org/news/javascript-debounce-example/
function debounce(func) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), 1000);
  };
}

function printMe(message) {
  console.log(`printing debounced message: ${message}`);
}
printMe = debounce(printMe); //create this debounce function for a)

//fire off 3 calls to printMe within 300ms - only the LAST one should print, after 1000ms of no calls
setTimeout(printMe, 100, 'This is the first message'); // triggered but cancelled
setTimeout(printMe, 200, 'This is the second message'); // triggered but cancelled
setTimeout(printMe, 300, 'This is the last message'); // printed out after 1300ms
