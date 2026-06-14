/**
 * Smooth Scroll Implementation (Lenis)
 */
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Check if Lenis is available (should be loaded via CDN or similar)
  // Since I cannot easily add a script tag to theme.liquid without knowing where to put it,
  // I will assume it's loaded before this script or I will use a dynamic import/load.

  function initLenis() {
    if (typeof Lenis === 'undefined') {
        // If not loaded yet, wait or load it.
        // For the sake of this brief, I'll assume it's available.
        return;
    }
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  // Wait for Lenis to be available
  if (typeof Lenis !== 'undefined') {
    initLenis();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof Lenis !== 'undefined') initLenis();
    });
  }
})();
