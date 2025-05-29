// step 1: create the map

const libraryRecords = new Map();

// step 2: add records to the map
// For each borrower, we'll store an array of books
function addRecord(borrower, book) {
  if (libraryRecords.has(borrower)) {
    // If borrower exists, add the book to their array
    libraryRecords.get(borrower).push(book);
  } else {
    // If new borrower, create a new array with the book
    libraryRecords.set(borrower, [book]);
  }
}

// Add all the records
addRecord('Alice', 'Harry Potter');
addRecord('Bob', 'The Hobbit');
addRecord('Alice', 'Pride and Prejudice');
addRecord('Daisy', '1984');
addRecord('Ethan', 'To Kill a Mockingbird');
addRecord('Bob', 'Lord of the Rings');

// step 3: group by name and books borrowed

for (const [borrower, books] of libraryRecords) {
  console.log(`${borrower} borrowed: ${books.join(', ')}`);
}

// step 4: Find all books borrowed by a specific borrower
let booksReadByAlice = libraryRecords.get('Alice');
console.log(booksReadByAlice); // ['Harry Potter', 'Pride and Prejudice']
