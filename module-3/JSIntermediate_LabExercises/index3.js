const animals = ['Tiger', 'Giraffe'];
console.log(animals); // [ 'Tiger', 'Giraffe' ]

// add 2 new values to the end
animals.push('Kitty', 'Rabbit');
console.log(animals); // [ 'Tiger', 'Giraffe', 'Kitty', 'Rabbit' ]

// add 2 new values to the beginning
animals.unshift('Hamster', 'Parrot');
console.log(animals); // [ 'Hamster', 'Parrot', 'Tiger', 'Giraffe', 'Kitty', 'Rabbit' ]

// sort values alphabetically
animals.sort();
console.log(animals); // [ 'Giraffe', 'Hamster', 'Kitty', 'Parrot', 'Rabbit', 'Tiger' ]

// replace the middle value

function replaceMiddleAnimal(newValue) {
  const middleIndex = Math.floor(animals.length / 2);
  animals[middleIndex] = newValue;
}
replaceMiddleAnimal('Koala');
console.log(animals); // [ 'Giraffe', 'Hamster', 'Kitty', 'Koala', 'Rabbit', 'Tiger' ]

// function that returns a new array containing all the animals that begin with the beginsWith string

function findMatchingAnimals(beginsWith) {
  return animals.filter((animal) =>
    animal.toLowerCase().startsWith(beginsWith.toLowerCase())
  );
}

console.log(findMatchingAnimals('k')); //[ 'Kitty', 'Koala' ]
