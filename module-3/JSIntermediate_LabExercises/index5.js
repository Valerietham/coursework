let twentyCents = 0.2;
let tenCents = 0.1;

console.log(`${twentyCents} + ${tenCents} = ${twentyCents + tenCents}`);
// 0.2 + 0.1 = 0.30000000000000004

// using toFixed() to round to 2 decimal places
let fixedTwenty = twentyCents.toFixed(2); // type of fixedTwenty is string
let fixedTen = tenCents.toFixed(2); // type of fixedTwenty is string
console.log(fixedTwenty + fixedTen); // answer: 0.200.10
// a) Explanation: The output is 0.200.10 which is wrong as the result is a string and not a number.

// b) Create a function currencyAddition(float1, float2) which safely adds the two numbers

function currencyAddition(float1, float2) {
  // change decimal to integer
  return (Math.round(float1 * 100) + Math.round(float2 * 100)) / 100;
}

console.log(currencyAddition(twentyCents, tenCents)); // number 0.3

// c) Create a function currencyOperation(float1, float2, operation)

function currencyOperation(float1, float2, operation) {
  switch (operation) {
    case '+':
      return (Math.round(float1 * 100) + Math.round(float2 * 100)) / 100;

    case '-':
      return (Math.round(float1 * 100) - Math.round(float2 * 100)) / 100;

    case '*':
      // Multiply without scaling, round result to 2 decimals
      return Math.round(float1 * float2 * 100) / 100;

    case '/':
      // Division doesn't need scaling the same way, just round final result
      if (float2 === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return Math.round((float1 / float2) * 100) / 100;
  }
}

console.log(currencyOperation(twentyCents, tenCents, '+')); // 0.3
console.log(currencyOperation(twentyCents, tenCents, '-')); // 0.1
console.log(currencyOperation(twentyCents, tenCents, '*')); // 0.02
console.log(currencyOperation(twentyCents, tenCents, '/')); // 2

// check if the function works

console.log(0.3 == currencyAddition(0.1, 0.2)); // true
console.log(0.3 == currencyOperation(0.1, 0.2, '+')); // true
