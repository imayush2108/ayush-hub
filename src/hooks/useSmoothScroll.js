import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * useSmoothScroll
 * Provides high-performance, momentum-based smooth scrolling across Ayush Hub
 * using Lenis. Automatically handles wheel scrolling, touch physics, and
 * glides seamlessly to target sections on anchor link clicks.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis with buttery-smooth easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.2,
      infinite: false,
      autoRaf: false,
    });

    window.__lenis = lenis;

    // Run animation frame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global interceptor for smooth anchor jumps
    const handleAnchorClick = (e) => {
      // Find nearest link tag
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Ignore bare '#' or custom track routes like '#/track/...'
      if (!href || href === '#' || href.startsWith('#/track/')) return;

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        
        // Glide smoothly to the section with offset accounting for the fixed navbar
        lenis.scrollTo(targetElement, {
          offset: -76,
          duration: 1.25,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // Update URL hash cleanly
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}

export default useSmoothScroll;
