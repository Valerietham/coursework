let salaries = {
  Timothy: 35000,
  David: 25000,
  Mary: 55000,
  Christina: 75000,
  James: 43000,
};

// a) Write a function sumSalaries(salaries) that calculates and returns the total of all salaries

function sumSalaries(salaries) {
  let total = 0;
  for (const salary of Object.values(salaries)) {
    total += salary;
  }
  return total;
}

console.log('Total Salaries:', sumSalaries(salaries)); // Total Salaries: 233000

// b) Write a function topEarner(salaries) that calculates and returns the name of the person earning the highest salary

function topEarner(salaries) {
  let maxSalary = 0;
  let topEarnerName = '';

  for (const [name, salary] of Object.entries(salaries)) {
    if (salary > maxSalary) {
      maxSalary = salary;
      topEarnerName = name;
    }
  }

  return topEarnerName + ' $' + maxSalary;
}

console.log('Highest Salary:', topEarner(salaries)); // Christina $75000
