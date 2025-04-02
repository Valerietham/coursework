// DOM Elements
const diceButtons = document.querySelectorAll('.dice-btn');
const quantityInput = document.querySelector('.quantity-input');
const rollButton = document.querySelector('.roll-btn');
const diceResults = document.querySelector('.dice-results');
const totalValue = document.querySelector('.total-value');
const historyList = document.querySelector('.history-list');

// State
let selectedDice = 'd4';
let diceQuantity = 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set initial state
  diceQuantity = parseInt(quantityInput.value) || 1;

  // Clear example dice from HTML
  diceResults.innerHTML = '';

  // Setup event listeners
  setupEventListeners();
});

// Event listeners setup
function setupEventListeners() {
  // Dice type selection
  diceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      diceButtons.forEach((btn) => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Update selected dice
      selectedDice = button.getAttribute('data-dice');
    });
  });

  // Quantity input
  quantityInput.addEventListener('change', () => {
    let value = parseInt(quantityInput.value);

    // Validate input
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }

    quantityInput.value = value;
    diceQuantity = value;
  });

  // Roll button
  rollButton.addEventListener('click', rollDice);
}

// Roll dice function
function rollDice() {
  // Clear previous results
  diceResults.innerHTML = '';

  let total = 0;
  let diceType = selectedDice;
  let max = getDiceMax(diceType);
  let rolls = [];

  // Roll dice and create elements
  for (let i = 0; i < diceQuantity; i++) {
    // Get random number based on dice type
    const value = getRandomInt(1, max);
    rolls.push(value);
    total += value;

    // Create die element
    const dieElement = document.createElement('div');
    dieElement.className = `die ${diceType}`;
    dieElement.innerHTML = `
            <span>${value}</span>
            <div class="die-label">${diceType}</div>
        `;

    // Add rolling animation
    dieElement.classList.add('rolling');
    setTimeout(() => {
      dieElement.classList.remove('rolling');
    }, 600);

    // Add to results
    diceResults.appendChild(dieElement);
  }

  // Update total
  totalValue.textContent = total;

  // Add to history
  addToHistory(diceType, diceQuantity, total, rolls);
}

// Get maximum value based on dice type
function getDiceMax(diceType) {
  const diceMap = {
    d4: 4,
    d6: 6,
    d8: 8,
    d10: 10,
    d12: 12,
    d20: 20,
    d100: 100,
  };

  return diceMap[diceType] || 6; // Default to d6 if type not found
}

// Generate random integer between min and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add roll to history
function addToHistory(diceType, quantity, total, rolls) {
  // Create history item
  const historyItem = document.createElement('div');
  historyItem.className = 'history-item';

  // Format rolls for display
  const rollsStr = rolls.join(', ');

  historyItem.innerHTML = `
        <span class="history-dice">${quantity} × ${diceType.toUpperCase()} [${rollsStr}]</span>
        <span class="history-total">${total}</span>
    `;

  // Add to history list at the top
  historyList.insertBefore(historyItem, historyList.firstChild);

  // Limit history items (keep only last 10)
  const historyItems = historyList.querySelectorAll('.history-item');
  if (historyItems.length > 10) {
    historyList.removeChild(historyItems[historyItems.length - 1]);
  }
}

// Clear history function (could be connected to a clear button)
function clearHistory() {
  historyList.innerHTML = '';
}
