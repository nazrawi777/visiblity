// Animation Utilities using Anime.js

class AnimationController {
  constructor() {
    this.observedElements = new Set();
    this.init();
  }

  init() {
    if (typeof anime === 'undefined') {
      console.warn('Anime.js not loaded');
      return;
    }

    this.setupScrollAnimations();
    this.setupCounters();
    this.setupTypingAnimation();
    this.startGradientRotation();
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
            this.observedElements.add(entry.target);
            this.animateElement(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Stagger reveal elements
    document.querySelectorAll('.stagger-reveal').forEach(el => {
      observer.observe(el);
    });

    // Product cards
    document.querySelectorAll('.card-product, .product-card').forEach(el => {
      observer.observe(el);
    });
  }

  animateElement(element) {
    if (element.classList.contains('stagger-reveal')) {
      anime({
        targets: element,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo'
      });
    }

    if (element.classList.contains('card-product') || element.classList.contains('product-card')) {
      anime({
        targets: element,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  }

  setupCounters() {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
            this.observedElements.add(entry.target);
            this.animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );

    document.querySelectorAll('.count-up, [data-count-up]').forEach(el => {
      counterObserver.observe(el);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count-target') || element.textContent);
    const duration = parseInt(element.getAttribute('data-count-duration') || 2000);
    
    const obj = { value: 0 };
    
    anime({
      targets: obj,
      value: target,
      duration: duration,
      easing: 'easeOutExpo',
      round: 1,
      update: () => {
        element.textContent = obj.value.toLocaleString();
      }
    });
  }

  setupTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text, [data-typing]');
    
    typingElements.forEach(element => {
      const texts = JSON.parse(element.getAttribute('data-typing-texts') || '[]');
      if (texts.length === 0) return;

      let currentIndex = 0;
      
      const typeText = () => {
        const text = texts[currentIndex];
        element.textContent = '';
        
        let charIndex = 0;
        const typeChar = () => {
          if (charIndex < text.length) {
            element.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 80);
          } else {
            setTimeout(() => {
              eraseText();
            }, 2000);
          }
        };
        
        const eraseText = () => {
          if (element.textContent.length > 0) {
            element.textContent = element.textContent.slice(0, -1);
            setTimeout(eraseText, 50);
          } else {
            currentIndex = (currentIndex + 1) % texts.length;
            setTimeout(typeText, 500);
          }
        };
        
        typeChar();
      };
      
      typeText();
    });
  }

  staggerRevealChildren(container, selector = '.stagger-item') {
    const children = container.querySelectorAll(selector);
    
    anime({
      targets: children,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutQuad'
    });
  }

  morphSVG(element, newPath) {
    if (!element) return;
    
    anime({
      targets: element,
      d: newPath,
      duration: 400,
      easing: 'easeInOutQuad'
    });
  }

  pulseElement(element) {
    anime({
      targets: element,
      scale: [1, 1.1, 1],
      duration: 600,
      easing: 'easeInOutQuad'
    });
  }

  startGradientRotation() {
    // Animate mesh gradient hue rotation
    const root = document.documentElement;
    let hue = 0;
    
    setInterval(() => {
      hue = (hue + 1) % 360;
      root.style.setProperty('--gradient-hue', `${hue}deg`);
    }, 100);
  }

  // Variable font weight animation on scroll
  setupFontWeightScroll() {
    const headings = document.querySelectorAll('h1, h2, .variable-weight');
    
    window.addEventListener('scroll', () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const weight = 300 + (scrollPercent * 400); // 300 to 700
      
      headings.forEach(heading => {
        heading.style.fontVariationSettings = `'wght' ${weight}`;
      });
    });
  }
}

// Initialize animations
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.AnimationController = new AnimationController();
  });
}
