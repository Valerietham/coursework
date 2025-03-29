// Exercise 2: Make a function to remove the duplication in the array
//Instruction: removeDuplicates(["apple", "banana", "apple", "cherry", "banana"]

let fruits = ['apple', 'banana', 'apple', 'cherry', 'banana'];

function removeDuplicates(fruitArr) {
  let uniqueFruits = [];
  for (let i = 0; i < fruitArr.length; i++) {
    if (!uniqueFruits.includes(fruitArr[i])) {
      uniqueFruits.push(fruitArr[i]);
    }
  }
  return uniqueFruits;
}

console.log(fruits);
