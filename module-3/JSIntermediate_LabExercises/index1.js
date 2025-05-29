function ucFirstLetters(string) {
  return (
    string
      // Split the string into individual words
      .split(' ') // [ 'los', 'angeles' ]
      // Map over each word and capitalize the first letter
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // [ 'Los', 'Angeles' ]
      // // Join the words back together
      .join(' ') // 'Los Angeles'
  );
}

console.log(ucFirstLetters('los angeles')); // Los Angeles
console.log(
  ucFirstLetters('this sentence needs to be capitalise at the first character') //This Sentence Needs To Be Capitalise At The First Character
);
