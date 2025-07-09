// Lab Exercise 7
// Part 3 : Create a generic library for logging - pass a message to be logged, this will contain
// at least the ID of the caller, and the result. Log to the console every call made.

class Logger {
  constructor(source, id) {
    this.source = source;
    // ID of the caller
    this.id = id;
  }

  log = (result) => {
    console.log(`[ID:${this.id}] ${this.source} returns ${result}`);
  };
}

module.exports = Logger;
