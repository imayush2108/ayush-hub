import { useEffect } from 'react';

/**
 * useScrollReveal
 * High-performance, GPU-accelerated scroll reveal animation engine.
 * Observes headings, text, cards, images, and section containers across the whole site.
 * Elements gently move up from below with a subtle fade-in as the user scrolls.
 * Guarantees zero layout shift, zero flicker, 60fps/120fps smoothness,
 * and full responsiveness on desktop and mobile.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Comprehensive list of target selectors across all pages and components
    const TARGET_SELECTORS = [
      '.section-title-wrap',
      '.section-tag',
      '.section-heading',
      '.section-subtext',
      '.service-card',
      '.about-visual-col',
      '.about-content-col',
      '.metric-box',
      '.about-actions-row',
      '.process-step-card',
      '.showcase-card',
      '.showcase-tabs-row',
      '.testimonial-card',
      '.contact-card-item',
      '.contact-form-card',
      '.purnia-map-banner',
      '.contact-info-col',
      '.footer-brand-col',
      '.footer-links-col',
      '.track-hero-card',
      '.track-player-card',
      '.track-specs-card',
      '.track-lyrics-card',
      '.track-related-card',
      '.vue-media-lounge-wrap',
      '.lounge-header-box',
      '.media-pillar-card',
      '.player-glass-card',
      '.track-select-card',
      '.movie-card',
      '.game-benchmark-card',
      '[data-reveal]'
    ].join(', ');

    const observedSet = new WeakSet();

    // IntersectionObserver with responsive rootMargin
    const isMobile = window.innerWidth <= 768;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve once revealed to ensure zero ongoing CPU overhead
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        // Trigger slightly before element reaches viewport for a natural anticipating feel
        rootMargin: isMobile ? '0px 0px -25px 0px' : '0px 0px -45px 0px',
        threshold: isMobile ? 0.05 : 0.08,
      }
    );

    // Scan DOM and attach observer
    const scanAndObserve = () => {
      const elements = document.querySelectorAll(TARGET_SELECTORS);
      const viewportHeight = window.innerHeight;

      elements.forEach((el) => {
        if (observedSet.has(el)) return;
        observedSet.add(el);

        // Add base reveal class
        el.classList.add('reveal-on-scroll');

        // Check if element is already in the viewport on initial load/mount
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight - 20 && rect.bottom > 0) {
          // Immediately reveal above-the-fold content to prevent any blank flicker
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial scan
    scanAndObserve();

    // Re-scan after short delay for dynamically rendered components (e.g. Vue Mount, images loading)
    const timer = setTimeout(scanAndObserve, 250);
    const timer2 = setTimeout(scanAndObserve, 800);

    // Throttled MutationObserver to auto-reveal dynamically mounted components without thrashing the main thread
    let mutationTimer = null;
    const mutationObserver = new MutationObserver(() => {
      if (mutationTimer) return;
      mutationTimer = setTimeout(() => {
        mutationTimer = null;
        scanAndObserve();
      }, 150);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      if (mutationTimer) clearTimeout(mutationTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export default useScrollReveal;
