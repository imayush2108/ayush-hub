import React, { useState } from 'react';
import { ExternalLink, Star, Play, Sparkles, X, Heart, Eye } from 'lucide-react';
import { DoodleSquiggle, DoodleSparkle } from './Doodles';

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const tabs = ['All', 'Music Vault', 'Cinema Watchlist', 'Gaming Arena'];

  const showcaseItems = [
    {
      id: 1,
      title: 'Neon Rhythms: Lo-Fi Chill & Synthwave Vault',
      category: 'Music Vault',
      image: '/images/showcase-music.jpg',
      badge: "Ayush's Choice • 500+ Tracks",
      score: '9.9/10',
      tagline: 'Analog tape warmth, soothing lo-fi beats, and nostalgic synth chords for deep focus.',
      highlights: [
        'Curated Spotify playlist with over 24 hours of non-stop flow',
        'Includes exclusive lo-fi indie tracks from Indian independent beatmakers',
        'Mastered for high-fidelity headphone listening and late-night study'
      ],
      ctaText: 'Stream on Spotify / WhatsApp',
      ctaUrl: 'https://wa.me/919508678989?text=Hi%20Ayush,%20please%20send%20the%20Neon%20Rhythms%20playlist%20link!'
    },
    {
      id: 2,
      title: 'Neo-Tokyo 2049 & Cinema Masterpieces',
      category: 'Cinema Watchlist',
      image: '/images/showcase-movies.jpg',
      badge: 'Cinephile Essential • 4K HDR',
      score: '9.8/10',
      tagline: 'Atmospheric sci-fi, deep psychological thrillers, and award-winning cinematography breakdowns.',
      highlights: [
        'Spoiler-free cinematic breakdown with scene-by-scene audio-visual analysis',
        'Curated list of 15 mind-bending cinema experiences streaming on major OTTs',
        'Direct director insights and cinematography notes from Roger Deakins to Denis Villeneuve'
      ],
      ctaText: 'Get Full Movie Watchlist',
      ctaUrl: 'https://wa.me/919508678989?text=Hi%20Ayush,%20please%20send%20the%20Neo-Tokyo%20Cinema%20Watchlist!'
    },
    {
      id: 3,
      title: 'Cyberpunk Triple-Monitor Battlestation & Benchmarks',
      category: 'Gaming Arena',
      image: '/images/showcase-gaming.jpg',
      badge: 'RTX 4080 Super • 165Hz Ultra',
      score: '9.7/10',
      tagline: 'In-depth benchmark testing, path-traced ray tracing comparisons, and competitive esports configs.',
      highlights: [
        'Tested across 40+ AAA and esports titles for 1% low frame time stability',
        'Optimal DLSS 3.5 & Frame Generation presets for competitive shooters',
        'Complete hardware breakdown & peripheral guide for aspiring creators'
      ],
      ctaText: 'View Rig Benchmarks & Join Lobby',
      ctaUrl: 'https://wa.me/919508678989?text=Hi%20Ayush,%20I%20want%20to%20know%20more%20about%20your%20Gaming%20Rig!'
    }
  ];

  const filteredItems = activeTab === 'All' 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === activeTab);

  return (
    <section id="showcase" className="section showcase-section">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">PORTFOLIO & CURATIONS</span>
          <h2 className="section-heading">Digital Content Showcases</h2>
          <p className="section-subtext">
            Browse through my latest flagship curations and multimedia experiences. Click any card to view full details.
          </p>
        </div>

        {/* Tab Filters matching reference image */}
        <div className="showcase-tabs-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`showcase-tab-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="showcase-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="showcase-card"
              onClick={() => setSelectedItem(item)}
            >
              <div className="showcase-img-wrap">
                <img src={item.image} alt={item.title} className="showcase-img" />
                <div className="showcase-img-overlay">
                  <span className="overlay-inspect-btn">
                    <Eye size={18} />
                    <span>Inspect Details</span>
                  </span>
                </div>
                <span className="showcase-score-badge">
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <span>{item.score}</span>
                </span>
                <span className="showcase-category-pill">{item.category}</span>
              </div>

              <div className="showcase-content">
                <span className="showcase-subbadge">{item.badge}</span>
                <h3 className="showcase-title">{item.title}</h3>
                <p className="showcase-tagline">{item.tagline}</p>

                <div className="showcase-card-footer">
                  <span className="read-more-link">
                    <span>View Full Curation</span>
                    <ExternalLink size={15} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="modal-window modal-showcase-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-showcase-header">
              <img src={selectedItem.image} alt={selectedItem.title} className="modal-banner-img" />
              <button 
                className="modal-close-btn modal-close-overlay" 
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-badge-group">
                <span className="section-tag">{selectedItem.category}</span>
                <span className="modal-badge-score">Rating: {selectedItem.score}</span>
              </div>

              <h3 className="modal-item-title">{selectedItem.title}</h3>
              <p className="modal-item-tagline">{selectedItem.tagline}</p>

              <div className="modal-highlights-card">
                <h4>Key Highlights & Curator Notes:</h4>
                <ul>
                  {selectedItem.highlights.map((point, idx) => (
                    <li key={idx}>
                      <span className="check-bullet">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-action-bar">
                <a 
                  href={selectedItem.ctaUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  <span>{selectedItem.ctaText}</span>
                  <ExternalLink size={16} />
                </a>
                <button className="btn btn-outline-primary" onClick={() => setSelectedItem(null)}>
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
