// Lab Exercise 2: Create a server-side calculator

const express = require('express');
const app = express();
const port = 3000;
const calculatorRoutes = require('./routes/calculatorRoutes');

// map the calculator routes to our app
app.use('/calculator', calculatorRoutes);

// test http://localhost:3000/calculator/add?num1=4&num2=10

app.listen(port, () => {
  console.log(`Example app listening
at http://localhost:${port}`);
});
