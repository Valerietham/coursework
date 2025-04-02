let Icon1 = document.getElementById('icon1');
let Icon2 = document.getElementById('icon2');
let Heading1 = document.getElementById('heading1');
let Heading2 = document.getElementById('heading2');
let Column1 = document.getElementById('column1');
let Button1 = document.getElementById('button1');
let Button2 = document.getElementById('button2');

function changeBackground() {
  Column1.style.background = 'black'; // Change background to black
  Heading1.textContent = 'Lights off'; // Change text
  Heading1.style.color = 'white'; // Change text color to white
  Icon1.src = 'moon.svg'; // Change icon
  Button1.style.display = 'none'; // Hide button1
}

function changeBreakfastItem() {
  Heading2.textContent = 'Bread'; // Change text
  Icon2.src = 'bread.svg'; // Change icon
}
