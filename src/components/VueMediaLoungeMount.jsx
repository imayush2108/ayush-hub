import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import InteractiveMediaLounge from './InteractiveMediaLounge.vue';

export default function VueMediaLoungeMount() {
  const containerRef = useRef(null);

  useEffect(() => {
    let app = null;
    try {
      if (containerRef.current) {
        // Mount the reactive Vue 3 application into the React DOM container
        app = createApp(InteractiveMediaLounge);
        app.mount(containerRef.current);
      }
    } catch (err) {
      console.error('Error mounting Vue lounge:', err);
    }

    return () => {
      try {
        if (app) {
          app.unmount();
        }
      } catch (err) {
        console.warn('Error unmounting Vue lounge:', err);
      }
    };
  }, []);


  return (
    <section id="media-lounge" className="section section-lounge">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag tag-amber">⚡ DUAL ENGINE: VUE 3 + REACT 18</span>
          <h2 className="section-heading">Interactive Media Lounge & Battlestation</h2>
          <p className="section-subtext">
            Immerse yourself in Ayush's real-time reactive entertainment dashboard. Listen to synthesized lo-fi chords, match cinema moods, and check benchmark FPS.
          </p>
        </div>

        {/* Vue 3 Component Mount Container */}
        <div ref={containerRef} className="vue-lounge-container" />
      </div>
    </section>
  );
}
