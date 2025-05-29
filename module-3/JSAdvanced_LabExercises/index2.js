// DELAY MESSSAGE USING SET TIMEOUT

/* function delayMsg(msg) {
  console.log(`This message will be printed after a delay: ${msg}`);
}
 */

// b) Rewrite delayMsg as an arrow function

const delayMsg = (msg) => {
  console.log(`This message will be printed after a delay: ${msg}`);
};

setTimeout(delayMsg, 100, '#1: Delayed by 100ms');
setTimeout(delayMsg, 20, '#2: Delayed by 20ms');
setTimeout(delayMsg, 0, '#3: Delayed by 0ms');
delayMsg('#4: Not delayed at all');

// a) Qn: What order will the four tests below print in? Why?
// Ans: The tests will be printed out by the delay duration specified in ascending order. (i.e. no delay -> longest delay duration)
// Order: Message #4 - no delay, #3, #2. #1 - longest delay

// c) Add a fifth test which uses a large delay time (greater than 10 seconds)

const fifthTimeout = setTimeout(delayMsg, 15000, '#5: Delayed by 15 seconds');

// d) Prevent the fifth message from printing
clearTimeout(fifthTimeout);
