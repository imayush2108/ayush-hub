import React, { useState } from 'react';
import { Music, Film, Gamepad2, ArrowRight, X, ExternalLink, Check, Sparkles } from 'lucide-react';
import { DoodleeSpiral, DoodleDots, DoodleStar } from './Doodles';

export default function ServicesSection() {
  const [activeModal, setActiveModal] = useState(null);

  const services = [
    {
      id: 'music',
      title: 'Music Vault & Playlists',
      subtitle: 'Sonic Atmosphere & Beats',
      icon: <Music size={32} className="service-icon-svg" />,
      highlight: false,
      desc: 'Handcrafted Spotify & Lo-Fi playlists, indie singer-songwriter spotlight, retro synthwave, and evergreen Bollywood classics engineered for focus, travel, and unwinding.',
      stats: '15+ Curated Playlists • 500+ Handpicked Tracks',
      colorClass: 'service-card-music',
      picks: [
        { name: 'Purnia Twilight Chill (Lo-Fi)', genre: 'Lo-Fi Chillhop', mood: 'Focus & Study', duration: '3 hr 45 min' },
        { name: 'Neon City Midnight Drive', genre: 'Synthwave / Retro Electro', mood: 'Late Night Driving', duration: '2 hr 30 min' },
        { name: 'Indie Hindi Acoustic Soul', genre: 'Acoustic Indie Pop', mood: 'Heartfelt & Melodic', duration: '4 hr 10 min' },
        { name: 'Pure Gaming Flow State', genre: 'Cyber Ambient / Glitch', mood: 'Competitive Focus', duration: '2 hr 15 min' },
      ],
      whatsappMsg: 'Hi Ayush, I would love to check out your curated Music Playlists!'
    },
    {
      id: 'movies',
      title: 'Cinema & Series Watchlists',
      subtitle: 'Uncompromising Storytelling',
      icon: <Film size={32} className="service-icon-svg" />,
      highlight: true, // Featured card with Royal Indigo background matching reference!
      desc: 'Spoiler-free critical deep-dives, hidden gem recommendations, mind-bending sci-fi epics, and regional cinematic masterpieces reviewed with passionate nuance.',
      stats: '120+ Movies Reviewed • 9.0+ Curated Scores',
      colorClass: 'service-card-movies-featured',
      picks: [
        { name: 'Interstellar (2014)', genre: 'Sci-Fi Odyssey', mood: 'Existential Awe', duration: 'Ayush Score: 9.8/10' },
        { name: 'Blade Runner 2049', genre: 'Neo-Noir Cyberpunk', mood: 'Atmospheric Poetry', duration: 'Ayush Score: 9.6/10' },
        { name: 'Past Lives (2023)', genre: 'Indie Drama', mood: 'Bittersweet & Real', duration: 'Ayush Score: 9.5/10' },
        { name: 'Tumbbad (2018)', genre: 'Indian Mythological Horror', mood: 'Visual Masterpiece', duration: 'Ayush Score: 9.7/10' },
      ],
      whatsappMsg: 'Hi Ayush, I need a great movie recommendation for tonight!'
    },
    {
      id: 'gaming',
      title: 'Gaming Arena & Reviews',
      subtitle: 'Next-Gen Performance & Guides',
      icon: <Gamepad2 size={32} className="service-icon-svg" />,
      highlight: false,
      desc: 'Thorough PC benchmark analysis, AAA walkthroughs, souls-like game critiques, esports squad tips, and hardware optimization guides tested in-house on high-end rigs.',
      stats: '40+ Games Benchmarked • Active Discord Squad',
      colorClass: 'service-card-gaming',
      picks: [
        { name: 'Elden Ring: Shadow of the Erdtree', genre: 'Action RPG', mood: 'Combat & Wonder', duration: '120+ FPS Optimized' },
        { name: 'Cyberpunk 2077 (Path Tracing)', genre: 'Open-World Sci-Fi', mood: 'Ultimate Visuals', duration: '92 FPS @ 1440p' },
        { name: 'Red Dead Redemption 2', genre: 'Cinematic Western', mood: 'Living Breathing World', duration: 'Ayush Score: 9.8/10' },
        { name: 'Valorant Ranked Guides', genre: 'Tactical Shooter', mood: 'Clutch Playbook', duration: '360Hz Ready' },
      ],
      whatsappMsg: 'Hi Ayush, let us squad up or discuss gaming benchmarks!'
    }
  ];

  return (
    <section id="services" className="section services-section">
      {/* Decorative Doodles */}
      <div className="section-doodle doodle-service-left">
        <DoodleeSpiral color="#F59E0B" size={42} className="doodle-float" />
      </div>
      <div className="section-doodle doodle-service-right">
        <DoodleDots color="#CBD5E1" count={12} />
      </div>

      <div className="container">
        {/* Section Heading matching reference */}
        <div className="section-title-wrap">
          <span className="section-tag">SERVICES</span>
          <h2 className="section-heading">Signature Curations — Explore What I Offer</h2>
          <p className="section-subtext">
            Every piece of entertainment on Ayush Hub is personally tested, watched, and listened to. 
            No filler, no clickbait — only top-tier entertainment tailored for genuine enthusiasts.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="services-grid">
          {services.map((srv) => (
            <div 
              key={srv.id} 
              className={`service-card ${srv.highlight ? 'service-card-featured' : ''}`}
            >
              <div className="service-icon-wrap">
                {srv.icon}
              </div>

              <span className="service-subtitle-badge">{srv.subtitle}</span>
              <h3 className="service-card-title">{srv.title}</h3>
              <p className="service-card-desc">{srv.desc}</p>
              
              <div className="service-meta-stats">
                <Sparkles size={14} className="sparkle-gold" />
                <span>{srv.stats}</span>
              </div>

              <button 
                onClick={() => setActiveModal(srv)}
                className={`service-action-btn ${srv.highlight ? 'btn-featured-action' : ''}`}
                aria-label={`View details about ${srv.title}`}
              >
                <span>Explore Curations</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Details Modal */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <span className="modal-tag">{activeModal.subtitle}</span>
                <h3>{activeModal.title}</h3>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => setActiveModal(null)}
                aria-label="Close details"
              >
                <X size={22} />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-desc">{activeModal.desc}</p>

              <h4 className="picks-heading">Ayush's Featured Picks in this Category:</h4>
              <div className="picks-list">
                {activeModal.picks.map((pick, i) => (
                  <div key={i} className="pick-item-card">
                    <div className="pick-number">0{i + 1}</div>
                    <div className="pick-info">
                      <h5>{pick.name}</h5>
                      <span>{pick.genre} • {pick.mood}</span>
                    </div>
                    <span className="pick-badge">{pick.duration}</span>
                  </div>
                ))}
              </div>

              <div className="modal-footer-cta">
                <p>Looking for direct recommendation links or want to request a custom playlist or review?</p>
                <a 
                  href={`https://wa.me/919508678989?text=${encodeURIComponent(activeModal.whatsappMsg)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <span>Request on WhatsApp (+91 9508678989)</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
