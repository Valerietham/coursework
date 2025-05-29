// Qn. Rewrite this if using the ternary/conditional operator '?'. Test it with different values for a and b. What does the ‘+=’ do?

let a = 5,
  b = 6;
let result = `${a} + ${b} is `;
let result2 = `${a} + ${b} is `;

// Using if-else statement
if (a + b < 10) {
  result += 'less than 10';
} else {
  result += 'greater than 10';
}

console.log(result); // "5 + 6 is greater than 10"

// Using ternary operator
a + b < 10 ? (result2 += 'less than 10') : (result2 += 'greater than 10');
console.log(result2); // "5 + 6 is greater than 10"

// +- combines the two strings together
