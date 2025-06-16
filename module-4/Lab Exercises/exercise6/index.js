function addCard(article) {
  const template = document
    .getElementById('card-template')
    .content.cloneNode(true);
  template.querySelector('.card-title').innerText = article.title;
  template.querySelector('.card-text').innerText = article.content;
  document.querySelector('#card-list').appendChild(template);
}

fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  .then((response) => response.json())
  .then((data) => {
    const articles = data.map((post) => ({
      title: post.title,
      content: post.body,
    }));

    articles.forEach(addCard);
  })
  .catch((error) => {
    console.error('Error fetching posts:', error);
  });
