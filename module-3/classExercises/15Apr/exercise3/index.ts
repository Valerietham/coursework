/* Write a function called checkScore
Input: a score number
If score >= 50 → return "Pass"
Else → return "Fail" */

// normal function

function checkScoreType(score) {
  if (score >= 50) {
    return 'Pass';
  } else {
    return 'Fail';
  }
}

console.log(checkScoreType(45)); // Fail
console.log(checkScoreType(60)); // Pass

// arrow function

const checkScoreArrowType = (score) => {
  return score >= 50 ? 'Pass' : 'Fail';
};

console.log(checkScoreArrowType(45)); // Fail
console.log(checkScoreArrowType(60)); // Pass
