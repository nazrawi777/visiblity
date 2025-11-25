// Custom Magnetic Cursor with Morphing Effects

class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorDot = null;
    this.magneticElements = [];
    this.isTouch = 'ontouchstart' in window;
    
    if (!this.isTouch) {
      this.init();
    }
  }

  init() {
    this.createCursor();
    this.setupEventListeners();
    this.findMagneticElements();
  }

  createCursor() {
    // Main cursor circle
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: var(--z-cursor);
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
      mix-blend-mode: difference;
    `;
    
    // Cursor dot
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'custom-cursor-dot';
    this.cursorDot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: calc(var(--z-cursor) + 1);
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease;
    `;
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorDot);
  }

  setupEventListeners() {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instant update for dot
      dotX = mouseX;
      dotY = mouseY;
      this.cursorDot.style.left = dotX + 'px';
      this.cursorDot.style.top = dotY + 'px';
      
      // Check for magnetic elements
      this.checkMagneticProximity(mouseX, mouseY);
    });

    // Smooth follow for main cursor
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      this.cursor.style.left = cursorX + 'px';
      this.cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(updateCursor);
    };
    updateCursor();

    // Cursor states
    document.addEventListener('mousedown', () => {
      this.cursor.style.width = '35px';
      this.cursor.style.height = '35px';
    });

    document.addEventListener('mouseup', () => {
      this.cursor.style.width = '40px';
      this.cursor.style.height = '40px';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
      this.cursorDot.style.opacity = '1';
    });
  }

  findMagneticElements() {
    // Find elements with magnetic effect
    const magneticSelectors = [
      '.btn-magnetic',
      '.btn-primary',
      '.btn-gradient',
      '[data-magnetic="true"]'
    ];

    this.magneticElements = [];
    magneticSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        this.magneticElements.push(el);
        this.setupMagneticElement(el);
      });
    });

    // Re-scan periodically for dynamically added elements
    setInterval(() => this.findMagneticElements(), 2000);
  }

  setupMagneticElement(element) {
    element.addEventListener('mouseenter', () => {
      this.cursor.style.width = '60px';
      this.cursor.style.height = '60px';
      this.cursor.style.borderColor = 'var(--accent)';
    });

    element.addEventListener('mouseleave', () => {
      this.cursor.style.width = '40px';
      this.cursor.style.height = '40px';
      this.cursor.style.borderColor = 'var(--primary)';
    });
  }

  checkMagneticProximity(mouseX, mouseY) {
    this.magneticElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );
      
      const magneticRadius = 100;
      
      if (distance < magneticRadius) {
        const strength = (magneticRadius - distance) / magneticRadius;
        const pullX = (centerX - mouseX) * strength * 0.3;
        const pullY = (centerY - mouseY) * strength * 0.3;
        
        element.style.transform = `translate(${pullX}px, ${pullY}px)`;
      } else {
        element.style.transform = 'translate(0, 0)';
      }
    });
  }
}

// Initialize cursor (only on desktop)
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.CustomCursor = new CustomCursor();
  });
}
