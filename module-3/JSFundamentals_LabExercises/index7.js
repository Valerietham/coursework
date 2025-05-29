const basketballGame = {
  score: 0,
  fouls: 0,
  // Add a new method to track fouls
  foul() {
    this.fouls++;
    return this;
  },
  freeThrow() {
    this.score++;
    return this;
  },
  basket() {
    this.score += 2;
    return this;
  },
  threePointer() {
    this.score += 3;
    return this;
  },
  halfTime() {
    console.log('Halftime score is ' + this.score);
    console.log('Halftime fouls is ' + this.fouls);
  },
  // Add a new method to print the full time final score
  fullTime() {
    console.log('Full time score is ' + this.score);
    console.log('Full time fouls is ' + this.fouls);
  },
};

// without chaining
/* basketballGame.basket();
basketballGame.freeThrow();
basketballGame.freeThrow();
basketballGame.basket();
basketballGame.threePointer();
basketballGame.halfTime(); */

// Round 1
// with chaining using 'return this'
basketballGame
  .basket()
  .freeThrow()
  .freeThrow()
  .basket()
  .threePointer()
  .halfTime();
// Halftime score is 9
// Halftime fouls is 0

// Round 2
basketballGame.basket().foul().foul().basket().threePointer();

basketballGame.fullTime();
// Full time score is 16
// Full time fouls is 2
