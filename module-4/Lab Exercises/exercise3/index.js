const data = [
  { name: 'Bob', age: 23 },
  { name: 'Alice', age: 39 },
  { name: 'Rayden', age: 10 },
  { name: 'Lara', age: 29 },
  { name: 'John', age: 45 },
  { name: 'Valerie', age: 55 },
];

function addCard(person) {
  // clone the template
  const template = document
    .getElementById('card-template')
    .content.cloneNode(true);
  // populate the template
  template.querySelector('.card-title').innerText = person.name;
  template.querySelector('.card-text').innerText = `Age: ${person.age}`;
  // include the populated template into the page
  document.querySelector('#card-list').appendChild(template);
}
data.forEach(addCard);

// Exercise 3
const artists = [
  {
    name: 'Van Gogh',
    portfolio: [
      {
        title: 'Portrait',
        url: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436532/1671316/main-image',
      },
      {
        title: 'Sky',
        url: 'https://mymodernmet.com/wp/wp-content/uploads/2020/11/White-house-night-van-goh-worldwide-2.jpg',
      },
    ],
  },
  {
    name: 'Leonardo da Vinci',
    portfolio: [
      {
        title: 'Isleworth Mona Lisa',
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Isleworthml.JPG',
      },
      {
        title: 'Vitruvian Man',
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg',
      },
    ],
  },
];

function addArtistCard(artist) {
  const artistTemplate = document
    .getElementById('artist-template')
    .content.cloneNode(true);
  // Display the artist's name
  artistTemplate.querySelector('.artist-name').innerText = artist.name;

  const portfolioContainer = artistTemplate.querySelector('.portfolio');

  artist.portfolio.forEach((work) => {
    const workTemplate = document
      .getElementById('artwork-template')
      .content.cloneNode(true);

    // display the title of the artwork
    workTemplate.querySelector('.artwork-title').innerText = work.title;

    // display the artwork
    const image = workTemplate.querySelector('.artwork-image');
    image.src = work.url;
    image.alt = work.title;

    portfolioContainer.appendChild(workTemplate);
  });

  document.getElementById('artist-section').appendChild(artistTemplate);
}

// Loop through all artists
artists.forEach(addArtistCard);
