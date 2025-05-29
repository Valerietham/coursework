const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

router.get('/', bookController.getBooks);
router.get('/:title', bookController.getBookByBookTitle);
router.get('/:author', bookController.getBookByBookAuthor);

module.exports = router;
