class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  introduce() {
    return `Hi, I'm ${this.name} and my email is ${this.email}.`;
  }
}

class Member extends Person {
  constructor(name, email, memberId) {
    super(name, email); // Call parent constructor
    this.memberId = memberId;
  }

  borrowBook(bookTitle) {
    return `Member ${this.name} borrowed "${bookTitle}".`;
  }
}

class Librarian extends Person {
  constructor(name, email, employeeId) {
    super(name, email); // Call parent constructor
    this.employeeId = employeeId;
  }

  manageBook(bookTitle) {
    return `Librarian ${this.name} added "${bookTitle}" to the library.`;
  }
}

class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getSummary() {
    return `"${this.title}" by ${this.author}, published in ${this.year}.`;
  }
}

// Example usage
const personAlice = new Person('Alice', 'alice@email.com');
console.log(personAlice.introduce()); // Hi, I'm Alice and my email is alice@email.com.

const memberAlice = new Member(personAlice.name, personAlice.email, 'M123');
console.log(memberAlice.borrowBook('The Hobbit')); // Member Alice borrowed "The Hobbit".

const librarianBob = new Librarian('Bob', 'bob@email.com', 'LIB456');
console.log(librarianBob.manageBook('1984')); // Librarian Bob added "1984" to the library.

const books = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 1937),
  new Book('Harry Potter', 'J.K. Rowling', 1997),
  new Book('1984', 'George Orwell', 1949),
];

console.log(books[2].getSummary());

// simulate a member borrowing a book
console.log(memberAlice.borrowBook(books[0].title)); // Member Alice borrowed "The Hobbit".
