// API for a Microservice Application
// Documentation: https://bible-api.com/

// 1. Import Built-In Modules
const express = require('express');
const cors = require('cors');

// 2. Import local modules
const bibleRoutes = require('./routes/bibleRoutes');

// 3. Create app and define constants
const app = express();
const port = 8000;

// 4. Apply Middleware (like cors, express.json())
app.use(express.json());
app.use(cors());

// 5. Define Routes & Fetch Bible Data
app.use('/api/bible', bibleRoutes);

// 7. Start the server
app.listen(port, () => {
  console.log(`Running on the port http://localhost:${port}`);
});

// Test http://localhost:8000/api/bible?book=john&chapter=3&verse=16
