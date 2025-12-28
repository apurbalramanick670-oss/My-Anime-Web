const apiBase = 'https://api.jikan.moe/v4';
const animeList = document.getElementById('anime-list');
const searchInput = document.getElementById('search-input');

async function fetchAnime(query = '') {
    const url = query ? `${apiBase}/anime?q=${query}` : `${apiBase}/top/anime`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayAnime(data.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayAnime(animes) {
    animeList.innerHTML = '';
    animes.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('anime-card');
        
        // ট্রেলার বা ভিডিও লিঙ্ক চেক করা
        const videoUrl = anime.trailer.embed_url;
        
        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>Score: ${anime.score || 'N/A'}</p>
                ${videoUrl ? 
                    `<button class="play-btn" onclick="playVideo('${videoUrl}')">▶ Watch Now</button>` : 
                    `<button class="play-btn" disabled style="background: gray;">No Video</button>`
                }
            </div>
        `;
        animeList.appendChild(card);
    });
}

// ভিডিও প্লে করার জন্য ফাংশন
function playVideo(url) {
    // এটি ইউজারকে সরাসরি ভিডিও প্লেয়ারে নিয়ে যাবে
    window.open(url, '_blank');
}

searchInput.addEventListener('input', (e) => {
    fetchAnime(e.target.value);
});

fetchAnime();

