const newsContainer = document.getElementById('newsContainer');
const trendingContainer = document.getElementById('trendingContainer');
const searchBtn = document.getElementById('searchBtn');
const filterBtn = document.getElementById('filterBtn');

async function fetchNews(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.news || [];
  } catch(err) {
    console.error(err);
    return [];
  }
}

function renderArticles(container, articles) {
  container.innerHTML = '';
  if(articles.length === 0) {
    container.innerHTML = '<p>No articles found.</p>';
    return;
  }
  articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow';
    card.innerHTML = `
      <img src="${article.image || ''}" class="w-full h-40 object-cover rounded mb-2"/>
      <h3 class="font-bold text-lg">${article.title}</h3>
      <p class="text-sm mb-2">${article.description || ''}</p>
      <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline">Read more</a>
    `;
    container.appendChild(card);
  });
}

// Initial load
async function loadNews() {
  const latest = await fetchNews('http://localhost:5000/api/latest');
  renderArticles(newsContainer, latest);

  const trending = await fetchNews('http://localhost:5000/api/trending');
  renderArticles(trendingContainer, trending);
}

searchBtn.addEventListener('click', async () => {
  const keywords = document.getElementById('searchInput').value.trim();
  if(!keywords) return;
  const results = await fetchNews(`http://localhost:5000/api/search?keywords=${encodeURIComponent(keywords)}`);
  renderArticles(newsContainer, results);
});

filterBtn.addEventListener('click', async () => {
  const category = document.getElementById('category').value;
  const language = document.getElementById('language').value;
  const region = document.getElementById('region').value;

  const query = new URLSearchParams({ category, language, region }).toString();
  const results = await fetchNews(`http://localhost:5000/api/latest?${query}`);
  renderArticles(newsContainer, results);
});

loadNews();
