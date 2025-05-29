const fetchNYTBestsellerBooks = async () => {
  try {
    const response = await fetch(
      'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YYRTmuGHrdxW9AaXsNhXhNhApOa05QAG'
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response.status); // Log the status code
    // The response is a stream, so we need to read it as JSON
    let result = await response.json();
    // console.log(result); // Log the entire result
    let booksArray = result.results.books;
    // console.log(booksArray); // Log the books array
    const publishers = booksArray.map((book) => book.publisher);
    console.log(publishers); // Log the publishers array
    // 2. From the current bestseller list, show a list of unique publishers.
    const uniquePublishers = [...new Set(publishers)];
    uniquePublishers.forEach((publisher) => {
      console.log(`publisher: ${publisher}`);
    });

    // 3. Filter books with descriptions containing the word “mystery”
    const mysteryBooks = booksArray.filter((book) =>
      book.description.toLowerCase().includes('mystery')
    );

    console.log('\n Mystery Books:');
    mysteryBooks.forEach((book) => {
      console.log(`- ${book.title} by ${book.author}`);
    });

    // 4.how many books each publisher has on the list
    // Count how many books each publisher has
    const publisherCounts = booksArray.reduce((acc, book) => {
      acc[book.publisher] = (acc[book.publisher] || 0) + 1;
      return acc;
    }, {});

    console.log('Books per Publisher:');
    Object.entries(publisherCounts).forEach(([publisher, count]) => {
      console.log(`${publisher}: ${count}`);
    });

    const publisherMap = new Map();

    booksArray.forEach((book) => {
      const publisher = book.publisher;
      if (publisherMap.has(publisher)) {
        publisherMap.set(publisher, publisherMap.get(publisher) + 1);
      } else {
        publisherMap.set(publisher, 1);
      }
    });

    // 5. From the list of books, find and print the book with the longest title.

    let longestTitleBook = booksArray[0];

    for (const book of booksArray) {
      if (book.title.length > longestTitleBook.title.length) {
        longestTitleBook = book;
      }
    }

    console.log(
      `longest title: ${longestTitleBook.title} by ${longestTitleBook.author}`
    );

    // 6. if this week rank is higher than last week rank, print the book title and author
    const booksWithHigherRank = booksArray.filter(
      (book) => book.rank < book.rank_last_week
    );
    booksWithHigherRank.forEach((book) => {
      console.log(
        `Book with higher rank: ${book.title} by ${book.author} (Rank: ${book.rank})`
      );
    });

    return {
      uniquePublishers,
      mysteryBooks,
      publisherCounts,
      longestTitleBook,
    };
  } catch (error) {
    console.error('Error fetching song:', error);
  }
};

fetchNYTBestsellerBooks();
