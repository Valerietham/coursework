// Lab Exercise 3: Extend server-side calculator with front-end

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const calculatorRoutes = require('./routes/calculatorRoutes');

// app.use('/', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// map the calculator routes to our app
app.use('/calculator', calculatorRoutes);

app.listen(port, () => {
  console.log(`Test app at http://localhost:${port}/calculator.html`);
});
