import Person from './Person.js';

export class Member extends Person {
  constructor(name, email, memberId) {
    super(name, email); // Call parent constructor
    this.memberId = memberId;
  }

  borrowBook(bookTitle) {
    return `Member ${this.name} borrowed "${bookTitle}".`;
  }
}
