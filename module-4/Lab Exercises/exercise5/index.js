// Initial content
let news = [
  { id: 1, title: 'Election Results', content: 'Newly elected minister...' },
  { id: 2, title: 'Sporting Success', content: 'World Cup winners...' },
  { id: 3, title: 'Tornado Warning', content: 'Residents should prepare...' },
  { id: 4, title: 'Election Results', content: 'Newly elected minister...' },
  { id: 5, title: 'Sporting Success', content: 'World Cup winners...' },
  { id: 6, title: 'Tornado Warning', content: 'Residents should prepare...' },
];

// Append a card for each article in the news array
function addCard(article) {
  // clone the template
  const template = document
    .getElementById('card-template')
    .content.cloneNode(true);
  // populate the template
  template.querySelector('.card-title').innerText = article.title;
  template.querySelector('.card-text').innerText = article.content;
  // include the populated template into the page
  document.querySelector('#card-list').appendChild(template);
}

// Initially display existing news
news.forEach(addCard);

// Fetch form display
const form = document.querySelector('form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  const newArticle = {
    id: news.length + 1,
    title: title,
    content: content,
  };

  news.push(newArticle);
  addCard(newArticle);
  form.reset();
});

// note: I don't know how to do the time out..
