// Step 1: Fetch number on display screen
const displayElement = document.getElementById('display');

// Step 2: Set calculator default state
let display = '0';
let firstNumber = null;
let operator = null;

// Step 3: update screen with number (zero by default)
function updateDisplay() {
  displayElement.textContent = display;
}

// Step 4: Function when user clicks a number
function inputNumber(number) {
  // if display is not 0 or if the first number and operator has been pressed. Need to convert number to string
  if (
    display === '0' ||
    (firstNumber !== null && operator && display === String(firstNumber))
  ) {
    // display single digit input e.g 3
    display = number;
  } else {
    // display multiple digit input e.g 35
    display += number;
  }
  updateDisplay();
}

// Step 5: Function when user clicks an operator (+, -, *, /)
function inputOperator(mathFunction) {
  // Store number shown on the screen as the firstNumber if firstNumber is null. Convert the display string into number for decimal input
  // e.g 8765
  if (firstNumber === null) {
    firstNumber = parseFloat(display);

    // If firstNumber is not null, save the operator pressed and the number displayed on the screen
  } else if (operator) {
    const result = calculateResult(
      firstNumber, // e.g 8765
      parseFloat(display), // ???
      operator // e.g "+"
    );

    display = String(result); // Display the result on screen by converting to a string again
    firstNumber = result; // Save the result as the new first number
    updateDisplay(); // Update the calculator display in Step 4
  }
  operator = mathFunction;
}

// Step 6: Perform calculation
function calculateResult(a, b, mathFunction) {
  if (mathFunction === 'plus') return a + b;
  if (mathFunction === 'minus') return a - b;
  if (mathFunction === 'multiply') return a * b;
  if (mathFunction === 'divide') return a / b;
  return b;
}

// Step 7: Equals Function
function calculate() {
  if (firstNumber !== null && operator) {
    const result = calculateResult(firstNumber, parseFloat(display), operator);
    // Display result as a string
    display = String(result);
    // reset first number as null
    firstNumber = null;
    // reset operator
    operator = null;
    updateDisplay();
  }
}

// Step 8: Decimal Input Function
function inputDecimal() {
  if (!display.includes('.')) {
    display += '.';
    updateDisplay();
  }
}

// Step 9: Clear Function
function clearCalculator() {
  display = '0';
  firstNumber = null;
  operator = null;
  updateDisplay();
}

// Step 10: Set up buttons
document.addEventListener('DOMContentLoaded', () => {
  // numbers
  document.querySelectorAll('.number-btn').forEach((button) => {
    button.addEventListener('click', () => inputNumber(button.dataset.number));
  });
  // operations - (+, -, *, /)
  document.querySelectorAll('.operation-btn').forEach((button) => {
    button.addEventListener('click', () =>
      inputOperator(button.dataset.operation)
    );
  });
  // functions - Clear, Equal, Decimal
  document.getElementById('equals').addEventListener('click', calculate);
  document.getElementById('decimal').addEventListener('click', inputDecimal);
  document.getElementById('clear').addEventListener('click', clearCalculator);
});
