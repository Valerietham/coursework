const book = require('../models/Book.js');

exports.getBooks = async (req, res) => {
  try {
    const allBooks = await book.getAllBooks();
    if (!allBooks) {
      return res.status(404).json({ message: 'No available books' });
    }
    res.json(allBooks);
  } catch (e) {
    console.error(e);
  }
};

exports.getBookByBookTitle = (req, res) => {
  try {
    console.log(req);
    const title = req.params.title;
    const result = book.getBookByBookTitle(title);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(result);
  } catch (e) {
    console.error(e);
  }
};

exports.getBookByBookAuthor = (req, res) => {
  try {
    const author = req.params.author;
    const result = book.getBookByBookAuthor(author);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(result);
  } catch (e) {
    console.error(e);
  }
};
