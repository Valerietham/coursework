const sydney = {
  name: 'Sydney',
  population: 5_121_000,
  state: 'NSW',
  founded: '26 January 1788',
  timezone: 'Australia/Sydney',
};

// Create a new object for a different city with different properties
const melbourne = {
  name: 'Melbourne',
  population: 5_078_000,
  state: 'VIC',
  founded: '30 August 1835',
  timezone: 'Australia/Melbourne',
};

// Using a function declaration
function getCityInfo(city) {
  return `${city.name} is in ${city.state}, has a population of ${city.population}, and was founded on ${city.founded}.`;
}

console.log(getCityInfo(sydney)); // Sydney is in NSW, has a population of 5121000, and was founded on 26 January 1788.
console.log(getCityInfo(melbourne)); // Melbourne is in VIC, has a population of 5078000, and was founded on 30 August 1835.

// Using a for..in loop to print all properties of the object
function printCityInfo(city) {
  for (let key in city) {
    console.log(`${key}: ${city[key]}`);
  }
}

printCityInfo(sydney);
printCityInfo(melbourne);
