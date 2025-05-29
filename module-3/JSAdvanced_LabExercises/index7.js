// DIGITAL CLOCK - DATE TIME FUNCTION

class DigitalClock {
  constructor(prefix) {
    this.prefix = prefix;
  }
  display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    if (hours < 10) hours = '0' + hours;
    if (mins < 10) mins = '0' + mins;
    if (secs < 10) secs = '0' + secs;
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);
  }
}
const myClock = new DigitalClock('my clock:');
// myClock.start(); // output: my clock: 15:26:17
// myClock.stop();

/* a) Create a new class PrecisionClock that inherits from DigitalClock and adds the
parameter precision – the number of ms between 'ticks'. This precision parameter
should default to 1 second if not supplied. */

// Step 1: using 'extends' to inherit from DigitalClock
// Step 2: Set default to 1 second (1000ms)

class PrecisionClock extends DigitalClock {
  constructor(prefix, precision = 1000) {
    super(prefix);
    this.precision = precision;
  }

  start() {
    this.display();
    this.timer = setInterval(() => this.display(), this.precision);
  }
}

const newPrecisionClock = new PrecisionClock('My Precision Clock:', 5000);
newPrecisionClock.start(); // Updates every 5 seconds (5000ms)

/* b) Create a new class AlarmClock that inherits from DigitalClock and adds the
parameter wakeupTime in the format hh:mm. When the clock reaches this time, it
should print a 'Wake Up' message and stop ticking. This wakeupTime parameter should
default to 07:00 if not supplied. */

class AlarmClock extends DigitalClock {
  constructor(prefix, wakeupTime = '07:00') {
    super(prefix);
    this.wakeupTime = wakeupTime;
  }

  display() {
    // get the current time from parent
    const currentTime = super.display();

    // Check if current time reaches wakeup time
    if (currentTime === this.wakeupTime) {
      console.log('WAKE UP');
      this.stop();
    }

    return currentTime;
  }
}

const myAlarm = new AlarmClock('My Alarm:', '15:50'); // test but didn't stop...
myAlarm.start();
