import React, { useEffect, useRef, useState } from 'react';

export default function VueMediaLoungeMount() {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let app = null;
    let isCancelled = false;

    const loadAndMountVue = async () => {
      if (app || isMounted) return;
      try {
        const [{ createApp }, { default: InteractiveMediaLounge }] = await Promise.all([
          import('vue'),
          import('./InteractiveMediaLounge.vue')
        ]);

        if (!isCancelled && containerRef.current && !app) {
          app = createApp(InteractiveMediaLounge);
          app.mount(containerRef.current);
          setIsMounted(true);
        }
      } catch (err) {
        console.error('Error mounting Vue lounge:', err);
      }
    };

    // If URL already has hash targeting lounge or music track, mount immediately
    const hash = window.location.hash || '';
    if (hash.includes('media-lounge') || hash.includes('services') || hash.includes('reviews')) {
      loadAndMountVue();
      return () => {
        isCancelled = true;
        if (app) app.unmount();
      };
    }

    // Preload when user is within 400px of scrolling to this section
    let observer = null;
    if ('IntersectionObserver' in window && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadAndMountVue();
            observer.disconnect();
          }
        },
        { rootMargin: '400px 0px' }
      );
      observer.observe(containerRef.current);
    } else {
      loadAndMountVue();
    }

    // Preload when idle (2.5s) if user hasn't scrolled yet
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(() => loadAndMountVue(), { timeout: 2500 })
      : setTimeout(() => loadAndMountVue(), 2500);

    return () => {
      isCancelled = true;
      if (observer) observer.disconnect();
      if (window.cancelIdleCallback && typeof idleId === 'number') {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
      if (app) {
        try {
          app.unmount();
        } catch (err) {
          console.warn('Error unmounting Vue lounge:', err);
        }
      }
    };
  }, []);


  return (
    <section id="media-lounge" className="section section-lounge">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag tag-amber">⚡ ENTERTAINMENT VAULT</span>
          <h2 className="section-heading">My Entertainment Corner</h2>
          <p className="section-subtext">
            Immerse yourself in Ayush's real-time entertainment dashboard. Listen to favorite music, explore verified cinema, and check gaming benchmark estimates.
          </p>
        </div>

        {/* Vue 3 Component Mount Container */}
        <div ref={containerRef} className="vue-lounge-container" />
      </div>
    </section>
  );
}
