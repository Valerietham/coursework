// first word lowercase
// subsequent words capitalise first letter

function camelCase(cssProp) {
  // split string by "-"
  return (
    cssProp
      .split('-')
      // map over each word
      .map((word, index) => {
        // if not the first word, capitalise the first letter
        if (index !== 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        // if the first word, return it as is
        return word;
      })
      // join the array back into a string
      .join('')
  );
}

console.log(camelCase('margin-left')); // marginLeft
console.log(camelCase('background-image')); // backgroundImage
console.log(camelCase('display')); // display
