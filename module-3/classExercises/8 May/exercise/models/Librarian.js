import Person from './Person.js';

// Librarian class extends Person
export class Librarian extends Person {
  constructor(name, email, employeeId) {
    super(name, email);
    this.employeeId = employeeId;
  }

  addBook(bookTitle) {
    return `Librarian ${this.name} added "${bookTitle}" to the library.`;
  }
}
