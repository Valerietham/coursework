class Student {
  constructor(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  getDetails() {
    return `${this.name}, ${this.age}, ${this.address}`;
  }

  getFirstName() {
    return this.name.split(' ')[0];
  }
}

let student3 = new Student('John Doe', 20, '123 Main St');

let student4 = {
  name: 'Jane Tan',
  age: 20,
  address: '123 Main St',
  location: 'New York',
  getLastName() {
    return this.name.split(' ')[1];
  },
};

console.log(student4.name);
console.log(student4['location']);

console.log(student3.getDetails());
console.log(student3.getFirstName());
console.log(student4.getLastName());

let studentArr = [
  new Student('Valerie Tham', 30, '456 Singapore St'),
  new Student('Jason Tan', 25, '789 Orchard Rd'),
  new Student('Teddy Lim', 35, '101 Orchard Rd'),
  new Student('Alberto Tan', 28, '102 Orchard Rd'),
  new Student('Alex Wong', 22, '103 Orchard Rd'),
];

for (let i = 0; i < studentArr.length; i++) {
  console.log(studentArr[i].getDetails());
}

let over30FirstNames = studentArr
  .filter((student) => student.age > 30)
  .map((student) => student.getFirstName());

console.log(over30FirstNames);

let original = {
  name: 'Valerie',
  scores: [95, 88, 76],
};

let shallowCopy = { ...original };

// Change the top-level `name`
shallowCopy.name = 'Jason';

// Change a nested array item
shallowCopy.scores[0] = 100;

console.log(original);
console.log(shallowCopy);

let orchardResident = studentArr.find((student) =>
  student.address.includes('Orchard Rd')
);

console.log(orchardResident.getDetails());

let alberto = studentArr.find((student) => student.name === 'Alberto Tan');

console.log(alberto.getDetails());

let tan = studentArr.find((student) => student.name.includes('Tan'));

console.log(tan.getDetails());

studentArr.sort((a, b) => a.age - b.age);

studentArr.forEach((student) => console.log(student.getDetails()));

studentArr.sort((a, b) => a.name.localeCompare(b.name));

studentArr.forEach((student) => console.log(student.getDetails()));
