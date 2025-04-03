let resultEl = document.getElementById('result');
let rollButton = document.getElementById('roll-button');
let diceButtons = document.querySelectorAll('#dice button');
let selectedDice = 6; // Default selection is D6

diceButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    selectedDice = parseInt(this.value);
    // Optional: Add visual indication of selection
    diceButtons.forEach((btn) => btn.classList.remove('selected'));
    this.classList.add('selected');
  });
});

rollButton.addEventListener('click', function () {
  let maxValue = selectedDice;
  let randomIndex = Math.floor(Math.random() * maxValue) + 1;
  resultEl.innerHTML =
    '<div class="result-label">Your Lucky Number:</div>' +
    '<div class="result-value">' +
    randomIndex +
    '</div>';
});
