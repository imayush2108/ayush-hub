import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ProcessSection from './components/ProcessSection';
import VueMediaLoungeMount from './components/VueMediaLoungeMount';
import ErrorBoundary from './components/ErrorBoundary';
import ShowcaseSection from './components/ShowcaseSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import TrackDetailPage from './components/TrackDetailPage';
import Footer from './components/Footer';
import { ArrowUp, MessageSquare } from 'lucide-react';
import useSmoothScroll from './hooks/useSmoothScroll';
import './App.css';

const getTrackIdFromHash = () => {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash || '';
  const match = hash.match(/^#\/track\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTrackId, setCurrentTrackId] = useState(getTrackIdFromHash);

  // Activate premium Lenis smooth inertia scrolling
  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const trackId = getTrackIdFromHash();
      setCurrentTrackId(trackId);
      if (!trackId && window.location.hash === '#media-lounge') {
        setTimeout(() => {
          const el = document.getElementById('media-lounge');
          if (el) {
            if (window.__lenis) {
              window.__lenis.scrollTo(el, { offset: -76, duration: 1.2 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 80);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth scroll back to top when track detail page opens
  useEffect(() => {
    if (currentTrackId) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [currentTrackId]);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, {
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToLounge = () => {
    window.location.hash = '#media-lounge';
    setCurrentTrackId(null);
    setTimeout(() => {
      const el = document.getElementById('media-lounge');
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -76, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  };

  return (
    <div className="app-root">
      {/* Top Scroll Reading Progress Indicator */}
      <div 
        className="top-scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Page scroll progress"
      />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      {currentTrackId ? (
        <main>
          <TrackDetailPage trackId={currentTrackId} onBack={handleBackToLounge} />
        </main>
      ) : (
        <main>
          {/* Hero Section matching reference style */}
          <HeroSection />

          {/* Services Section with 3 cards including highlighted royal card */}
          <ServicesSection />

          {/* About Section matching reference circular cutout */}
          <AboutSection />

          {/* Interactive Dual-Engine Vue 3 Media Lounge */}
          <ErrorBoundary>
            <VueMediaLoungeMount />
          </ErrorBoundary>

          {/* Process Section with 4-step curation roadmap */}
          <ProcessSection />

          {/* Showcase Portfolio Section with category tabs */}
          <ShowcaseSection />

          {/* Community Testimonials with 5-star ratings */}
          <TestimonialsSection />

          {/* Contact Section with full business details & WhatsApp form */}
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <div className="floating-actions" role="region" aria-label="Social connections and quick actions">
        {/* Instagram Floating Action */}
        <a 
          href="https://www.instagram.com/imayush2108"
          target="_blank" 
          rel="noopener noreferrer"
          className="floating-action-btn floating-ig-btn"
          aria-label="Follow Ayush on Instagram"
          title="Instagram (@imayush2108)"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          <span className="floating-tooltip">Follow on Instagram</span>
        </a>

        {/* Facebook Floating Action */}
        <a 
          href="https://www.facebook.com/imayush2108"
          target="_blank" 
          rel="noopener noreferrer"
          className="floating-action-btn floating-fb-btn"
          aria-label="Connect with Ayush on Facebook"
          title="Facebook (@imayush2108)"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="floating-tooltip">Connect on Facebook</span>
        </a>

        {/* Floating WhatsApp Quick Action */}
        <a 
          href="https://wa.me/919508678989?text=Hi%20Ayush,%20reaching%20out%20from%20Ayush%20Hub!"
          target="_blank" 
          rel="noopener noreferrer"
          className="floating-action-btn floating-wa-btn"
          aria-label="Direct WhatsApp Chat with Ayush"
          title="Direct WhatsApp (+91 9508678989)"
        >
          <MessageSquare size={22} />
          <span className="floating-tooltip">Chat with Ayush</span>
        </a>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button 
            onClick={scrollToTop} 
            className="floating-scroll-top-btn"
            aria-label="Scroll back to top"
            title="Scroll to top"
          >
            <ArrowUp size={20} />
            <span className="floating-tooltip">Back to top</span>
          </button>
        )}
      </div>
    </div>
  );
}
