const apiBase = 'https://api.jikan.moe/v4';
const animeList = document.getElementById('anime-list');
const searchInput = document.getElementById('search-input');

async function fetchAnime(query = '') {
    const url = query ? `${apiBase}/anime?q=${query}` : `${apiBase}/top/anime`;
    const response = await fetch(url);
    const data = await response.json();
    displayAnime(data.data);
}

function displayAnime(animes) {
    animeList.innerHTML = '';
    animes.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('anime-card');
        
        // ট্রেলার লিঙ্ক চেক করা
        const trailerUrl = anime.trailer.embed_url;
        
        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            ${trailerUrl ? `<button onclick="window.open('${trailerUrl}', '_blank')">Watch Trailer</button>` : '<p>No Trailer Available</p>'}
        `;
        animeList.appendChild(card);
    });
}

searchInput.addEventListener('input', (e) => {
    fetchAnime(e.target.value);
});

fetchAnime();
