// Book class
export class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getSummary() {
    return `"${this.title}" by ${this.author}, published in ${this.year}.`;
  }
}
