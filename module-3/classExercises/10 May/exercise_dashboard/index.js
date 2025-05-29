// fetch API using async/await, try/catch

const fetchNYTBooks = async () => {
  try {
    const response = await fetch(
      'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YYRTmuGHrdxW9AaXsNhXhNhApOa05QAG'
    );
    if (response.status !== 200) {
      // Check the status is 200 OR (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response.status); // Log the status code
    // The response is a stream, so we need to read it as JSON
    let result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

fetchNYTBooks();
