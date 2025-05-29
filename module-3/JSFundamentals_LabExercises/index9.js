let teamSports = ['Hockey', 'Cricket', 'Volleyball'];
let dog1 = 'Bingo';
let cat1 = { name: 'Fluffy', breed: 'Siberian' };

// Create a new moreSports variable
let moreSports = [...teamSports]; // using shallow copy
// add to the start of the element
moreSports.unshift('Yoga');
// add to the end of the element
moreSports.push('Pilates');

console.log(moreSports); //[ 'Yoga', 'Hockey', 'Cricket', 'Volleyball', 'Pilates' ]

// Create dog2 and assign it to dog1
let dog2 = dog1;
dog2 = 'Buddy';

console.log(dog1); // Bingo
console.log(dog2); // Buddy

// Create cat2 variable equal to cat1 but with a different name
let cat2 = { ...cat1 }; // using shallow copy
cat2.name = 'Teddy';

console.log(cat1); // { name: 'Fluffy', breed: 'Siberian' }
console.log(cat2); // { name: 'Teddy', breed: 'Siberian' }

// Checking if the original array is unchanged or modified
console.log(teamSports); // unchanged
console.log(dog1); // unchanged
console.log(cat1); // unchanged
