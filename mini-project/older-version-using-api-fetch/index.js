import petfinder from 'https://cdn.skypack.dev/@petfinder/petfinder-js';

// Petfinder API Key and Secret
const client = new petfinder.Client({
  apiKey: 'mGQGN1Qotjt8tkGufh5XMPBLmdDTCvVgsRA3NcEkmEDp6vOY9W',
  secret: 'VMhUPrwXQVYEOqMDNphBaMg4EpQb4GPD3i68bWYf',
});

// DOM Elements
const container = document.getElementById('cat-list');

async function loadCats() {
  try {
    // Fetch cats only from Petfinder API
    const response = await client.animal.search({ type: 'Cat', limit: 20 });
    const cats = response.data.animals;

    // Check if there are any cats with photos
    const catsWithPhotos = cats.filter(
      (cat) => cat.photos && cat.photos.length > 0
    );
    if (catsWithPhotos.length === 0) {
      container.innerHTML = `<p class="text-gray-500 col-span-full">No cats with photos found.</p>`;
      return;
    }

    // Display cat name, gender, age, breed, and description
    catsWithPhotos.forEach((cat) => {
      const image =
        cat.photos[0]?.medium ||
        'https://www.premiumsvg.com/wimg_thumb/the-walking-cat-silhouette.webp';
      const name = cat.name || 'Unnamed';
      const gender = cat.gender || 'Unknown';
      const age = cat.age || 'Unknown';
      const breed = cat.breeds.primary || 'Unknown';
      const description = cat.description || 'No description available.';

      // HTML template for cat card
      const card = `<div class="card group rounded hover:shadow-sm sm:max-w-sm">
          <figure class="relative h-64 w-full overflow-hidden">
            <img 
              src="${image}" 
              alt="${name}" 
              class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
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

      container.insertAdjacentHTML('beforeend', card);
    });

    // Lazy load images
    const lazyImages = document.querySelectorAll('img.lazy');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          obs.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => observer.observe(img));
  } catch (err) {
    console.error('Failed to fetch cats:', err);
    container.innerHTML = `<p class="text-red-500 col-span-full">Error fetching cats. Please try again later.</p>`;
  }
}

loadCats();
