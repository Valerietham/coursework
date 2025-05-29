export default class Person {
  name: string; // TypeScript requirements
  email: string; // TypeScript requirements

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  introduce(): string {
    return `Hi, I'm ${this.name} and my email is ${this.email}.`;
  }
}
