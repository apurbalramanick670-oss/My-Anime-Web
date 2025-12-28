const animeList = document.getElementById('anime-list');
const historyList = document.getElementById('history-list');
const historySection = document.getElementById('history-section');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('video-modal');
const videoPlayer = document.getElementById('video-player');
const closeBtn = document.querySelector('.close-btn');
const clearBtn = document.getElementById('clear-history');

window.onload = displayHistory;

async function fetchAnime(query = '') {
    const url = query.length > 2 
        ? `https://api.jikan.moe/v4/anime?q=${query}&limit=20` 
        : `https://api.jikan.moe/v4/top/anime?limit=20`;

    try {
        const res = await fetch(url);
        const json = await res.json();
        renderAnime(json.data, animeList);
    } catch (err) {
        animeList.innerHTML = '<p>Connection Error.</p>';
    }
}

function renderAnime(animes, container) {
    container.innerHTML = '';
    if (!animes) return;
    animes.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('anime-card');
        card.innerHTML = `<img src="${anime.images.jpg.large_image_url}"><h3>${anime.title}</h3>`;
        card.onclick = () => {
            if(anime.trailer.embed_url) {
                // High Quality, Subtitles (cc_load_policy=1), and English Language UI
                videoPlayer.src = `${anime.trailer.embed_url}&autoplay=1&vq=hd1080&cc_load_policy=1&hl=en`;
                modal.style.display = 'block';
                saveToHistory(anime);
            } else {
                alert("Hindi Dub/English Sub coming soon for this title!");
            }
        };
        container.appendChild(card);
    });
}

function saveToHistory(anime) {
    let history = JSON.parse(localStorage.getItem('animeHistory')) || [];
    history = history.filter(item => item.mal_id !== anime.mal_id);
    history.unshift(anime);
    if (history.length > 8) history.pop();
    localStorage.setItem('animeHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem('animeHistory')) || [];
    if (history.length > 0) {
        historySection.style.display = 'block';
        renderAnime(history, historyList);
    } else {
        historySection.style.display = 'none';
    }
}

clearBtn.onclick = () => { localStorage.removeItem('animeHistory'); displayHistory(); };
closeBtn.onclick = () => { modal.style.display = 'none'; videoPlayer.src = ''; };

let timer;
searchInput.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        fetchAnime(e.target.value);
        document.getElementById('list-title').innerText = e.target.value ? "Search Results" : "Trending Now";
    }, 600);
});

fetchAnime();


