/* Create a list of 5 student objects. Each student must have the following structure:

name (string)
age (number)
grade (string)

1. Store all 5 students in an array called students.
2. Crete few more students that will have extra fields (define by your own) and add into the array */

let students = [
  { name: 'Tim', age: 20, grade: 'A' },
  { name: 'Tommy', age: 22, grade: 'B' },
  { name: 'Thomas', age: 21, grade: 'C' },
  { name: 'Timothy', age: 23, grade: 'A' },
  { name: 'Tom', age: 19, grade: 'B' },
];

students.push(
  { name: 'Theodora', age: 24, grade: 'A', major: 'Chemistry' },
  { name: 'Titus', age: 20, grade: 'B', CCA: 'Art & Craft' },
  { name: 'Theresa', age: 22, grade: 'C', scholarship: true }
);

console.log(students);

// Using Constructor Class

class Student {
  constructor(name, age, grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;
  }
}

let students2 = [
  new Student('Tim', 20, 'A'),
  new Student('Tommy', 22, 'B'),
  new Student('Thomas', 21, 'C'),
  new Student('Timothy', 23, 'A'),
  new Student('Tom', 19, 'B'),
];
students2.push(
  new Student('Theodora', 24, 'A'),
  new Student('Titus', 20, 'B'),
  new Student('Theresa', 22, 'C')
);
console.log(students2);
