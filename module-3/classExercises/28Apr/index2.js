// step 1: create the map

const employees = new Map();

// step 2: add all the employees to the map
employees.set('Alice', 'Sales');
employees.set('Bob', 'IT');
employees.set('Charlie', 'HR');
employees.set('Daisy', 'Marketing');
employees.set('Nathan', 'Finance');
employees.set('Fiona', 'IT');
employees.set('Josh', 'IT');
employees.set('Lucy', 'Finance');

// step 3: print a message for each employee

for (const [name, department] of employees) {
  console.log(`Employee ${name} works in ${department} department.`);
}

// step 4: Filter out all employees who work in IT

for (const [name, department] of employees) {
  if (department === 'IT') {
    console.log(`${name}, ${department}`);
  }
}
