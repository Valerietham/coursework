// Question: Which of the below are not giving the right answer? Why are they not correct? How can we fix them?

let three = '3';
let four = '4';
let thirty = '30';

//what is the value of the following expressions?
let addition = three + four; // false, correct answer is "34" to fix it we need to convert the strings to numbers
let additionRevised = Number(three) + Number(four); // true 7

console.log(addition);
console.log(additionRevised);

let multiplication = three * four; // true 12
let division = three / four; // true 0.75
let subtraction = three - four; // true -1
let lessThan1 = three < four; // true
let lessThan2 = thirty < four; // true, correct answer is false to fix it we need to convert the strings to numbers
let lessThan2Revised = Number(thirty) < Number(four); // false

console.log(lessThan2);
console.log(lessThan2Revised);
