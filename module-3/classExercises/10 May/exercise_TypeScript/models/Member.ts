import Person from './Person.ts';

export class Member extends Person {
  memberId: string;

  constructor(name, email, memberId) {
    super(name, email); // Call parent constructor
    this.memberId = memberId;
  }

  borrowBook(bookTitle) {
    return `Member ${this.name} borrowed "${bookTitle}".`;
  }
}
