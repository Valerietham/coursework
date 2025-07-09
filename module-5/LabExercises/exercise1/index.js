// Lab Exercise 1: Create a simple Express server
// npm init
// npm install express
// modify package.json to start script "start": "node index.js",
// npm start
// output: Example app listening at http://localhost:3000

// require the express package
const express = require('express');

// create an instance of express
const app = express();

// set the port to 3000
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// test route at http://localhost:3000/test
app.get('/test', (req, res) => {
  res.send('This is a test route!');
});

app.listen(port, () => {
  console.log(`Example app listening
at http://localhost:${port}`);
});
