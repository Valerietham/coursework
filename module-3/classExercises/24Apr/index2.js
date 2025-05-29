// Exercise 2:
// First, sort by score in descending order.
// If two students have the same score, sort them by age in ascending order.

const students2 = [
  { name: 'Alice', score: 88, age: 22 },
  { name: 'Bob', score: 88, age: 20 },
  { name: 'Charlie', score: 95, age: 23 },
  { name: 'Diana', score: 60, age: 21 },
  { name: 'Eve', score: 95, age: 22 },
];

// Sort by score in descending order
students2.sort((a, b) => b.score - a.score);

students2.forEach((student) => console.log(student));

// Sort by score in descending order AND age in ascending order

students2.sort((a, b) => {
  if (b.score === a.score) {
    return a.age - b.age; // Sort by age in ascending order
  }
  return b.score - a.score; // Sort by score in descending order
});
students2.forEach((student) => console.log(student));
