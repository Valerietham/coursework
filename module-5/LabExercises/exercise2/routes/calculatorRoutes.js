const express = require('express');
const router = express.Router();

// new route for adding two numbers
router.get('/add', (req, res) => {
  let number1 = parseInt(req.query.num1);
  let number2 = parseInt(req.query.num2);
  let sum = number1 + number2;
  console.log(sum);
  res.status(200);
  res.json({ result: sum });
});

// new route for subtracting two numbers
router.get('/subtract', (req, res) => {
  let number1 = parseInt(req.query.num1);
  let number2 = parseInt(req.query.num2);
  let subtract = number1 - number2;
  console.log(subtract);
  res.status(200);
  res.json({ result: subtract });
});

// new route for multiplying two numbers
router.get('/multiply', (req, res) => {
  let number1 = parseInt(req.query.num1);
  let number2 = parseInt(req.query.num2);
  let multiply = number1 * number2;
  console.log(multiply);
  res.status(200);
  res.json({ result: multiply });
});

// new route for dividing two numbers
router.get('/divide', (req, res) => {
  let number1 = parseInt(req.query.num1);
  let number2 = parseInt(req.query.num2);
  let divide = number1 / number2;
  console.log(divide);
  res.status(200);
  res.json({ result: divide });
});

module.exports = router;
