export default class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  introduce() {
    return `Hi, I'm ${this.name} and my email is ${this.email}.`;
  }
}
