function Person(name, age) {
  this.name = name;
  this.age = age;
  this.human = true;
  this.canDrive = function () {
    return this.age >= 18;
  };
}

let person1 = new Person('Valerie', 18);
let person2 = new Person('Bryan', 22);

console.log(person1); // Person { name: 'Valerie', age: 18, human: true }
console.log(person2); // Person { name: 'Bryan', age: 22, human: true }

// rewrite the above code using class
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.human = true;
  }
  canDrive() {
    return this.age >= 18;
  }
}

let person3 = new PersonClass('Rayden', 2);
console.log(person3); // PersonClass { name: 'Rayden', age: 2, human: true }

// Check if the person can drive
console.log(person1.canDrive()); // true
console.log(person2.canDrive()); // true
console.log(person3.canDrive()); // false
