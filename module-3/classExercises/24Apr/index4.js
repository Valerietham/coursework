const clients = [
  { name: 'Hiroshi', country: 'Japan', trips: 4, spent: 2000, loyalty: true },
  { name: 'Anna', country: 'USA', trips: 1, spent: 800, loyalty: false },
  { name: 'Kenji', country: 'Japan', trips: 3, spent: 1500, loyalty: true },
  { name: 'Laura', country: 'Germany', trips: 2, spent: 1100, loyalty: false },
  { name: 'Carlos', country: 'Spain', trips: 5, spent: 2200, loyalty: false },
  { name: 'Mei', country: 'China', trips: 3, spent: 1300, loyalty: false },
  { name: 'Tom', country: 'Japan', trips: 2, spent: 950, loyalty: false },
  { name: 'Isla', country: 'UK', trips: 4, spent: 1700, loyalty: true },
];

// 1. Most valuable customer

const mostValuableCustomer = clients
  .filter((clients) => clients.country === 'Japan' && clients.loyalty === true)
  .reduce((max, clients) => {
    if (clients.spent > max.spent) {
      return clients;
    } else {
      return max;
    }
  });

/* console.log(mostValuableCustomer); */

// 2. Customers who spent more than 1000 and made at least 2 trips & not in loyalty program

const filteredClients = clients.filter(
  (clients) =>
    clients.trips >= 2 && clients.spent > 1000 && clients.loyalty === false
);

/* console.log(filteredClients); */

// 3.

const clientProfile = filteredClients.map((client) => {
  let name = client.name;
  let country = client.country;
  let profile = client.trips > 3 ? 'Frequent Flyer' : 'Explorer';
  return {
    name: name,
    country: country,
    profile: profile,
  };
});

/* console.log(clientProfile); */

// 4.

const sortByCountry = clients.sort((a, b) => {
  if (a.country < b.country) return -1;
  if (a.country > b.country) return 1;
  // If countries are the same, sort by money spent (highest first)
  return b.spent - a.spent;
});

sortByCountry.forEach((client) => {
  console.log(client);
});
