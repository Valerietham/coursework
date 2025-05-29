const guests = [
  {
    name: 'Emily',
    country: 'Canada',
    nights: 5,
    totalPaid: 1200,
    isVerified: true,
  },
  {
    name: 'Mary',
    country: 'Canada',
    nights: 5,
    totalPaid: 1200,
    isVerified: true,
  },
  {
    name: 'Raj',
    country: 'India',
    nights: 2,
    totalPaid: 450,
    isVerified: true,
  },
  {
    name: 'Sophie',
    country: 'France',
    nights: 3,
    totalPaid: 800,
    isVerified: false,
  },
  {
    name: 'Liam',
    country: 'Canada',
    nights: 4,
    totalPaid: 950,
    isVerified: true,
  },
  {
    name: 'Noah',
    country: 'USA',
    nights: 1,
    totalPaid: 300,
    isVerified: false,
  },
  { name: 'Ava', country: 'Canada', nights: 0, totalPaid: 0, isVerified: true },
  {
    name: 'Mia',
    country: 'Australia',
    nights: 4,
    totalPaid: 1300,
    isVerified: false,
  },
  {
    name: 'Leo',
    country: 'Germany',
    nights: 5,
    totalPaid: 1000,
    isVerified: true,
  },
  {
    name: 'Chloe',
    country: 'Brazil',
    nights: 6,
    totalPaid: 1100,
    isVerified: false,
  },
  {
    name: 'Daniel',
    country: 'Spain',
    nights: 3,
    totalPaid: 600,
    isVerified: false,
  },
  {
    name: 'Nina',
    country: 'Canada',
    nights: 4,
    totalPaid: 1500,
    isVerified: false,
  },
  {
    name: 'Oscar',
    country: 'Canada',
    nights: 3,
    totalPaid: 950,
    isVerified: true,
  },
  {
    name: 'Isabella',
    country: 'Italy',
    nights: 3,
    totalPaid: 2000,
    isVerified: false,
  },
  {
    name: 'Ethan',
    country: 'USA',
    nights: 0,
    totalPaid: 200,
    isVerified: false,
  },
  {
    name: 'Grace',
    country: 'UK',
    nights: 7,
    totalPaid: 1800,
    isVerified: true,
  },
  {
    name: 'Yuki',
    country: 'Japan',
    nights: 3,
    totalPaid: 1000,
    isVerified: false,
  },
];

// 1. Find the most valuable guest from Canada who is verified

const mostValuableGuest = guests
  .filter((guest) => guest.country === 'Canada' && guest.isVerified)
  .reduce((max, guest) => {
    if (guest.totalPaid > max.totalPaid) {
      return guest;
    } else {
      return max;
    }
  });

/* console.log('Most Valuable Guest:', mostValuableGuest);
 */
// this method is more robust and returns all guests with the same max totalPaid

const filteredGuests = guests.filter(
  (guest) => guest.country === 'Canada' && guest.isVerified
);

// Step 2: Find the maximum totalPaid
const maxPaid = Math.max(...filteredGuests.map((guest) => guest.totalPaid));

// Step 3: Filter all guests who have the max totalPaid
const mostValuableGuests = filteredGuests.filter(
  (guest) => guest.totalPaid === maxPaid
);

console.log('Most Valuable Guests:', mostValuableGuests);

// 2. Find guests who stayed more than 3 nights and paid more than 500, but are not verified

const unverifiedGuestList = guests.filter(
  (guests) =>
    guests.nights >= 3 && guests.totalPaid > 500 && guests.isVerified === false
);

// print the unverified guests
console.log(unverifiedGuestList);

// 3.

const unverifiedGuestListWithGuestType = unverifiedGuestList.map((guests) => ({
  name: guests.name,
  nights: guests.nights,
  guestType: guests.totalPaid > 1000 ? 'Premium Guest' : 'Regular Guest',
}));

console.log(unverifiedGuestListWithGuestType);

// 4. Sorting the guest by nights and totalPaid */

const sortedGuestList = guests.sort((a, b) => {
  if (b.nights !== a.nights) {
    return b.nights - a.nights;
  }
  return b.totalPaid - a.totalPaid;
});

console.log('Sorted Guests: ', sortedGuestList);
