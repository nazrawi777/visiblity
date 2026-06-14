/* ═══════════════════════════════════════
   INFINITE VISIBILITY — iv-main.js
   Lenis smooth scroll + GSAP ScrollTrigger
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Lenis smooth scroll ── */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  // Connect Lenis to GSAP ticker
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  /* ── GSAP ScrollTrigger register ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── Global scroll-reveal utility ── */
  // Any element with data-iv-reveal gets a fade-up entrance
  gsap.utils.toArray('[data-iv-reveal]').forEach((el) => {
    const delay = parseFloat(el.dataset.ivDelay || 0);
    const y = parseFloat(el.dataset.ivY || 50);
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
      opacity: 0,
      y: y,
      duration: 0.9,
      delay: delay,
      ease: 'power3.out',
    });
  });

  /* ── Staggered child reveal ── */
  // Parent with data-iv-stagger reveals children with stagger
  gsap.utils.toArray('[data-iv-stagger]').forEach((parent) => {
    const children = parent.querySelectorAll('[data-iv-stagger-child]');
    if (!children.length) return;
    gsap.from(children, {
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
    });
  });

  /* ── Echo text animation (CRAV style) ── */
  // Elements with class .iv-echo-text get the duplicate ghost effect
  document.querySelectorAll('.iv-echo-text').forEach((el) => {
    const ghost = document.createElement('span');
    ghost.textContent = el.textContent;
    ghost.className = 'iv-echo-ghost';
    ghost.setAttribute('aria-hidden', 'true');
    el.style.position = 'relative';
    el.appendChild(ghost);
  });

  /* ── Mobile drawer ── */
  const hamburger = document.querySelector('.iv-hamburger');
  const drawer = document.querySelector('.iv-mobile-drawer');
  const overlay = document.querySelector('.iv-drawer-overlay');
  const closeBtn = document.querySelector('.iv-drawer-close');

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    hamburger?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    hamburger?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // Mobile accordion
  document.querySelectorAll('.iv-mobile-nav-link[data-has-sub]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = link.nextElementSibling;
      const isOpen = sub?.classList.contains('open');
      // Close all
      document.querySelectorAll('.iv-mobile-sub.open').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.iv-mobile-nav-link.open').forEach(l => l.classList.remove('open'));
      if (!isOpen) {
        sub?.classList.add('open');
        link.classList.add('open');
      }
    });
  });

  /* ── Dropdown keyboard accessibility ── */
  document.querySelectorAll('.iv-header__nav > li').forEach((item) => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const dropdown = item.querySelector('.iv-dropdown');
        if (dropdown) {
          dropdown.style.opacity = '0';
          dropdown.style.visibility = 'hidden';
        }
      }
    });
  });

});

// Loading screen — dismisses after 1.5s OR when page is ready
(function() {
  const loader = document.getElementById('iv-loader');
  if (!loader) return;

  const dismiss = () => {
    loader.classList.add('iv-loader--hidden');
    // Remove from DOM after transition
    setTimeout(() => loader.remove(), 700);
  };

  // Dismiss after 1.5s max regardless of page state
  const timer = setTimeout(dismiss, 1500);

  window.addEventListener('load', () => {
    clearTimeout(timer);
    setTimeout(dismiss, 200);
  });
})();

/* ── Collection page: data attribute for CSS targeting ── */
(function() {
  const collHandle = document.querySelector('[data-collection-handle]')?.dataset.collectionHandle
    || window.location.pathname.split('/collections/')[1]?.split('/')[0];
  if (collHandle) {
    document.body.setAttribute('data-collection', collHandle);
  }
})();

/* ── Product grid staggered reveal ── */
(function() {
  const gridItems = document.querySelectorAll(
    '.list-view-item, .product-item, .grid__item, .four-column > li, .three-column > li'
  );
  if (!gridItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('iv-revealed');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  gridItems.forEach(item => observer.observe(item));
})();

/* ── Category horizontal scroll — drag to scroll ── */
(function() {
  const slider = document.querySelector('.iv-cat-scroll');
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => { isDown = false; });
  slider.addEventListener('mouseup', () => { isDown = false; });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
})();

/* ── GSAP collection hero reveal ── */
(function() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const hero = document.querySelector('.collection-hero');
  if (!hero) return;

  gsap.from('.hero-header h1', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2,
  });

  gsap.from('.collection-welcome-message', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.5,
  });
})();
