let listStudentName = ['Jason', 'Valerie', 'Lane', 'Joel', 'Kelvin'];

// potential issues: name can be duplicated
// Map will have the key and value
// The key must be unique and represent the value of the element

let studentMap = new Map();

class Student {
  constructor(studentId, firstName, lastName) {
    this.studentId = studentId;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

let student1 = new Student('IOD1234', 'Jason', 'Tan');

let student2 = new Student('IOD1235', 'Valerie', 'Tham');

let student3 = new Student('IOD1236', 'Lane', 'Lee');

studentMap.set(student1.studentId, student1);
studentMap.set(student2.studentId, student2);
studentMap.set(student3.studentId, student3);

// console.log(studentMap); // print the map
console.log(studentMap.get('IOD1234')); // get the value of the key by searching, way faster
