// SET TIMEOUT, CLONE

let car = {
  make: 'Porsche',
  model: '911',
  year: 1964,

  description() {
    console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
  },
};

car.description(); //works
setTimeout(car.description, 200); //fails

// a) Fix the setTimeout call by wrapping the call to car.description() inside a function

setTimeout(function () {
  car.description();
}, 200);
// output: This car is a Porsche 911 from 1964

// b) Change the year for the car by creating a clone of the original and overriding it

let carClone = { ...car };
carClone.year = 2025;

carClone.description();

// c) Does the delayed description() call use the original values or the new values from b)? Why?
// Ans: The delayed description calls the original value (1964) as the function is executed before the year was modified.

// d) Use bind to fix the description method so that it can be called from within setTimeout without a wrapper function
// previously this failed -> setTimeout(car.description, 200)

setTimeout(car.description.bind(car), 200); // works

// e) Change another property of the car by creating a clone and overriding it, and test that setTimeout still uses the bound value from d)

let carClone2 = { ...car };
carClone2.model = '987';

carClone2.description();
