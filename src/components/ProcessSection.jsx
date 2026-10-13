import React from 'react';
import { Search, Headphones, Sparkles, Share2, ArrowRight } from 'lucide-react';
import { DoodleSparkle } from './Doodles';

export default function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Deep Discovery',
      icon: <Search size={24} />,
      desc: 'Scouring underground indie labels, international film festivals, and hidden gaming gems to find truly captivating creations.',
      badge: 'Step 1'
    },
    {
      num: '02',
      title: 'Passionate Immersion',
      icon: <Headphones size={24} />,
      desc: 'Listening on repeat, watching without spoilers, and logging deep playthrough hours on PC rigs to evaluate genuine quality.',
      badge: 'Step 2'
    },
    {
      num: '03',
      title: 'Precision Rating & Notes',
      icon: <Sparkles size={24} />,
      desc: 'Filtering out noise and distilling honest scores, emotional impact ratings, and mood-based tags for the community.',
      badge: 'Step 3'
    },
    {
      num: '04',
      title: 'Community Sharing',
      icon: <Share2 size={24} />,
      desc: 'Publishing weekly drops across Ayush Hub, Spotify, WhatsApp, and Discord with direct community conversations.',
      badge: 'Step 4'
    }
  ];

  return (
    <section id="process" className="section process-section">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">PROCESS</span>
          <h2 className="section-heading">My Curation Process</h2>
          <p className="section-subtext">
            How content gets filtered from millions of releases into the Ayush Hub curated collection.
          </p>
        </div>

        <div className="process-flow-grid">
          {steps.map((step, idx) => (
            <div key={step.num} className="process-step-card">
              <div className="step-top-row">
                <div className="step-icon-circle">
                  {step.icon}
                </div>
                <span className="step-num-watermark">{step.num}</span>
              </div>

              <span className="step-badge">{step.badge}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>

              {idx < steps.length - 1 && (
                <div className="step-connector-arrow">
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
