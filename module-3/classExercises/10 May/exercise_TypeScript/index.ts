import { Member } from './models/Member.ts';

import { Librarian } from './models/Librarian.ts';

import { Book } from './models/Book.ts';

// Example usage:
const member = new Member('Alice', 'alice@email.com', 'M001');
console.log(member.introduce());
console.log(member.borrowBook('The Hobbit'));

const librarian = new Librarian('Bob', 'bob@email.com', 'L123');
console.log(librarian.introduce());
console.log(librarian.addBook('1984'));

const book = new Book('1984', 'George Orwell', 1949);
console.log(book.getSummary());
