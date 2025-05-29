const today = new Date();
console.log('Current time is ' + today.toLocaleTimeString()); // Current time is 6:46:48 PM
console.log(today.getHours() + ' hours have passed so far today'); // 18 hours have passed so far today

// a) Print the total number of minutes that have passed so far today

console.log(
  today.getHours() * 60 +
    today.getMinutes() +
    ' minutes have passed so far today'
); // 1126 minutes have passed so far today

// b) Print the total number of seconds that have passed so far today

console.log(
  today.getHours() * 60 * 60 +
    today.getMinutes() * 60 +
    today.getSeconds() +
    ' seconds have passed so far today'
); // 67608 seconds have passed so far today

// c) Calculate and print your age as: 'I am x years, y months and z days old'

function printAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // If the current day is before the birth day
  if (days < 0) {
    months--; // Decrease the month by 1
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // If the current month is before the birth month
  if (months < 0) {
    years--; // Decrease the year by 1
    months += 12;
  }

  console.log(`I am ${years} years, ${months} months and ${days} days old.`);
}

printAge('1993-02-14'); // I am 32 years, 2 months and 21 days old.

// d) Write a function daysInBetween(date1, date2) which calculates and returns the amount of days in between the two given dates.

function daysInBetween(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Calculate the difference in milliseconds
  const differenceInTime = endDate - startDate;

  // Convert milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}

console.log(daysInBetween('2025-05-05', '2025-08-31')); // 118
