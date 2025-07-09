const express = require('express');
const router = express.Router();
const addController = require('../controllers/add.controller');
const subtractController = require('../controllers/subtract.controller');
const multiplyController = require('../controllers/multiply.controller');
const divideController = require('../controllers/divide.controller');

router.get('/add', (req, res) => {
  addController.addNumbers(req, res);
});
router.get('/subtract', (req, res) => {
  subtractController.minusNumbers(req, res);
});
router.get('/multiply', (req, res) => {
  multiplyController.multiplyNumbers(req, res);
});
router.get('/divide', (req, res) => {
  divideController.divideNumbers(req, res);
});

module.exports = router;
