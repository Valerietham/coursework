/* Write a function called checkScore
Input: a score number
If score >= 50 → return "Pass"
Else → return "Fail" */

// normal function

function checkScore(score) {
  if (score >= 50) {
    return 'Pass';
  } else {
    return 'Fail';
  }
}

console.log(checkScore(45)); // Fail
console.log(checkScore(60)); // Pass

// arrow function

const checkScoreArrow = (score) => {
  return score >= 50 ? 'Pass' : 'Fail';
};

console.log(checkScoreArrow(45)); // Fail
console.log(checkScoreArrow(60)); // Pass
