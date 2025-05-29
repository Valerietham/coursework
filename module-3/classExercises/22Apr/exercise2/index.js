class Student {
  constructor(id, name, grade, dob) {
    this.id = id;
    this.name = name;
    this.grade = grade;
    this.dob = dob;
  }
}

let studentArr = [
  new Student(1, 'Jason', 50, '27/01/1990'),
  new Student(2, 'Teddy', 80, '27/03/1989'),
  new Student(3, 'Alberto', 60, '11/01/1995'),
  new Student(4, 'Alex', 95, '18/12/1992'),
  new Student(5, 'David', 88, '07/05/1997'),
  new Student(6, 'James', 20, '20/02/1986'),
];

// printing out the dob of all students

studentArr.forEach((student) => {
  console.log(student.dob);
});

/* // sort the dob of all students from youngest to oldest
let sortedStudents = studentArr.sort((a, b) => {
  return new Date(a.dob) - new Date(b.dob);
});

console.log(sortedStudents); */

// Sort students from youngest to oldest
studentArr.sort((a, b) => {
  // Parse dates from DD/MM/YYYY format
  const [dayA, monthA, yearA] = a.dob.split('/');
  const [dayB, monthB, yearB] = b.dob.split('/');

  // Create Date objects (month is 0-indexed in JavaScript Date)
  const dateA = new Date(yearA, monthA - 1, dayA);
  const dateB = new Date(yearB, monthB - 1, dayB);

  return dateB - dateA;
});

// Print the sorted students
studentArr.forEach((student) => {
  console.log(student.dob);
});
