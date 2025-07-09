// import the app
const app = require('./app');
const port = 3000;

// Lab Exercise 8
// Part 1: Use the same calculator app as in Exercise 2, 3, 5, 6 & 7, and create interactive API
// documentation using Swagger, following the starter code on slides 78-82.
// import Swagger after initialisaton
// Check http://localhost:3000/api-docs/
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start the app to listen on the right port
app.listen(port, () => {
  console.log(`Test app at
http://localhost:${port}/calculator.html`);
});
