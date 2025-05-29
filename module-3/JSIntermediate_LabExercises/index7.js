const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
  },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 4, title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    year: 1951,
  },
];

// a) Return a book title by its ID

function getBookTitle(bookId) {
  const book = books.find((b) => b.id === bookId);
  return book ? book.title : 'Book not found';
}

console.log(getBookTitle(2)); // Output: To Kill a Mockingbird

// b) get old books before year 1950

function getOldBooks(year) {
  return books.filter((book) => book.year < year);
}
console.log(getOldBooks(1950));

// c) Add genre to each book

function addGenre() {
  return books.map((book) => ({
    ...book,
    genre: 'Classic', // Default genre
  }));
}

console.log(addGenre(books));
