<template>
  <div class="vue-media-lounge">
    <!-- Header with badge -->
    <div class="lounge-header">
      <div class="tech-badge">
        <span class="tech-dot"></span>
        <span>Vue 3 Reactive Lounge Component</span>
        <span class="badge-framework">Vue 3 + React 18 Hybrid</span>
      </div>
      <h3 class="lounge-title">The Interactive Media & Gaming Station</h3>
      <p class="lounge-subtitle">
        Experience live audio synthesis, test movie mood curations, and run game benchmark estimates in real time.
      </p>
    </div>

    <!-- Interactive Tabs -->
    <div class="lounge-tabs">
      <button 
        :class="['lounge-tab-btn', { active: activeTab === 'music' }]"
        @click="activeTab = 'music'"
      >
        <span class="tab-icon">🎧</span>
        <span class="tab-label-full">Live Audio Lounge</span>
        <span class="tab-label-short">Audio</span>
      </button>
      <button 
        :class="['lounge-tab-btn', { active: activeTab === 'movies' }]"
        @click="activeTab = 'movies'"
      >
        <span class="tab-icon">🎬</span>
        <span class="tab-label-full">Movie Mood Matcher</span>
        <span class="tab-label-short">Movies</span>
      </button>
      <button 
        :class="['lounge-tab-btn', { active: activeTab === 'gaming' }]"
        @click="activeTab = 'gaming'"
      >
        <span class="tab-icon">🎮</span>
        <span class="tab-label-full">Gaming Benchmarks</span>
        <span class="tab-label-short">Gaming</span>
      </button>
    </div>

    <!-- TAB 1: MUSIC LOUNGE (HINDI SOULFUL & BOLLYWOOD HITS) -->
    <div v-if="activeTab === 'music'" class="tab-content music-content">
      <!-- Artist Filter Chips -->
      <div class="artist-filters-row">
        <span class="filter-lead-label">Favorite Artists:</span>
        <div class="artist-chips-wrap">
          <button 
            v-for="artist in artistFilters" 
            :key="artist"
            :class="['artist-chip', { active: selectedArtistFilter === artist }]"
            @click="selectedArtistFilter = artist"
          >
            {{ artist }}
          </button>
        </div>
      </div>

      <div class="music-card-grid">
        <!-- Player Deck -->
        <div class="player-deck">
          <div class="deck-top">
            <div class="vinyl-display" :class="{ spinning: isAudioPlaying }">
              <div class="vinyl-inner">
                <span class="vinyl-center-dot"></span>
              </div>
            </div>
            <div class="deck-meta">
              <span class="deck-pill">Ayush's Handpicked Hindi Gem</span>
              <h4>{{ currentSong.title }}</h4>
              <p class="track-desc">{{ currentSong.movie }} • {{ currentSong.artist }}</p>
              <div class="track-tags">
                <span class="track-tag">{{ currentSong.genre }}</span>
                <span class="track-tag">{{ currentSong.mood }}</span>
                <span class="track-tag">Curated by Ayush</span>
              </div>
              <div class="deck-page-link-wrap">
                <a 
                  :href="'#/track/' + currentSong.id" 
                  class="deck-direct-page-btn"
                  title="Open dedicated song detail page with lyrics, HD video & Spotify"
                >
                  <span>📖 Full Song Page &amp; Lyrics</span>
                  <span class="arr-ico">↗</span>
                </a>
              </div>
            </div>
          </div>

          <!-- DIRECT SPOTIFY EMBED & FULL HD YOUTUBE PLAYER -->
          <div class="full-song-embed-box">
            <div class="video-player-topbar">
              <div class="player-engine-toggle">
                <button 
                  type="button"
                  class="engine-tab-btn" 
                  :class="{ active: playerEngine === 'spotify' }" 
                  @click="playerEngine = 'spotify'"
                  title="Play full studio audio via Spotify Embed"
                >
                  <span class="spot-icon">🟢</span> Spotify Audio
                </button>
                <button 
                  type="button"
                  class="engine-tab-btn" 
                  :class="{ active: playerEngine === 'youtube' }" 
                  @click="playerEngine = 'youtube'"
                  title="Watch official Full HD Video on YouTube"
                >
                  <span class="yt-icon">🎬</span> YouTube Video
                </button>
              </div>
              <span class="video-duration-pill">⏱ {{ currentSong.duration }}</span>
            </div>
            
            <!-- SPOTIFY EMBED PLAYER (Full Studio Audio) -->
            <iframe 
              v-if="playerEngine === 'spotify'"
              class="spotify-song-iframe"
              :src="'https://open.spotify.com/embed/track/' + currentSong.spotifyTrackId + '?utm_source=generator&theme=0'" 
              width="100%" 
              height="230" 
              frameborder="0" 
              allowfullscreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              :title="currentSong.title + ' Spotify Embed Track'"
            ></iframe>

            <!-- YOUTUBE PLAYER (Full HD Video) -->
            <iframe 
              v-else
              class="full-song-iframe"
              :src="'https://www.youtube-nocookie.com/embed/' + currentSong.youtubeId + '?rel=0&autoplay=0'" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
              :title="currentSong.title + ' Official Full Video'"
            ></iframe>

            <div class="full-song-footer-tag">
              <span class="video-meta-txt">
                <template v-if="playerEngine === 'spotify'">
                  🟢 Spotify Audio: <strong>{{ currentSong.title }}</strong> • {{ currentSong.movie }} • {{ currentSong.artist }}
                </template>
                <template v-else>
                  🎬 YouTube Video: <strong>{{ currentSong.title }}</strong> • {{ currentSong.movie }} • {{ currentSong.artist }}
                </template>
              </span>
              <a 
                v-if="playerEngine === 'spotify'"
                :href="currentSong.spotifyUrl" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="tag-direct-spotify"
              >
                Open in Spotify ↗
              </a>
              <a 
                v-else
                :href="'https://www.youtube.com/watch?v=' + currentSong.youtubeId" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="tag-direct-yt"
              >
                Open on YouTube ↗
              </a>
            </div>
          </div>

          <!-- Equalizer Bar Visualization -->
          <div class="equalizer-strip">
            <div 
              v-for="bar in 24" 
              :key="bar" 
              class="eq-bar active"
              :style="{ animationDelay: (bar * 0.08) + 's' }"
            ></div>
          </div>

          <!-- Ayush's Personal Curator Note -->
          <div class="curator-music-note">
            <div class="curator-mini-avatar">
              <img :src="getAssetUrl('images/hero-ayush.jpg')" alt="Ayush Shrivastava" />
            </div>
            <div class="curator-mini-text">
              <strong>Ayush's Review Note:</strong>
              <p>"{{ currentSong.ayushNote }}"</p>
            </div>
          </div>

          <!-- Deck Quick Actions (Compact 4-Button Row) -->
          <div class="deck-controls deck-controls-hindi">
            <button 
              type="button"
              class="ctrl-btn btn-spotify-link"
              :class="{ 'ctrl-active': playerEngine === 'spotify' }"
              @click="playerEngine = 'spotify'"
              title="Switch to Spotify Embed Audio Player"
            >
              <span>🟢 Spotify</span>
            </button>

            <button 
              type="button"
              class="ctrl-btn btn-yt-watch"
              :class="{ 'ctrl-active': playerEngine === 'youtube' }"
              @click="playerEngine = 'youtube'"
              title="Switch to YouTube HD Video Player"
            >
              <span>▶ YouTube</span>
            </button>

            <a 
              :href="'#/track/' + currentSong.id" 
              class="ctrl-btn btn-page-link-deck"
              title="View full detail page & complete lyrics"
            >
              <span>📖 Lyrics &amp; Details ↗</span>
            </a>

            <a 
              :href="'https://wa.me/919508678989?text=Hi%20Ayush,%20I%20love%20the%20song%20' + encodeURIComponent(currentSong.title) + '%20(' + encodeURIComponent(currentSong.movie) + ')!'" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="ctrl-btn btn-wa-discuss-song"
              title="Chat about this track on WhatsApp"
            >
              <span>💬 WhatsApp</span>
            </a>
          </div>
        </div>

        <!-- Track Playlist Selection -->
        <div class="tracks-list-panel">
          <div class="tracks-panel-head">
            <div class="panel-head-titles">
              <h5>Bollywood & Soulful Vault</h5>
              <p class="panel-head-sub">28 Curated Hits • Instant HD Playback</p>
            </div>
            <span class="tracks-count-badge">{{ filteredSongs.length }} Tracks</span>
          </div>

          <!-- Search Box -->
          <div class="vault-search-box">
            <span class="search-lens">🔍</span>
            <input 
              v-model="songSearchQuery" 
              type="text" 
              placeholder="Search by song name, movie, singer..." 
              class="vault-search-input"
            />
            <button v-if="songSearchQuery" @click="songSearchQuery = ''" class="clear-search-btn" title="Clear search">✕</button>
          </div>

          <!-- Category Quick Filters -->
          <div class="category-pills-row">
            <button 
              v-for="cat in musicCategories" 
              :key="cat.id" 
              :class="['category-pill-btn', { active: selectedCategory === cat.id }]"
              @click="selectedCategory = cat.id"
            >
              {{ cat.label }}
            </button>
          </div>
          
          <div class="tracks-scroll-list">
            <div 
              v-for="(song, idx) in filteredSongs" 
              :key="song.id" 
              :class="['track-select-card', { selected: selectedSongId === song.id }]"
              @click="selectedSongId = song.id"
            >
              <div class="track-num">
                <span v-if="selectedSongId === song.id" class="now-playing-icon">▶</span>
                <span v-else class="track-idx">{{ idx + 1 }}</span>
              </div>
              <div class="track-info">
                <h6>{{ song.title }}</h6>
                <span>{{ song.movie }} • {{ song.artist }}</span>
              </div>
              <div class="track-card-right">
                <span class="badge-mini">{{ song.artistTag }}</span>
                <a 
                  :href="'#/track/' + song.id" 
                  class="track-card-lyrics-link" 
                  @click.stop 
                  title="Open dedicated page for this track with lyrics, HD video & Spotify"
                >
                  Page &amp; Lyrics ↗
                </a>
                <span class="track-time">{{ song.duration }}</span>
              </div>
            </div>

            <div v-if="filteredSongs.length === 0" class="no-songs-found">
              <span>🎵 No matching tracks found</span>
              <button @click="songSearchQuery = ''; selectedCategory = 'all'; selectedArtistFilter = 'All Artists'" class="btn-reset-filters">Reset Filters</button>
            </div>
          </div>

          <div class="spotify-link-box">
            <h6>Want Ayush's Complete 500+ Hindi Vault?</h6>
            <p>From late-night lo-fi edits to iconic 2000s Bollywood melodies.</p>
            <a 
              href="https://wa.me/919508678989?text=Hi%20Ayush,%20please%20send%20your%20curated%20Bollywood%20%26%20Hindi%20Spotify%20playlists!" 
              target="_blank" 
              rel="noopener" 
              class="btn-spotify-wa"
            >
              <span>Get Full Playlist via WhatsApp</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>


    <!-- TAB 2: MOVIE MOOD MATCHER -->
    <div v-if="activeTab === 'movies'" class="tab-content movie-content">
      <div class="mood-selector-wrap">
        <label class="mood-label">Pick Your Current Cinema Mood:</label>
        <div class="mood-chips">
          <button 
            v-for="mood in movieMoods" 
            :key="mood.id"
            :class="['mood-chip', { active: selectedMood === mood.id }]"
            @click="selectedMood = mood.id"
          >
            {{ mood.label }}
          </button>
        </div>
      </div>

      <div class="movie-curated-card">
        <div class="movie-poster-col">
          <div class="movie-mock-frame">
            <span class="corner-ribbon">Ayush Score: {{ currentMovie.score }}</span>
            <div class="poster-graphic" :style="{ background: currentMovie.bgGradient }">
              <span class="cinema-icon">{{ currentMovie.icon }}</span>
              <h5>{{ currentMovie.title }}</h5>
              <span class="poster-year">{{ currentMovie.year }} • {{ currentMovie.runtime }}</span>
            </div>
          </div>
        </div>

        <div class="movie-info-col">
          <div class="movie-top-badges">
            <span class="pill-genre">{{ currentMovie.genre }}</span>
            <span class="pill-director">Director: {{ currentMovie.director }}</span>
            <span class="pill-avail">Streaming: {{ currentMovie.platform }}</span>
          </div>

          <h4>{{ currentMovie.title }} ({{ currentMovie.year }})</h4>
          <p class="movie-synopsis">{{ currentMovie.synopsis }}</p>

          <div class="curator-quote">
            <div class="quote-avatar">
              <img :src="getAssetUrl('images/hero-ayush.jpg')" alt="Ayush Shrivastava" />
            </div>
            <div class="quote-text">
              <strong>Ayush's Review Note:</strong>
              <p>"{{ currentMovie.ayushQuote }}"</p>
            </div>
          </div>

          <div class="movie-action-row">
            <button class="btn-watchlist" @click="toggleWatchlist(currentMovie.title)">
              {{ isInWatchlist(currentMovie.title) ? '✓ Saved in Watchlist' : '+ Add to Watchlist (' + watchlistCount + ')' }}
            </button>
            <a 
              :href="'https://wa.me/919508678989?text=Hi%20Ayush,%20I%20want%20to%20discuss%20the%20movie%20' + encodeURIComponent(currentMovie.title)"
              target="_blank" 
              rel="noopener"
              class="btn-discuss"
            >
              Discuss with Ayush on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: GAMING BENCHMARKS -->
    <div v-if="activeTab === 'gaming'" class="tab-content gaming-content">
      <div class="gaming-tool-grid">
        <!-- Controls -->
        <div class="benchmark-controls">
          <div class="control-group">
            <div class="game-select-header-row">
              <label>Select Game Title:</label>
              <span class="game-count-badge">{{ filteredGames.length }} Games</span>
            </div>

            <!-- Quick Game Category Filter Pills -->
            <div class="game-cat-chips-row">
              <button 
                v-for="cat in gameCategoryFilters" 
                :key="cat"
                type="button"
                :class="['game-cat-chip-btn', { active: selectedGameCategory === cat }]"
                @click="onSelectGameCategory(cat)"
              >
                {{ cat }}
              </button>
            </div>

            <select v-model="selectedGameId" class="game-select">
              <option v-for="game in filteredGames" :key="game.id" :value="game.id">
                {{ game.name }} ({{ game.genre }})
              </option>
            </select>
          </div>

          <div class="control-group">
            <label>Testing Resolution &amp; Quality:</label>
            <div class="res-buttons">
              <button 
                v-for="res in ['1080p Ultra', '1440p High', '4K Cinematic']" 
                :key="res"
                :class="['res-btn', { active: selectedResolution === res }]"
                @click="selectedResolution = res"
              >
                {{ res }}
              </button>
            </div>
          </div>

          <div class="rig-specs-box">
            <h6>Ayush's BattleRig Configuration</h6>
            <ul>
              <li><strong>GPU:</strong> NVIDIA RTX 4080 Super (16GB)</li>
              <li><strong>CPU:</strong> AMD Ryzen 7 7800X3D</li>
              <li><strong>RAM:</strong> 32GB DDR5 6000MHz CL30</li>
              <li><strong>Display:</strong> 165Hz IPS Ultra-Wide</li>
            </ul>
          </div>
        </div>

        <!-- Result Card -->
        <div class="benchmark-result-card">
          <div class="result-header">
            <div>
              <span class="game-tag">{{ currentGame.category }} • {{ currentGame.genre }}</span>
              <h4>{{ currentGame.name }}</h4>
            </div>
            <div class="fps-meter">
              <span class="fps-number">{{ calculatedFps }}</span>
              <span class="fps-label">FPS Avg</span>
            </div>
          </div>

          <div class="verdict-banner" :class="verdictClass">
            <span class="verdict-icon">⚡</span>
            <span>Verdict: {{ currentGame.verdict }}</span>
          </div>

          <div class="benchmark-breakdown">
            <div class="metric-item">
              <span>Ayush's Fun Rating</span>
              <strong>{{ currentGame.rating }}/10</strong>
            </div>
            <div class="metric-item">
              <span>Ray Tracing Overhead</span>
              <strong>{{ currentGame.rayTracing }}</strong>
            </div>
            <div class="metric-item">
              <span>Recommended GPU</span>
              <strong>{{ currentGame.recommendedGpu }}</strong>
            </div>
          </div>

          <div class="gamer-note">
            <p><strong>Ayush's Verdict:</strong> "{{ currentGame.ayushNote }}"</p>
          </div>

          <a 
            :href="'https://wa.me/919508678989?text=Hey%20Ayush,%20want%20to%20team%20up%20or%20talk%20about%20' + encodeURIComponent(currentGame.name) + '!'"
            target="_blank" 
            rel="noopener" 
            class="btn-gamer-squad"
          >
            <span>🎮 Team Up with Ayush on Discord / WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getAssetUrl } from '../utils/assets';
import { songsData as hindiTracks } from '../data/songsData.js';
import { gamesData as games } from '../data/gamesData.js';


// State
const activeTab = ref('music');
const selectedMood = ref('scifi');
const selectedGameId = ref('cyberpunk-2077');
const selectedResolution = ref('1440p High');
const watchlist = ref(new Set());
const watchlistCount = ref(0);

// Gaming Category Filters
const selectedGameCategory = ref('All (37)');
const gameCategoryFilters = [
  'All (37)',
  'Ray Tracing',
  'PlayStation',
  'Open World',
  'Action RPG',
  'Esports / MP',
  'Upcoming'
];

const filteredGames = computed(() => {
  if (selectedGameCategory.value === 'All (37)') return games;
  if (selectedGameCategory.value === 'Ray Tracing') return games.filter(g => g.category === 'Ray Tracing Showcase');
  if (selectedGameCategory.value === 'PlayStation') return games.filter(g => g.category === 'PlayStation Hits');
  if (selectedGameCategory.value === 'Open World') return games.filter(g => g.category === 'Open World Masterpiece');
  if (selectedGameCategory.value === 'Action RPG') return games.filter(g => g.category === 'Action RPG');
  if (selectedGameCategory.value === 'Esports / MP') return games.filter(g => g.category === 'Esports & Multiplayer');
  if (selectedGameCategory.value === 'Upcoming') return games.filter(g => g.category === 'Upcoming Anticipated');
  return games;
});

function onSelectGameCategory(cat) {
  selectedGameCategory.value = cat;
  const list = filteredGames.value;
  if (list.length > 0 && !list.some(g => g.id === selectedGameId.value)) {
    selectedGameId.value = list[0].id;
  }
}

// Hindi Music Lounge State (Ayush's Favorite Bollywood & Soulful Hits)
const isAudioPlaying = ref(true);
const playerEngine = ref('spotify'); // 'spotify' (Spotify Embed Player) or 'youtube' (YouTube Full Video)
const songSearchQuery = ref('');
const selectedCategory = ref('all');
const selectedArtistFilter = ref('All Artists');
const selectedSongId = ref('mohit-tum-se-hi');

const artistFilters = [
  'All Artists',
  'KK Classics',
  'Arijit Singh',
  'Shreya Ghoshal',
  'Sonu Nigam',
  'Atif Aslam',
  'Mohit Chauhan',
  'Aditya Rikhari',
  'Salman Hits'
];

const musicCategories = [
  { id: 'all', label: 'All Songs' },
  { id: 'soulful', label: 'Soulful & Romantic' },
  { id: 'nostalgia', label: '2000s Nostalgia & SRK' },
  { id: 'salman', label: 'Salman Khan Vault' },
  { id: 'bangers', label: 'Party & Upbeat' }
];

const filteredSongs = computed(() => {
  return hindiTracks.filter(song => {
    // 1. Search Query filter (matches title, movie, artist, genre)
    if (songSearchQuery.value && songSearchQuery.value.trim()) {
      const q = songSearchQuery.value.toLowerCase().trim();
      const matchText = `${song.title} ${song.movie} ${song.artist} ${song.genre} ${song.artistTag}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    // 2. Category filter
    if (selectedCategory.value !== 'all' && song.category !== selectedCategory.value) {
      return false;
    }
    // 3. Artist filter
    if (selectedArtistFilter.value !== 'All Artists') {
      if (selectedArtistFilter.value === 'Salman Hits') {
        const isSalman = song.category === 'salman' || song.artistTag === 'Salman Hits' || song.movie.includes('Mujhse Shaadi') || song.movie.includes('Tere Naam') || song.movie.includes('Kick');
        if (!isSalman) return false;
      } else {
        const matchArtist = song.artistTag === selectedArtistFilter.value || song.artist.includes(selectedArtistFilter.value);
        if (!matchArtist) return false;
      }
    }
    return true;
  });
});

const currentSong = computed(() => {
  return hindiTracks.find(s => s.id === selectedSongId.value) || hindiTracks[0];
});


// Movies Data
const movieMoods = [
  { id: 'scifi', label: 'Mind-Bending Sci-Fi 🚀' },
  { id: 'noir', label: 'Late Night Crime & Noir 🕵️' },
  { id: 'heartfelt', label: 'Heartfelt Indie Cinema 🌿' },
  { id: 'adrenaline', label: 'Adrenaline High-Stakes 💥' },
  { id: 'retro', label: 'Cult Classic Masterpiece 📼' }
];

const moviesMap = {
  scifi: {
    title: 'Interstellar',
    year: '2014',
    runtime: '169 min',
    director: 'Christopher Nolan',
    genre: 'Sci-Fi / Space Odyssey',
    score: '9.8',
    platform: 'Prime Video / Netflix',
    icon: '🪐',
    bgGradient: 'linear-gradient(135deg, #091E3A 0%, #2F80ED 50%, #2D9CDB 100%)',
    synopsis: 'A team of explorers travels through a wormhole in space in an attempt to ensure humanity\'s survival as Earth faces catastrophic famine.',
    ayushQuote: 'Hans Zimmer\'s organ score coupled with the gravitational time dilation on Miller\'s planet will give you goosebumps every single time.'
  },
  noir: {
    title: 'Blade Runner 2049',
    year: '2017',
    runtime: '164 min',
    director: 'Denis Villeneuve',
    genre: 'Neo-Noir / Cyberpunk',
    score: '9.6',
    platform: 'Sony LIV / Prime',
    icon: '🏙️',
    bgGradient: 'linear-gradient(135deg, #1A002C 0%, #6B117B 50%, #FF6584 100%)',
    synopsis: 'Young Blade Runner K discovers a long-buried secret that leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.',
    ayushQuote: 'Roger Deakins\' cinematography here is pure poetry. Every single frame deserves to be hung in an art gallery.'
  },
  heartfelt: {
    title: 'Past Lives',
    year: '2023',
    runtime: '106 min',
    director: 'Celine Song',
    genre: 'Romantic Drama / Indie',
    score: '9.5',
    platform: 'Lionsgate Play / Apple TV',
    icon: '🌸',
    bgGradient: 'linear-gradient(135deg, #2D142C 0%, #510A32 50%, #C72C41 100%)',
    synopsis: 'Nora and Hae Sung, two deeply connected childhood friends, are separated after Nora\'s family emigrates from South Korea. Two decades later, they reunite.',
    ayushQuote: 'A devastatingly beautiful meditation on \'In-Yun\' (destiny) and the roads not taken. Subtle, quiet, and heartbreakingly real.'
  },
  adrenaline: {
    title: 'Mad Max: Fury Road',
    year: '2015',
    runtime: '120 min',
    director: 'George Miller',
    genre: 'Post-Apocalyptic Action',
    score: '9.7',
    platform: 'JioCinema / Prime',
    icon: '🔥',
    bgGradient: 'linear-gradient(135deg, #4A1204 0%, #A83210 50%, #F59E0B 100%)',
    synopsis: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners and a drifter.',
    ayushQuote: 'Pure visual adrenaline. Practical stunts, a flame-throwing guitarist, and pacing that never lets you breathe for a second.'
  },
  retro: {
    title: 'Taxi Driver',
    year: '1976',
    runtime: '114 min',
    director: 'Martin Scorsese',
    genre: 'Psychological Thriller',
    score: '9.4',
    platform: 'Netflix / Apple TV',
    icon: '🚖',
    bgGradient: 'linear-gradient(135deg, #1C1917 0%, #44403C 50%, #78716C 100%)',
    synopsis: 'A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence fuels his urge for violent action.',
    ayushQuote: 'De Niro\'s iconic portrait of urban alienation in rainy 70s Manhattan. Bernard Herrmann\'s jazz score is unforgettable.'
  }
};

const currentMovie = computed(() => {
  return moviesMap[selectedMood.value] || moviesMap.scifi;
});

function isInWatchlist(title) {
  return watchlist.value.has(title);
}

function toggleWatchlist(title) {
  if (watchlist.value.has(title)) {
    watchlist.value.delete(title);
  } else {
    watchlist.value.add(title);
  }
  watchlistCount.value = watchlist.value.size;
}

const currentGame = computed(() => {
  return games.find(g => g.id === selectedGameId.value) || games[0];
});

const calculatedFps = computed(() => {
  return currentGame.value.baseFps[selectedResolution.value] || 90;
});

const verdictClass = computed(() => {
  return calculatedFps.value >= 60 ? 'verdict-smooth' : 'verdict-heavy';
});
</script>

<style scoped>
.vue-media-lounge {
  background: #0B0F19;
  border-radius: var(--radius-xl);
  padding: 1.8rem 2rem;
  color: #F8FAFC;
  box-shadow: 0 25px 60px -15px rgba(11, 15, 25, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
}

.vue-media-lounge::before {
  content: '';
  position: absolute;
  top: -150px;
  right: -150px;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(79, 70, 229, 0.25) 0%, transparent 70%);
  pointer-events: none;
}

.lounge-header {
  text-align: center;
  margin-bottom: 1.35rem;
  position: relative;
  z-index: 2;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(30, 41, 59, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.3rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.76rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

.tech-dot {
  width: 7px;
  height: 7px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10B981;
}

.badge-framework {
  background: #42B883;
  color: #0B0F19;
  font-size: 0.68rem;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
  font-weight: 700;
}

.lounge-title {
  font-size: clamp(1.5rem, 2.6vw, 2.1rem);
  color: #FFFFFF;
  margin-bottom: 0.35rem;
}

.lounge-subtitle {
  color: #94A3B8;
  max-width: 580px;
  margin: 0 auto;
  font-size: 0.9rem;
  line-height: 1.45;
}

/* Tabs */
.lounge-tabs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.35rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.lounge-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  padding: 0.6rem 1.3rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.88rem;
  transition: all 0.25s ease;
}

.lounge-tab-btn:hover {
  background: rgba(49, 65, 96, 0.8);
  color: #FFFFFF;
}

.lounge-tab-btn.active {
  background: #4F46E5;
  color: #FFFFFF;
  border-color: #6366F1;
  box-shadow: 0 8px 24px -4px rgba(79, 70, 229, 0.5);
}

.tab-label-short {
  display: none;
}

.tab-label-full {
  display: inline;
}

/* Artist Filters */
.artist-filters-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.35rem;
  flex-wrap: wrap;
}

.filter-lead-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #FBBF24;
}

.artist-chips-wrap {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.artist-chip {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #CBD5E1;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
}

.artist-chip:hover {
  background: rgba(49, 65, 96, 0.8);
  color: #FFFFFF;
}

.artist-chip.active {
  background: var(--accent-gold-gradient);
  color: #0B0F19;
  font-weight: 700;
  border-color: #F59E0B;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);
}

/* Music Tab Grid */
.music-card-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1.35rem;
  align-items: start;
}

.player-deck {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 1.35rem 1.4rem;
}

.deck-top {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  margin-bottom: 0.95rem;
}

.vinyl-display {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: radial-gradient(circle, #222 10%, #111 40%, #000 70%);
  border: 3px solid #334155;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: spinVinyl 6s linear infinite;
}

@keyframes spinVinyl {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.vinyl-inner {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #F59E0B;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
}

.vinyl-center-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0B0F19;
}

.deck-meta h4 {
  font-size: 1.25rem;
  color: #FFFFFF;
  margin: 0.15rem 0;
}

.deck-pill {
  font-size: 0.7rem;
  background: rgba(245, 158, 11, 0.15);
  color: #FBBF24;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  font-weight: 700;
  display: inline-block;
}

.track-desc {
  font-size: 0.82rem;
  color: #94A3B8;
  margin-bottom: 0.35rem;
}

.track-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.track-tag {
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  color: #CBD5E1;
}

/* Full HD Video & Audio Player Box */
.full-song-embed-box {
  margin: 0.85rem 0;
  border-radius: 12px;
  overflow: hidden;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6);
  position: relative;
}

.video-player-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0.8rem;
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.live-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #34D399;
  font-size: 0.74rem;
  font-weight: 600;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px #10B981;
  animation: pulseDot 1.8s infinite;
}

@keyframes pulseDot {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.video-duration-pill {
  background: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  color: #94A3B8;
  font-weight: 600;
}

.full-song-iframe {
  width: 100%;
  height: 230px;
  aspect-ratio: 16 / 9;
  border: none;
  display: block;
  background: #000000;
}

.full-song-footer-tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.8rem;
  background: rgba(15, 23, 42, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
}

.video-meta-txt {
  color: #E2E8F0;
  font-size: 0.74rem;
}

.tag-direct-yt {
  background: rgba(239, 68, 68, 0.15);
  color: #F87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tag-direct-yt:hover {
  background: #EF4444;
  color: #FFFFFF;
}

.tag-direct-spotify {
  background: rgba(29, 185, 84, 0.15);
  color: #34D399;
  border: 1px solid rgba(29, 185, 84, 0.35);
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tag-direct-spotify:hover {
  background: #1DB954;
  color: #FFFFFF;
}

.player-engine-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(30, 41, 59, 0.9);
  padding: 0.2rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.engine-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: #94A3B8;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.engine-tab-btn:hover {
  color: #FFFFFF;
}

.engine-tab-btn.active {
  background: rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.spotify-song-iframe {
  width: 100%;
  height: 230px;
  border: none;
  display: block;
  background: #121212;
}

.deck-controls-hindi .ctrl-btn.ctrl-active {
  outline: 2px solid #FFFFFF;
  outline-offset: 2px;
}

.video-meta-txt strong {
  color: #FBBF24;
}


/* Equalizer */
.equalizer-strip {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 22px;
  background: rgba(15, 23, 42, 0.7);
  padding: 3px 8px;
  border-radius: 6px;
  margin-bottom: 0.85rem;
}

.eq-bar {
  flex: 1;
  background: #4F46E5;
  border-radius: 2px;
  transition: height 0.2s ease;
}

.eq-bar.active {
  animation: bounceEq 0.9s ease-in-out infinite alternate;
  background: linear-gradient(to top, #4F46E5, #F59E0B);
}

@keyframes bounceEq {
  0% { height: 4px; }
  50% { height: 18px; }
  100% { height: 8px; }
}

/* Curator Music Note */
.curator-music-note {
  display: flex;
  gap: 0.75rem;
  background: rgba(30, 41, 59, 0.5);
  border-left: 3px solid #F59E0B;
  padding: 0.6rem 0.85rem;
  border-radius: 0 10px 10px 0;
  margin-bottom: 0.9rem;
}

.curator-mini-avatar img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #F59E0B;
}

.curator-mini-text strong {
  font-size: 0.76rem;
  color: #FBBF24;
  display: block;
}

.curator-mini-text p {
  font-size: 0.8rem;
  color: #E2E8F0;
  font-style: italic;
  margin-top: 0.15rem;
  line-height: 1.35;
}

/* Controls - 2x2 Grid (Row 1: Spotify + YouTube | Row 2: Lyrics + WhatsApp) */
.deck-controls-hindi {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.deck-controls-hindi .ctrl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.65rem 0.75rem;
  border-radius: 9px;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-yt-watch {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 12px -2px rgba(239, 68, 68, 0.4);
}

.btn-yt-watch:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -2px rgba(239, 68, 68, 0.55);
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
}

.btn-spotify-link {
  background: #1DB954;
  color: #FFFFFF;
  box-shadow: 0 4px 12px -2px rgba(29, 185, 84, 0.35);
}

.btn-spotify-link:hover {
  transform: translateY(-2px);
  background: #1AA34A;
  box-shadow: 0 8px 16px -2px rgba(29, 185, 84, 0.5);
}

.btn-wa-discuss-song {
  background: #25D366;
  color: #FFFFFF;
  box-shadow: 0 4px 12px -2px rgba(37, 211, 102, 0.3);
}

.btn-wa-discuss-song:hover {
  background: #1EBE5D;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -2px rgba(37, 211, 102, 0.45);
}

/* Track list */
.tracks-list-panel {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 1.35rem 1.4rem;
  display: flex;
  flex-direction: column;
}

.tracks-panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.65rem;
}

.panel-head-titles h5 {
  font-size: 1.05rem;
  color: #FFFFFF;
  margin: 0;
}

.panel-head-sub {
  font-size: 0.74rem;
  color: #94A3B8;
  margin-top: 0.15rem;
}

.tracks-count-badge {
  font-size: 0.7rem;
  background: rgba(245, 158, 11, 0.15);
  color: #FBBF24;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-weight: 700;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

/* Vault Search Box */
.vault-search-box {
  display: flex;
  align-items: center;
  position: relative;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.35rem 0.75rem;
  margin-bottom: 0.55rem;
  transition: all 0.2s ease;
}

.vault-search-box:focus-within {
  border-color: #6366F1;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
}

.search-lens {
  font-size: 0.8rem;
  margin-right: 0.45rem;
  opacity: 0.7;
}

.vault-search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #FFFFFF;
  font-size: 0.8rem;
  width: 100%;
}

.vault-search-input::placeholder {
  color: #64748B;
}

.clear-search-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #94A3B8;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.clear-search-btn:hover {
  background: #EF4444;
  color: #FFFFFF;
}

/* Category Quick Pills */
.category-pills-row {
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;
  margin-bottom: 0.55rem;
  scrollbar-width: thin;
}

.category-pill-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.category-pill-btn:hover {
  color: #FFFFFF;
  background: rgba(49, 65, 96, 0.7);
}

.category-pill-btn.active {
  background: #4F46E5;
  color: #FFFFFF;
  border-color: #6366F1;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4);
}

.tracks-scroll-list {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  max-height: 335px;
  overflow-y: auto;
  padding-right: 6px;
}

/* Sleek custom scrollbar */
.tracks-scroll-list::-webkit-scrollbar {
  width: 5px;
}

.tracks-scroll-list::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 4px;
}

.tracks-scroll-list::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}

.tracks-scroll-list::-webkit-scrollbar-thumb:hover {
  background: #F59E0B;
}

.track-select-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.52rem 0.75rem;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: all 0.2s ease;
}

.track-select-card:hover {
  background: rgba(49, 65, 96, 0.6);
  transform: translateX(3px);
  border-color: rgba(255, 255, 255, 0.12);
}

.track-select-card.selected {
  background: rgba(79, 70, 229, 0.3);
  border-color: #6366F1;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.track-num {
  font-size: 0.75rem;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  color: #94A3B8;
  font-weight: 700;
  flex-shrink: 0;
}

.track-select-card.selected .track-num {
  background: #F59E0B;
  color: #0B0F19;
}

.now-playing-icon {
  font-size: 0.7rem;
  animation: pulseDot 1.2s infinite;
}

.track-info {
  flex: 1;
  min-width: 0;
}

.track-info h6 {
  font-size: 0.82rem;
  color: #FFFFFF;
  margin: 0 0 0.1rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-info span {
  font-size: 0.7rem;
  color: #94A3B8;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
  flex-shrink: 0;
}

.badge-mini {
  font-size: 0.64rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.12rem 0.4rem;
  border-radius: 4px;
  color: #CBD5E1;
  font-weight: 600;
}

.track-select-card.selected .badge-mini {
  background: rgba(99, 102, 241, 0.35);
  color: #E0E7FF;
  border: 1px solid rgba(99, 102, 241, 0.5);
}

.track-time {
  font-size: 0.66rem;
  color: #64748B;
  font-family: monospace;
}

.no-songs-found {
  padding: 2rem 1rem;
  text-align: center;
  color: #94A3B8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
}

.btn-reset-filters {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.74rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-reset-filters:hover {
  background: #4F46E5;
  border-color: #6366F1;
}

.spotify-link-box {
  margin-top: 0.75rem;
  padding-top: 0.65rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.spotify-link-box h6 {
  font-size: 0.86rem;
  color: #10B981;
  margin-bottom: 0.15rem;
}

.spotify-link-box p {
  font-size: 0.74rem;
  color: #94A3B8;
  margin-bottom: 0.55rem;
}

.btn-spotify-wa {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #10B981;
  color: #FFFFFF;
  padding: 0.48rem 0.95rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-spotify-wa:hover {
  background: #059669;
  transform: translateY(-2px);
}

/* Movie Tab */
.mood-selector-wrap {
  margin-bottom: 2rem;
  text-align: center;
}

.mood-label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #CBD5E1;
  margin-bottom: 0.8rem;
}

.mood-chips {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.mood-chip {
  background: #1E293B;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #CBD5E1;
  padding: 0.6rem 1.2rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.mood-chip:hover {
  background: #334155;
  color: #FFFFFF;
}

.mood-chip.active {
  background: var(--accent-gold-gradient);
  color: #0B0F19;
  font-weight: 700;
  border-color: #F59E0B;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35);
}

.movie-curated-card {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  padding: 2.2rem;
  align-items: center;
}

.movie-mock-frame {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
}

.corner-ribbon {
  position: absolute;
  top: 14px;
  right: -32px;
  background: #F59E0B;
  color: #0B0F19;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.3rem 2.5rem;
  transform: rotate(45deg);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.poster-graphic {
  min-height: 320px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #FFFFFF;
  position: relative;
}

.cinema-icon {
  font-size: 3.5rem;
  margin-bottom: auto;
}

.poster-graphic h5 {
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.poster-year {
  font-size: 0.85rem;
  opacity: 0.85;
}

.movie-top-badges {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.pill-genre, .pill-director, .pill-avail {
  font-size: 0.78rem;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  color: #CBD5E1;
}

.pill-genre {
  background: rgba(79, 70, 229, 0.25);
  color: #A5B4FC;
  font-weight: 600;
}

.movie-info-col h4 {
  font-size: 1.8rem;
  color: #FFFFFF;
  margin-bottom: 0.85rem;
}

.movie-synopsis {
  color: #94A3B8;
  font-size: 0.98rem;
  line-height: 1.6;
  margin-bottom: 1.4rem;
}

.curator-quote {
  display: flex;
  gap: 1rem;
  background: rgba(30, 41, 59, 0.5);
  border-left: 3px solid #F59E0B;
  padding: 1rem 1.2rem;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-bottom: 1.8rem;
}

.quote-avatar img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #F59E0B;
}

.quote-text strong {
  font-size: 0.85rem;
  color: #FBBF24;
}

.quote-text p {
  font-size: 0.92rem;
  color: #E2E8F0;
  font-style: italic;
  margin-top: 0.2rem;
}

.movie-action-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-watchlist {
  background: var(--primary);
  color: #FFFFFF;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.92rem;
  transition: all 0.2s ease;
}

.btn-watchlist:hover {
  background: var(--primary-hover);
}

.btn-discuss {
  background: #25D366;
  color: #FFFFFF;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.92rem;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
}

.btn-discuss:hover {
  background: #1EBE5D;
}

/* Gaming Tab */
.gaming-tool-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 2rem;
}

.benchmark-controls {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.control-group {
  margin-bottom: 1.5rem;
}

.control-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #CBD5E1;
  margin-bottom: 0.6rem;
}

.game-select-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.game-select-header-row label {
  margin-bottom: 0;
}

.game-count-badge {
  font-size: 0.72rem;
  font-weight: 800;
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  padding: 0.15rem 0.6rem;
  border-radius: 9999px;
}

.game-cat-chips-row {
  display: flex;
  overflow-x: auto;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.game-cat-chips-row::-webkit-scrollbar {
  display: none;
}

.game-cat-chip-btn {
  flex-shrink: 0;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.game-cat-chip-btn:hover {
  color: #FFFFFF;
  background: rgba(49, 65, 96, 0.8);
}

.game-cat-chip-btn.active {
  background: #F59E0B;
  color: #0F172A;
  border-color: #F59E0B;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.35);
}

.game-select {
  width: 100%;
  background: #1E293B;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.8rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  outline: none;
}

.res-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.res-btn {
  background: #1E293B;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  padding: 0.6rem 0.4rem;
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.res-btn.active {
  background: #4F46E5;
  color: #FFFFFF;
  border-color: #6366F1;
}

.rig-specs-box {
  background: rgba(30, 41, 59, 0.4);
  padding: 1.2rem;
  border-radius: var(--radius-md);
  border: 1px dashed rgba(255, 255, 255, 0.12);
}

.rig-specs-box h6 {
  font-size: 0.9rem;
  color: #F59E0B;
  margin-bottom: 0.6rem;
}

.rig-specs-box ul {
  list-style: none;
  font-size: 0.82rem;
  color: #CBD5E1;
}

.rig-specs-box li {
  margin-bottom: 0.35rem;
}

.benchmark-result-card {
  background: #141B2D;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.game-tag {
  font-size: 0.8rem;
  color: #60A5FA;
  font-weight: 700;
  text-transform: uppercase;
}

.result-header h4 {
  font-size: 1.5rem;
  color: #FFFFFF;
  margin-top: 0.25rem;
}

.fps-meter {
  text-align: right;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid #10B981;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-md);
}

.fps-number {
  font-size: 2.2rem;
  font-weight: 900;
  color: #10B981;
  display: block;
  line-height: 1;
}

.fps-label {
  font-size: 0.75rem;
  color: #A7F3D0;
  font-weight: 700;
  text-transform: uppercase;
}

.verdict-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.2rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 0.95rem;
}

.verdict-smooth {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.benchmark-breakdown {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(30, 41, 59, 0.4);
  padding: 1rem;
  border-radius: var(--radius-md);
}

.metric-item span {
  display: block;
  font-size: 0.75rem;
  color: #94A3B8;
  margin-bottom: 0.25rem;
}

.metric-item strong {
  font-size: 0.95rem;
  color: #FFFFFF;
}

.gamer-note {
  font-size: 0.9rem;
  color: #CBD5E1;
  font-style: italic;
  margin-bottom: 1.6rem;
  line-height: 1.5;
}

.btn-gamer-squad {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-gold-gradient);
  color: #0B0F19;
  padding: 0.9rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-shadow: 0 8px 20px -4px rgba(245, 158, 11, 0.4);
}

.btn-gamer-squad:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px -4px rgba(245, 158, 11, 0.55);
}

/* --------------------------------------------------------------------------
   INTERACTIVE MEDIA LOUNGE RESPONSIVE DESIGN (ALL DEVICES)
   -------------------------------------------------------------------------- */
@media (max-width: 980px) {
  .music-card-grid, .movie-curated-card, .gaming-tool-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .vue-media-lounge {
    padding: 1.5rem 1.2rem;
  }
}

@media (max-width: 768px) {
  .vue-media-lounge {
    padding: 1.15rem 0.85rem 1.5rem 0.85rem;
    border-radius: var(--radius-lg);
  }

  /* Hide duplicate inner header on mobile to avoid overlap */
  .lounge-header {
    display: none;
  }

  /* 3-Column Segmented Tab Bar in Single Row */
  .tab-label-full {
    display: none !important;
  }

  .tab-label-short {
    display: inline !important;
  }

  .lounge-tabs {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 0.45rem !important;
    width: 100% !important;
    margin-bottom: 1.1rem !important;
  }

  .lounge-tab-btn {
    width: 100% !important;
    padding: 0.55rem 0.25rem !important;
    font-size: 0.8rem !important;
    font-weight: 700 !important;
    text-align: center !important;
    justify-content: center !important;
    gap: 0.35rem !important;
    border-radius: 9999px !important;
    white-space: nowrap !important;
  }

  /* Artist Filter Horizontal Scroller */
  .artist-filters-row {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.4rem !important;
    margin-bottom: 0.95rem !important;
    width: 100% !important;
  }

  .filter-lead-label {
    font-size: 0.78rem !important;
    font-weight: 700 !important;
    color: #F59E0B !important;
  }

  .artist-chips-wrap {
    display: flex !important;
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    padding-bottom: 0.35rem !important;
    width: 100% !important;
    gap: 0.45rem !important;
  }

  .artist-chips-wrap::-webkit-scrollbar {
    display: none !important;
  }

  .artist-chip {
    flex-shrink: 0 !important;
    white-space: nowrap !important;
    font-size: 0.76rem !important;
    padding: 0.35rem 0.75rem !important;
  }

  /* Player Deck */
  .player-deck {
    padding: 1rem 0.85rem !important;
  }

  .deck-top {
    display: flex !important;
    gap: 0.75rem !important;
    align-items: center !important;
    margin-bottom: 0.75rem !important;
  }

  .vinyl-display {
    width: 52px !important;
    height: 52px !important;
    flex-shrink: 0 !important;
  }

  .vinyl-inner {
    width: 20px !important;
    height: 20px !important;
  }

  .deck-meta {
    flex-grow: 1 !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  .deck-meta h4 {
    font-size: 1.15rem !important;
    font-weight: 800 !important;
    line-height: 1.25 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin: 0.15rem 0 !important;
  }

  .track-desc {
    font-size: 0.76rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin-bottom: 0.35rem !important;
  }

  .track-tags {
    display: flex !important;
    gap: 0.35rem !important;
    flex-wrap: wrap !important;
  }

  .track-tag {
    font-size: 0.68rem !important;
    padding: 0.15rem 0.45rem !important;
    border-radius: 6px !important;
    white-space: nowrap !important;
  }

  .deck-page-link-wrap {
    margin-top: 0.65rem !important;
  }

  .deck-direct-page-btn {
    font-size: 0.76rem !important;
    padding: 0.4rem 0.85rem !important;
  }

  /* Embedded Player Box */
  .full-song-iframe {
    width: 100% !important;
    aspect-ratio: 16 / 9 !important;
    height: auto !important;
    max-height: 210px !important;
  }

  .spotify-song-iframe {
    height: 152px !important;
  }

  .video-player-topbar {
    padding: 0.4rem 0.65rem !important;
  }

  .engine-tab-btn {
    font-size: 0.7rem !important;
    padding: 0.25rem 0.55rem !important;
  }

  .video-duration-pill {
    font-size: 0.68rem !important;
    padding: 0.15rem 0.45rem !important;
  }

  .full-song-footer-tag {
    padding: 0.4rem 0.65rem !important;
    font-size: 0.7rem !important;
  }

  .video-meta-txt {
    font-size: 0.7rem !important;
  }

  .tag-direct-yt, .tag-direct-spotify {
    font-size: 0.66rem !important;
    padding: 0.15rem 0.45rem !important;
  }

  .curator-music-note {
    padding: 0.55rem 0.75rem !important;
    margin-bottom: 0.75rem !important;
    gap: 0.65rem !important;
  }

  .curator-mini-avatar img {
    width: 32px !important;
    height: 32px !important;
  }

  .curator-mini-text strong {
    font-size: 0.74rem !important;
  }

  .curator-mini-text p {
    font-size: 0.76rem !important;
    line-height: 1.35 !important;
  }

  /* 2x2 Symmetrical Grid Controls on Mobile & Tablet */
  .deck-controls-hindi {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 0.55rem !important;
    width: 100% !important;
    margin-top: 0.75rem !important;
  }

  .deck-controls-hindi .ctrl-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    padding: 0.65rem 0.4rem !important;
    font-size: 0.78rem !important;
    font-weight: 700 !important;
    white-space: nowrap !important;
    border-radius: 9px !important;
    text-align: center !important;
    box-sizing: border-box !important;
  }

  /* Track list panel */
  .tracks-list-panel {
    padding: 1rem 0.85rem !important;
  }

  .vault-search-box {
    margin-bottom: 0.65rem !important;
  }

  .vault-search-input {
    font-size: 0.8rem !important;
    padding: 0.5rem 0.75rem 0.5rem 2rem !important;
  }

  .category-pills-row {
    display: flex !important;
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    gap: 0.35rem !important;
    margin-bottom: 0.75rem !important;
    padding-bottom: 0.25rem !important;
    width: 100% !important;
  }

  .category-pills-row::-webkit-scrollbar {
    display: none !important;
  }

  .category-pill-btn {
    flex-shrink: 0 !important;
    white-space: nowrap !important;
    font-size: 0.72rem !important;
    padding: 0.25rem 0.65rem !important;
  }

  .track-select-card {
    padding: 0.6rem 0.65rem !important;
    gap: 0.6rem !important;
  }

  .track-info h6 {
    font-size: 0.86rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .track-info span {
    font-size: 0.72rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .track-card-right {
    display: flex !important;
    align-items: center !important;
    gap: 0.35rem !important;
    flex-shrink: 0 !important;
  }

  .track-card-lyrics-link {
    font-size: 0.68rem !important;
    padding: 0.18rem 0.45rem !important;
  }

  .track-time {
    font-size: 0.7rem !important;
  }

  /* Movie Matcher & Gaming Benchmarks Responsive */
  .movie-mock-frame {
    max-width: 320px !important;
    margin: 0 auto !important;
    width: 100% !important;
  }

  .poster-graphic {
    min-height: 220px !important;
    padding: 1.2rem !important;
  }

  .poster-graphic h5 {
    font-size: 1.2rem !important;
  }

  .cinema-icon {
    font-size: 2.8rem !important;
  }

  .movie-action-row {
    flex-direction: column !important;
    width: 100% !important;
    gap: 0.65rem !important;
  }

  .btn-watchlist, .btn-discuss {
    width: 100% !important;
    justify-content: center !important;
    text-align: center !important;
  }

  .benchmark-breakdown {
    grid-template-columns: 1fr !important;
    gap: 0.65rem !important;
  }

  .resolution-selector {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 0.35rem !important;
  }

  .res-btn {
    font-size: 0.72rem !important;
    padding: 0.45rem 0.2rem !important;
    text-align: center !important;
    justify-content: center !important;
  }

  .fps-meter {
    padding: 0.4rem 0.8rem !important;
  }

  .fps-number {
    font-size: 1.8rem !important;
  }

  .benchmark-controls, .benchmark-result-card {
    padding: 1.1rem 0.85rem !important;
  }

  .btn-gamer-squad {
    font-size: 0.85rem !important;
    padding: 0.8rem 1rem !important;
    text-align: center !important;
  }
}

@media (max-width: 360px) {
  .vue-media-lounge {
    padding: 0.85rem 0.55rem 1.2rem 0.55rem;
  }

  .lounge-tab-btn {
    font-size: 0.72rem !important;
    padding: 0.45rem 0.1rem !important;
  }

  .deck-controls-hindi .ctrl-btn {
    font-size: 0.72rem !important;
    padding: 0.55rem 0.2rem !important;
  }

  .vinyl-display {
    width: 44px !important;
    height: 44px !important;
  }
}
</style>

