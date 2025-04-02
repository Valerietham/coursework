// Try creating a json object variable for a book. The book should have a title, description, author and number of pages
// Extension: Create an array of 5 book objects

let book = {
  title: 'The Winter Wonderland',
  description: 'A magical winter tale',
  author: 'Valerie Tham',
  pages: 180,
};

// Try printing these object property values in your console individually and via the whole book object

console.log(book.title);
console.log(book.description);
console.log(book.author);
console.log(book.pages);

// Update the description of the book

book.description = 'An enchanting story set in a snowy wonderland';

console.log(book.description);

console.log(book);

// Try creating an array of 5 book objects

let books = [
  {
    title: 'The Winter Wonderland',
    description: 'A magical winter tale',
    author: 'Valerie Tham',
    pages: 180,
  },
  {
    title: 'Ocean’s Whisper',
    description: 'A deep dive into the mysteries of the sea',
    author: 'Winnie Lee',
    pages: 250,
  },
  {
    title: 'The Lost City',
    description: 'An adventure to uncover an ancient civilization',
    author: 'Albert Roberts',
    pages: 320,
  },
  {
    title: 'Beyond the Stars',
    description: 'A thrilling space exploration journey',
    author: 'David Lee',
    pages: 290,
  },
  {
    title: 'Echoes of Time',
    description: 'A gripping time-travel novel',
    author: 'Sophia Choo',
    pages: 400,
  },
];

for (let i = 0; i < books.length; i++) {
  console.log(books[i].author);
}
