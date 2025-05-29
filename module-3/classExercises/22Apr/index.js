/* you've just opened your own cozy little café in town. You want to keep track of all the amazing drinks and snacks you offer.
Each item on your menu should have:
A name
A price
A category (like "drink", "dessert", or "snack")
Whether it's available today (yes or no)
Now, your task is to:
- Create a list of 4–5 menu items, each with the details above.
- Add a new item to the list later on.
- Print out the names of all items that are available today.
- Calculate the total price if someone orders everything on the menu. */

// without using classes

let menuItems = [
  {
    name: 'Flat White',
    price: 5.5,
    category: 'drink',
    availability: true,
  },
  {
    name: 'Dark Chocolate Cake',
    price: 8.0,
    category: 'dessert',
    availability: true,
  },
  {
    name: 'Almond Croissant',
    price: 5.5,
    category: 'pastry',
    availability: false,
  },
  {
    name: 'Iced Lemon Tea',
    price: 7.5,
    category: 'drink',
    availability: true,
  },
];

// Adding a new item to the menu

let newItem1 = {
  name: 'Blueberry Tart',
  price: 6.5,
  category: 'pastry',
  availability: true,
};
menuItems.push(newItem1);

// printing out the names of all items that are available today
let availableItems = menuItems.filter((item) => item.availability === true);
availableItems.forEach((item) => {
  console.log(item.name);
});

// calculating the total price if someone orders everything on the menu

let totalPrice = 0;

for (let item of menuItems) {
  if (item.availability) {
    totalPrice += item.price;
  }
}

console.log(`Total price for all items: $${totalPrice}`);

// using classes

class Menu {
  constructor(name, price, category, availability) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.availability = availability;
  }
}
// calculate inside the class level

// Adding a new item to the menu

let newItem2 = new Menu('Mango Lassi', 6.5, 'drink', true);

console.log(newItem2);
