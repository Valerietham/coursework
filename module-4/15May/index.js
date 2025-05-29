// 1. Create new endpoint that to get the book by author
// 2. Create a new api endpoint to get the book by their rank => dynamic

const express = require('express');
const cors = require('cors');

const app = express();
const bookRouter = require('./routes/bookRoutes.js');
const studentRouter = require('./routes/studentRouter.js');

const port = 8000;

app.use(cors());

app.use(express.json());
app.use('/api/books', bookRouter);
app.use('/api/students', studentRouter);

app.listen(port, () => {
  console.log(`Running on the port http://localhost:${port}`);
});
