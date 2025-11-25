// Smooth Scrolling with Lenis.js

class SmoothScroll {
  constructor() {
    this.lenis = null;
    this.init();
  }

  init() {
    // Lenis will be loaded from CDN
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      this.setupRAF();
      this.setupHorizontalSections();
    }
  }

  setupRAF() {
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  setupHorizontalSections() {
    const horizontalSections = document.querySelectorAll('.horizontal-scroll');
    
    horizontalSections.forEach(section => {
      const container = section.querySelector('.horizontal-scroll-container');
      if (!container) return;

      section.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }, { passive: false });

      // Touch swipe support
      let startX = 0;
      let scrollLeft = 0;

      container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      }, { passive: false });
    });
  }

  scrollTo(target, options = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    } else {
      // Fallback to native smooth scroll
      document.querySelector(target)?.scrollIntoView({ 
        behavior: 'smooth',
        ...options
      });
    }
  }

  stop() {
    if (this.lenis) this.lenis.stop();
  }

  start() {
    if (this.lenis) this.lenis.start();
  }
}

// Initialize smooth scroll
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.SmoothScroll = new SmoothScroll();
  });
}
