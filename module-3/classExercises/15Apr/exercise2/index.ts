/* write a function called sumNumber
Input: number n
Output: total sum from 1 to n */

function sumNumbers(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log(sumNumbers(10));
// Output: 55
