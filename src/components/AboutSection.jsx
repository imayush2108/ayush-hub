import React from 'react';
import { Award, Heart, Compass, CheckCircle2, Phone, MessageSquare, MapPin } from 'lucide-react';
import { DoodleArrow, DoodleSparkle, DoodleDots } from './Doodles';
import { getAssetUrl } from '../utils/assets';

export default function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-container">
        {/* Left Column: Creator Circular Cutout matching reference image */}
        <div className="about-visual-col">
          <div className="about-circle-stage">
            {/* Playful background halo and ring */}
            <div className="about-yellow-ring"></div>
            <div className="about-halo-glow"></div>

            {/* Ayush's Portrait */}
            <div className="about-image-frame">
              <img 
                src={getAssetUrl('images/about-ayush.jpg')} 
                alt="Ayush Shrivastava - Founder & Curator of Ayush Hub" 
                className="about-portrait-img"
              />
            </div>

            {/* Pointing Doodle Arrow */}
            <div className="about-doodle-arrow">
              <DoodleArrow color="#F59E0B" width={56} height={36} />
            </div>

            {/* Geometric accents matching reference */}
            <div className="about-doodle-triangles">
              <span className="accent-shape shape-tri-1">▲</span>
              <span className="accent-shape shape-circle-1">●</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Experience details */}
        <div className="about-content-col">
          <span className="section-tag">ABOUT AYUSH SHRIVASTAVA</span>
          
          <h2 className="section-heading about-heading">
            Curating Pure Vibes, <br />
            Not Just Everyday Media
          </h2>

          <p className="about-lead">
            Welcome! I’m Ayush Shrivastava, an avid cinephile, music curator, and hardcore gamer 
            based in <strong>Purnia, Bihar, India</strong>. 
          </p>

          <p className="about-text">
            In an era where streaming algorithms flood us with generic content, <strong>Ayush Hub</strong> is 
            built to be your trusted personal compass. Whether it’s discovering that one melancholic indie track 
            that hits straight to the core, an underrated cinema masterpiece that stays with you for days, 
            or honest gaming reviews that respect your hardware and time — everything here comes from real 
            passion and hundreds of hours of hands-on immersion.
          </p>

          {/* Metric Highlight Cards matching reference */}
          <div className="about-metrics-list">
            <div className="metric-box">
              <div className="metric-icon-box">
                <Award size={20} className="icon-metric" />
              </div>
              <div className="metric-details">
                <h4>500+ Complete Curations</h4>
                <p>Playlists, film critiques, and gaming walkthroughs verified and enjoyed by the community.</p>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon-box">
                <Compass size={20} className="icon-metric" />
              </div>
              <div className="metric-details">
                <h4>5+ Years of Dedicated Experience</h4>
                <p>Continuously tracking indie music scenes, global film festivals, and competitive esports.</p>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon-box">
                <MapPin size={20} className="icon-metric" />
              </div>
              <div className="metric-details">
                <h4>Rooted in Purnia, Bihar</h4>
                <p>Proudly creating from Purnia with a digital footprint reaching cinephiles and gamers everywhere.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="about-actions-row">
            <a 
              href="https://wa.me/919508678989?text=Hi%20Ayush,%20I%20read%20your%20story%20on%20Ayush%20Hub!"
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>Say Hello on WhatsApp</span>
              <MessageSquare size={17} />
            </a>

            <a href="tel:9508678989" className="btn btn-outline-primary">
              <Phone size={17} />
              <span>Call: +91 9508678989</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
