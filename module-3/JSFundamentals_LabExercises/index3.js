// Qn. Which of the following console.log messages will print? Why?

if (0) console.log('#1 zero is true'); // false, wont print out. 0 is falsy
if ('0') console.log('#2 zero is true'); // true
if (null) console.log('null is true'); // false, wont print out. null is falsy
if (-1) console.log('negative is true'); // true
if (1) console.log('positive is true'); // true
