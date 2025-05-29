const books = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    year: 1937,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
  },
  {
    title: '1984',
    author: 'George Orwell',
    year: 1949,
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    year: 2003,
  },
  {
    title: 'The Fault in Our Stars',
    author: 'John Green',
    year: 2012,
  },
];

/*   

1. Write a function getBooksAfterYear(year) that:
  Returns a new array with only books published after the given year. Example getBooksAfterYear(2000) -> book.year > year
  
-> Filter

  2. Write a function findBookByTitle(title) that:
  Returns the first book object with the matching title (case-sensitive) -> book.title === title
  
-> Find

*/

function getBooksAfterYear(year) {
  return books.filter((book) => book.year > year); // checks if the year of the current book is greater than the year indicated by getBooksAfterYear
}

console.log(getBooksAfterYear(2000));

function findBookByTitle(title) {
  return books.find((book) => book.title === title); // checks if the title of the current book matches the title passed to findBookByTitle
}

console.log(findBookByTitle('The Hobbit'));

/* 
3.Write a function hasBook(title) that checks if a book with the given title exists in the list.
Returns true or false.

4. Write a function sortBooksByYear() that sorts the books in ascending order by the year and returns the sorted array. 
*/

function hasBook(title) {
  return books.some((book) => book.title === title); // checks if the title of any book in the array matches the title passed to hasBook
}

console.log(hasBook('The Hobbit')); // true
console.log(hasBook('The life of Valerie')); // false

function sortBooksByYear() {
  return books.sort((first, last) => first.year - last.year); // sorts the books in ascending order by year
}

console.log(sortBooksByYear());
