import React from 'react';
import { Phone, Mail, MessageSquare, MapPin, Heart, Sparkles, Music, Film, Gamepad2 } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container footer-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img src={getAssetUrl('images/logo.jpg')} alt="Ayush Hub Logo" className="footer-logo-img" />
              <div className="footer-brand-text">
                <span className="footer-brand-name">Ayush Hub</span>
                <span className="footer-brand-sub">Music • Movies • Gaming</span>
              </div>
            </div>

            <p className="footer-bio">
              A personal entertainment sanctuary crafted by <strong>Ayush Shrivastava</strong>. 
              Sharing handpicked beats, unforgettable cinematic journeys, and top-tier gaming content 
              from Purnia, Bihar, India.
            </p>

            <div className="footer-social-chips">
              <a href="https://wa.me/919508678989" target="_blank" rel="noopener noreferrer" className="social-chip" title="WhatsApp">
                <span>WhatsApp</span>
              </a>
              <a href="mailto:ayushshrivastava2108@gmail.com" className="social-chip" title="Email">
                <span>Email</span>
              </a>
              <a href="#media-lounge" className="social-chip chip-highlight" title="Vue Media Lounge">
                <span>🎧 Live Lounge</span>
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Curated Services</a></li>
              <li><a href="#about">About Ayush</a></li>
              <li><a href="#media-lounge">Interactive Media Lounge (Vue 3)</a></li>
              <li><a href="#process">My Curation Process</a></li>
              <li><a href="#showcase">Digital Showcases</a></li>
              <li><a href="#reviews">Community Reviews</a></li>
              <li><a href="#contact">Contact & Connect</a></li>
            </ul>
          </div>

          {/* Curations */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Entertainment Vaults</h4>
            <ul className="footer-links-list">
              <li><a href="#showcase">Lo-Fi Beats & Twilight Chill</a></li>
              <li><a href="#showcase">Synthwave & Night Drives</a></li>
              <li><a href="#showcase">Mind-Bending Sci-Fi Cinema</a></li>
              <li><a href="#showcase">Neo-Noir & Crime Thrillers</a></li>
              <li><a href="#showcase">PC Battlestation Benchmarks</a></li>
              <li><a href="#showcase">Esports & Competitive Lobbies</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Business Information</h4>
            <ul className="footer-contact-details">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Purnia, Bihar, India (854301)</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <a href="tel:9508678989">+91 9508678989</a>
              </li>
              <li>
                <MessageSquare size={16} className="contact-icon" />
                <a href="https://wa.me/919508678989" target="_blank" rel="noopener noreferrer">
                  +91 9508678989 (WhatsApp)
                </a>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <a href="mailto:ayushshrivastava2108@gmail.com">ayushshrivastava2108@gmail.com</a>
              </li>
            </ul>

            <div className="footer-location-badge">
              <span className="dot-pulse-green"></span>
              <span>Hub Status: Online & Welcoming Collaborations</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} <strong>Ayush Hub</strong>. All rights reserved. 
            Designed & Curated with pride by Ayush Shrivastava in Purnia, Bihar, India.
          </p>
          <div className="footer-bottom-tech">
            <span>Powered by React 18 + Vue 3 Hybrid Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
