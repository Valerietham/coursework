// 1. Import Built-In Modules
const express = require('express');
const cors = require('cors');

// 2. **Import local modules**
const db = require('./models');
const projectRoutes = require('./routes/project.routes');
const invoiceRoutes = require('./routes/invoice.routes');
const catalogRoutes = require('./routes/catalog.routes');
const authRoutes = require('./routes/auth.routes');

// 3. Create app and define constants
const app = express();
const port = 8000;

// 4. Apply Middleware (like cors, express.json())
app.use(express.json());
app.use(cors());

// 5. **Define Routes**
app.use('/api/projects', projectRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/auth', authRoutes);

// 6. Connect to Database
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// 7. Start the server
app.listen(port, () => {
  console.log(`Running on the port http://localhost:${port}`);
});
