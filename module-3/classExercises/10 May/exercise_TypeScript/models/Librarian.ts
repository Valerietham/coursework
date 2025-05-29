import Person from './Person.ts';

// Librarian class extends Person
export class Librarian extends Person {
  employeeId: string;

  constructor(name, email, employeeId) {
    super(name, email);
    this.employeeId = employeeId;
  }

  addBook(bookTitle) {
    return `Librarian ${this.name} added "${bookTitle}" to the library.`;
  }
}
