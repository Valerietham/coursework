let countEl = document.getElementById('count-el');
let count = 0;
let maxVisitor = 10;

// Increment, decrement, and reset functions
function increment() {
  count += 1;
  countEl.textContent = count;
  // Check if the count exceeds the maximum visitor limit
  if (count > maxVisitor) {
    alert(`The event has reached a maximum of ${maxVisitor} guests`);
  }
}

function decrement() {
  count -= 1;
  countEl.textContent = count;
}

function reset() {
  count = 0;
  countEl.textContent = count;
}
