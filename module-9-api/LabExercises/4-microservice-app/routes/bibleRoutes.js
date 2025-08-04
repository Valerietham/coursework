const express = require('express');
const router = express.Router();
const bibleController = require('../controllers/bibleController');

router.get('/', (req, res) => {
  bibleController.getBibleVerse(req, res);
});

module.exports = router;
