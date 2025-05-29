// Exercise 1:
// Given an array of students with score, use map() to add a passed: true/false field based on score >= 60

const students = [
  { name: 'John', score: 75 },
  { name: 'Jane', score: 55 },
];

// Given passing score is 60

const studentsWithPassStatus = students
  .filter((student) => student.score >= 60)
  .map((student) => ({
    name: student.name,
    score: student.score,
    passed: true,
  }));
console.log(studentsWithPassStatus);
// Output: [ { name: 'John', score: 75, passed: true } ]
