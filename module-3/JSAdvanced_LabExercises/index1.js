// COUNTER FUNCTION

// assign default function values
function makeCounter(startFrom = 0, incrementBy = 1) {
  let currentCount = startFrom;
  return function () {
    currentCount += incrementBy;
    console.log(currentCount);
    return currentCount;
  };
}
let counter1 = makeCounter();
counter1(); // 1
counter1(); // 2

// a) add a new counter using makeCounter function
// b) Modify makeCounter so that it takes an argument startFrom specifying where the counter starts from (instead of always starting from 0)
// test starting from 50
let counter2 = makeCounter(150, 1);

counter2(); // 151
counter2(); // 152

// c) Modify makeCounter to take another argument incrementBy, which specifies how much each call to counter() should increase the counter value by.
// test increment by 5.
let counter3 = makeCounter(50, 5);

counter3(); // 55
counter3(); // 60
