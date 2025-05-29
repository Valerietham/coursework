const colours = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'red',
  'blue',
  'yellow',
];
const testScores = [55, 84, 97, 63, 55, 32, 84, 91, 55, 43];

const unique = (array) => {
  // Create a new array to store unique values
  const uniqueArr = [];
  // Loop through the original array, checking if each value is already in the uniqueArr
  // If not, add it to the uniqueArr
  for (let i = 0; i < array.length; i++) {
    if (!uniqueArr.includes(array[i])) {
      uniqueArr.push(array[i]);
    }
  }
  // Return the new array with unique values
  return uniqueArr;
};

console.log(unique(colours)); // [ 'red', 'green', 'blue', 'yellow', 'orange' ]
console.log(unique(testScores)); // [ 55, 84, 97, 63, 32, 91, 43 ]
