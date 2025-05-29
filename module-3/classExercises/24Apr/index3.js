/* Smart Shopper Challenge
You work at a supermarket and have a list of customers with their shopping data. Each customer has:

- their name
- total money spent
- how many items they bought
- whether they are a member 

1. Find the top spender among members only.
2. Find out customers who spent more than 100 and bought at least 5 items.
3. Sort this final list by the number of items bought (most to least). */

const customers = [
  { name: 'Lana', spent: 120, items: 7, member: true },
  { name: 'Mike', spent: 80, items: 4, member: false },
  { name: 'Sara', spent: 150, items: 6, member: true },
  { name: 'Tom', spent: 90, items: 5, member: false },
  { name: 'Emma', spent: 110, items: 10, member: false },
  { name: 'John', spent: 160, items: 3, member: true },
];

// 1. Top Spender among members only

const topSpender = customers
  .filter((customer) => customer.member === true)
  .reduce((max, customer) => {
    if (customer.spent > max.spent) {
      return customer;
    } else {
      return max;
    }
  });

console.log('Top Spender:', topSpender);

// 2. Customers who spent more than 100 and bought at least 5 items

const targetCustomers = customers.filter(
  (customer) => customer.spent > 100 && customer.items >= 5
);

console.log('Targetted Customers', targetCustomers);

// 3. Sort this final list by the number of items bought (most to least).

const sortedCustomerList = customers.sort((a, b) => b.items - a.items);

sortedCustomerList.forEach((customer) => {
  console.log(customer);
});
