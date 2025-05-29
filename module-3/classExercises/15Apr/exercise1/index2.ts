/* Create a function called addNumbers that take 2 arguments a and b and Returns the total of a + b
TS: need to check data type for the input
Example: https://www.typescriptlang.org/docs/handbook/2/functions.html */

/* function addNumbers(a , b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return a + b;
  }
}

console.log(addNumbers(a:10, b:3)); */

/* function addNumbers(a: number, b: number): number | string {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return `${a}${b}`; // Return as string if not both are numbers
  }
  return a + b;
}

console.log(addNumbers(10, 3)); */

function sum(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers.');
  }
  return a + b;
}

console.log(sum(10, 3)); // Output: 13
