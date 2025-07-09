// app.js - new file at top level
const express = require('express');
const app = express();
const port = 3000;

// **ADD PATH TO USE CALCULATOR.HTML**
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// map all routes to the express app
const calculatorRoutes = require('./routes/calculatorRoutes');
app.use('/calculator', calculatorRoutes);

// export the app
module.exports = app;
