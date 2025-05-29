// run 'npm init' and accept all the defaults
// run 'npm install node-fetch'
// run 'npm pkg set type=module'

/* The below fetchURLData uses fetch to check the response for a successful status
code, and returns a promise containing the JSON sent by the remote server if successful
or an error if it failed. (To run this code in a node.js environment, follow the instructions in the
comments before the function.)

// previous code
/* import fetch from 'node-fetch';
globalThis.fetch = fetch;
function fetchURLData(url) {
  let fetchPromise = fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  });
  return fetchPromise;
} */

// a) Write a new version of this function using async/await
import fetch from 'node-fetch';
globalThis.fetch = fetch;

async function fetchURLData(url) {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// b) Test both functions with valid and invalid URLs

// valid URL
fetchURLData('https://kitsu.io/api/edge/trending/anime')
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// data: [ { id: '7442', type: 'anime', links: [Object], attributes: [Object], relationships: [Object] },

// invalid URL

fetchURLData('https://kitsu.io/api/edge/trending/catnime')
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// output: Error: Request failed with status 400

// c) (Extension) Extend your new function to accept an array of URLs and fetch all of them, using Promise.all to combine the results.
// Response: 😧
