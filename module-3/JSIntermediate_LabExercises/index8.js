const phoneBookABC = new Map(); //an empty map to begin with
phoneBookABC.set('Annabelle', '0412312343');
phoneBookABC.set('Barry', '0433221117');
phoneBookABC.set('Caroline', '0455221182');

console.log(phoneBookABC); // Map(3) { 'Annabelle' => '0412312343', 'Barry' => '0433221117', 'Caroline' => '0455221182' }

// a) Create a new phoneBookDEF Map to store names beginning with D, E or F
// b) Initialise the contents of phoneBookDEF by passing in an array of keys/values

const phoneBookDEF = new Map([
  ['Dave', '0412312343'],
  ['Eric', '0433221117'],
  ['Francis', '0455221182'],
]); //an empty map to begin with

console.log(phoneBookDEF); // [ [ 'Dave', '0412312343' ], [ 'Eric', '0433221117' ], [ 'Francis', '0455221182' ] ]

// c) Update the phone number for Caroline e.g new number is 123456789

phoneBookABC.set('Caroline', '123456789');

console.log(phoneBookABC); // Map(3) { 'Annabelle' => '0412312343', 'Barry' => '0433221117', 'Caroline' => '123456789' }

// d) print phone book contacts

function printPhoneBook(phoneBook) {
  for (const [name, number] of phoneBook) {
    console.log(`${name}: ${number}`);
  }
}
printPhoneBook(phoneBookABC);
// Annabelle: 0412312343
// Barry: 0433221117
// Caroline: 123456789

printPhoneBook(phoneBookDEF);
// Dave: 0412312343
// Eric: 0433221117
// Francis: 0455221182

// e) Merge the two phone books into a new phoneBook Map

const phoneBook = new Map([...phoneBookABC, ...phoneBookDEF]);

console.log(phoneBook); // Map(6) { 'Annabelle' => '0412312343', 'Barry' => '0433221117', 'Caroline' => '123456789', 'Dave' => '0412312343', 'Eric' => '0433221117', 'Francis' => '0455221182' }

// f) Print the merged phone book
printPhoneBook(phoneBook);
