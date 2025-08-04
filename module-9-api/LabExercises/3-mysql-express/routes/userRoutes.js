let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');

// Adds a GET route to return all users
router.get('/', (req, res) => {
  userController.getUsers(req, res);
});

// Adds a POST route to create a new user
router.post('/create', (req, res) => {
  userController.createUser(req, res);
});

// Adds a PUT route to edit a user
router.put('/:id', (req, res) => {
  userController.updateUser(req, res);
});

// Adds a DELETE route to delete a user
router.delete('/:id', (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
