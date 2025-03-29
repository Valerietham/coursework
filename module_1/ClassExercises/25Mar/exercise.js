const students = [
  { name: 'Alice', age: 20, grade: 85 },
  { name: 'Bob', age: 22, grade: 92 },
  { name: 'Charlie', age: 19, grade: 78 },
  { name: 'David', age: 21, grade: 88 },
  { name: 'Eve', age: 20, grade: 95 },
];

console.log(students);

// print all the students name
// Iterate over the students array and print the name of each student using LOPP

for (let i = 0; i < students.length; i++) {
  console.log(students[i].name);
}

// data sanitization

// 2. Get the average score
// Step 1: Create a variable to store the sum of all the grades

let sum = 0;
for (let i = 0; i < students.length; i++) {
  if (students[i]?.grade) {
    sum = sum + students[i]?.grade; // for each iteration, we will add the grade of each student to the sum
    // sum all the grade of the students
  }
}
console.log(`Average score is ${sum / students.length}`);

// 3. Get the student with the highest grade
// Step 1: Create a variable to store the highest grade
// Potential issue: What if students have the same grade?

let highestGrade = 0;
let studentWithHighestGrade = [];
for (let i = 0; i < students.length; i++) {
  if (students[i]?.grade > highestGrade) {
    highestGrade = students[i]?.grade;
    studentWithHighestGrade = students[i];
  }
}
console.log(`Student with highest grade is ${studentWithHighestGrade?.name}`);
