// Qn. Rewrite the following function using: a) function expression syntax, and b) arrow function syntax. Test each version to make sure they work the same.

// Function Declaration
function getGreeting(name) {
  return 'Hello ' + name + '!';
}

console.log(getGreeting('Valerie')); // 'Hello Valerie!'

// Arrow function syntax + template literals
const getGreeting2 = (name) => {
  return `Hello ${name}!`;
};

console.log(getGreeting2('Valerie')); // 'Hello Valerie!'
