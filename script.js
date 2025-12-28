const animeGrid = document.getElementById('animeGrid');
const searchInput = document.getElementById('searchInput');

// API থেকে ডাটা আনা
async function fetchAnime(query = '') {
    animeGrid.innerHTML = '<p>Loading...</p>';
    const url = query 
        ? `https://api.jikan.moe/v4/anime?q=${query}&limit=12` 
        : 'https://api.jikan.moe/v4/top/anime?limit=12';

    const res = await fetch(url);
    const data = await res.json();
    displayAnimes(data.data);
}

function displayAnimes(animes) {
    animeGrid.innerHTML = '';
    animes.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h4>${anime.title}</h4>
            <small style="color: #FF6400">Score: ${anime.score || 'N/A'}</small>
        `;
        animeGrid.appendChild(card);
    });
}

function searchAnime() {
    fetchAnime(searchInput.value);
}

// শুরুতে টপ এনিমি লোড করা
fetchAnime();
