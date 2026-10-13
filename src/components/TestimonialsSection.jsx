import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { DoodleDots, DoodleSparkle } from './Doodles';
import { getAssetUrl } from '../utils/assets';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "Ayush's lo-fi playlist 'Purnia Twilight Chill' has literally been the soundtrack of my entire engineering semester. The curation is so immaculate, there is zero skip rate. Best taste in indie music ever!",
      name: "Pooja Verma",
      role: "Creative Director & Podcaster",
      location: "Patna, Bihar",
      avatar: getAssetUrl('images/avatar-1.jpg'),
      rating: 5,
      favorite: "Music Vault"
    },
    {
      id: 2,
      quote: "Whenever my weekend movie night feels aimless, I check Ayush Hub. His reviews of 'Past Lives' and 'Tumbbad' were spot on. He doesn't follow mainstream hype; he finds actual cinematic masterpieces.",
      name: "Rohan Mehta",
      role: "Film Critic & Cinephile",
      location: "Kolkata, WB",
      avatar: getAssetUrl('images/avatar-2.jpg'),
      rating: 5,
      favorite: "Cinema Watchlists"
    },
    {
      id: 3,
      quote: "His hardware testing on Elden Ring and Cyberpunk helped me tune my RTX 3070 rig with perfect frame times. Plus, playing ranked with Ayush on Discord is always high energy and zero toxicity!",
      name: "Vikram Sengupta",
      role: "Competitive FPS Gamer",
      location: "Bengaluru, Karnataka",
      avatar: getAssetUrl('images/vikram-sengupta.jpg'),
      rating: 5,
      favorite: "Gaming Arena"
    }
  ];

  return (
    <section id="reviews" className="section testimonials-section">
      <div className="section-doodle doodle-testi-dots">
        <DoodleDots color="#CBD5E1" count={12} />
      </div>

      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">TESTIMONIALS</span>
          <h2 className="section-heading">What People Say About Us</h2>
          <p className="section-subtext">
            Authentic words from fellow cinephiles, gamers, and audiophiles who trust Ayush Hub.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testi-stars-row">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <p className="testi-quote-text">"{t.quote}"</p>

              <div className="testi-author-row">
                <div className="testi-avatar-frame">
                  <img src={t.avatar} alt={t.name} className="testi-avatar-img" />
                </div>
                <div className="testi-author-info">
                  <h4 className="testi-author-name">{t.name}</h4>
                  <span className="testi-author-role">{t.role} • {t.location}</span>
                </div>
              </div>

              <div className="testi-favorite-pill">
                <span>Favorite Hub: {t.favorite}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
