// MINI-PROJECT #1 PRESENTATION COMMENTS:
// 1. Use onclick instead of addEventListener for the filter button
// 2. Use <template> instead of string interpolation for the card HTML
// 3. change to locally stored image instead of weblink

// DOM Elements
const catListingContainer = document.getElementById('cat-list');
const filterButton = document.getElementById('filter-button');
const resetButton = document.getElementById('reset-button');
const ageCheckboxes = document.querySelectorAll('input[name="age"]');
const genderCheckboxes = document.querySelectorAll('input[name="gender"]');
/* const houseTrainedCheckbox = document.querySelectorAll(
  'input[name="housetrained"]'
);
const spayedCheckbox = document.querySelectorAll(
  'input[name="spayed-neutered"]'
); */

// Initialize an empty array to hold all cats
let allCats = [];

// Load Cats from JSON
async function loadCats() {
  try {
    const response = await fetch('/project-1-cat-adoption/cats.json');
    const data = await response.json();
    console.log('Loaded data:', data);

    // Filter out cats without photos
    // Saves the valid cats to allCats
    allCats = data.animals.filter((cat) => cat.photos && cat.photos.length > 0);

    console.log('All valid cats:', allCats);

    // Render all cats to display
    renderCats(allCats);
  } catch (err) {
    console.error('Error loading cats:', err);
    catListingContainer.innerHTML = `Error loading cats. Please try again later.`;
  }
}

loadCats();

// Apply Filters Button
filterButton?.addEventListener('click', () => {
  // All seleted age Filters
  const selectedAges = Array.from(ageCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  // All seleted gender Filters
  const selectedGenders = Array.from(genderCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  let filteredCats;

  if (selectedAges.length && selectedGenders.length) {
    // Both age and gender filters are selected
    filteredCats = allCats.filter(
      (cat) =>
        selectedAges.includes(cat.age) && selectedGenders.includes(cat.gender)
    );
  } else if (selectedAges.length) {
    // Only age filters selected
    filteredCats = allCats.filter((cat) => selectedAges.includes(cat.age));
  } else if (selectedGenders.length) {
    // Only gender filters selected
    filteredCats = allCats.filter((cat) =>
      selectedGenders.includes(cat.gender)
    );
  } else {
    // No filters selected
    filteredCats = allCats;
  }

  renderCats(filteredCats);
});

// Reset Filters Button
resetButton?.addEventListener('click', () => {
  ageCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  genderCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  // houseTrainedCheckbox.checked = false;
  // spayedCheckbox.checked = false;

  // Reset to show all cats
  renderCats(allCats);
});

// Function to render cat cards
function renderCats(catsToRender) {
  catListingContainer.innerHTML = '';

  // If no cats are found, display no cats found
  if (!catsToRender.length) {
    catListingContainer.innerHTML = `No cats found`;
    return;
  }

  // Render each cat
  catsToRender.forEach((cat) => {
    const image =
      cat.photos[0]?.medium || // change to locally stored image instead of weblink
      'https://www.premiumsvg.com/wimg_thumb/the-walking-cat-silhouette.webp';
    const name = cat.name || 'Unnamed';
    const gender = cat.gender || 'Unknown';
    const age = cat.age || 'Unknown';
    const breed = cat.breeds.primary || 'Unknown';
    const description = cat.description || 'No description available.';

    // HTML template for cat card
    const card = `
      <div class="card group rounded hover:shadow-sm sm:max-w-sm">
        <figure class="relative h-64 w-full overflow-hidden">
          <img src="${image}" alt="${name}" class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"/>
        </figure>
        <div class="card-body">
          <h5 class="card-title mb-2.5">${name}</h5>
          <div class="flex flex-wrap gap-4 mb-2">
            <span class="badge badge-soft badge-primary whitespace-nowrap">${gender}</span>
            <span class="badge badge-soft badge-primary whitespace-nowrap">${age}</span>
            <span class="badge badge-soft badge-primary whitespace-nowrap">${breed}</span>
          </div>
          <p class="mb-6 break-words line-clamp-3">${description}</p>
        </div>
      </div>`;

    catListingContainer.insertAdjacentHTML('beforeend', card);
  });
}
