const westley = {
  name: 'Westley',
  numFingers: 5,
};
const rugen = {
  name: 'Count Rugen',
  numFingers: 6,
};

// a. add a lastName property and include it in the greeting
const inigo = {
  firstName: 'Inigo',
  lastName: 'Montoya',
  greeting(person) {
    let greeting = `Hello ${person.name}, my name is ${this.firstName} ${this.lastName}. `;
    console.log(greeting + this.getCatchPhrase(person));
  },
  // b. print famouse catchphrase if the person has 6 fingers
  // c. Update getCatchPhrase to use arrow function syntax and a conditional operator.
  getCatchPhrase: (person) =>
    person.numFingers === 6
      ? 'You killed my father. Prepare to die.'
      : 'Nice to meet you.',
};

inigo.greeting(westley);
inigo.greeting(rugen);

// function expression syntax with if else statement
/* getCatchPhrase(person) {
    if (person.numFingers === 6) {
      return 'You killed my father. Prepare to die';
    } else {
      return 'Nice to meet you';
    }
  }, */
