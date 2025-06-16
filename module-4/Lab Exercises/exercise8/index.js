(function () {
  // create a shortcut and a new Luxon date
  const DateTime = luxon.DateTime;
  let nowLuxon = DateTime.now(); // current date and time
  // Example 1: Unformatted date
  let eDisplayLuxon = document.getElementById('displayLuxon');
  eDisplayLuxon.innerHTML = `<p>Unformatted date: ${nowLuxon}</p>`;
  // Example 2: Formatted date
  let formatted = nowLuxon.toFormat('MMMM dd, yyyy');
  eDisplayLuxon.innerHTML += `<p>Formatted date: ${formatted}</p>`;
  // Example 3: Date in a specific timezone
  let newYork = nowLuxon
    .setZone('America/New_York')
    .toLocaleString(DateTime.DATETIME_FULL);
  eDisplayLuxon.innerHTML += `<p>New York date: ${newYork}</p>`;
  // Question 1: Calculate the number of days between your birthdate and the current date
  const birthDate = DateTime.fromISO('1993-02-14'); // birthdate
  const diffInDays = nowLuxon.diff(birthDate, 'days').days;
  const formattedDays = Math.floor(diffInDays).toLocaleString();

  eDisplayLuxon.innerHTML += `<p>1. Number of days between birthdate and the current date: ${formattedDays} days</p>`;

  // Question 2: Display the difference in years, months, and days between two dates
  const diffInYMD = nowLuxon.diff(birthDate, ['years', 'months', 'days']);
  eDisplayLuxon.innerHTML += `<p>2. Difference in years, months, and days: ${
    diffInYMD.years
  } years, ${diffInYMD.months} months, ${Math.floor(diffInYMD.days)} days</p>`;

  // Question 3: Given two dates, display the date closest to the current date
  const date1 = DateTime.fromISO('2023-10-01');
  const date2 = DateTime.fromISO('2023-11-01');

  function closestDate(date1, date2) {
    const now = DateTime.now();
    const diff1 = Math.abs(now.diff(date1, 'days').days);
    const diff2 = Math.abs(now.diff(date2, 'days').days);

    if (diff1 < diff2) {
      return `${date1.toFormat(
        'MMMM dd, yyyy'
      )} is closer to the current date (${now.toFormat('MMMM dd, yyyy')})`;
    } else if (diff2 < diff1) {
      return `${date2.toFormat(
        'MMMM dd, yyyy'
      )} is closer to the current date (${now.toFormat('MMMM dd, yyyy')})`;
    } else {
      return `Both dates are equally close to the current date`;
    }
  }
  eDisplayLuxon.innerHTML += `<p>3. ${closestDate(date1, date2)}</p>`;

  // Question 4: Given two dates, display whether the first date is before or after the second date
  function compareDates(date1, date2) {
    if (date1 < date2) {
      return `${date1.toFormat('MMMM dd, yyyy')} is before ${date2.toFormat(
        'MMMM dd, yyyy'
      )}`;
    } else if (date1 > date2) {
      return `${date1.toFormat('MMMM dd, yyyy')} is after ${date2.toFormat(
        'MMMM dd, yyyy'
      )}`;
    } else {
      return `${date1.toFormat(
        'MMMM dd, yyyy'
      )} is the same as ${date2.toFormat('MMMM dd, yyyy')}`;
    }
  }

  eDisplayLuxon.innerHTML += `<p>4. ${compareDates(date1, date2)}</p>`;
  // end tags

  // Question 5: Display the current time in London
  let london = nowLuxon.setZone('Europe/London').toFormat('hh:mm a');

  eDisplayLuxon.innerHTML += `<p>5. Current time in London is ${london}</p>`;
})();
