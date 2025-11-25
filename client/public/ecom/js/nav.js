// Navigation Component

class Navigation {
  constructor() {
    this.header = null;
    this.mobileMenu = null;
    this.miniCart = null;
    this.init();
  }

  init() {
    this.setupHeader();
    this.setupMobileMenu();
    this.setupMiniCart();
    this.setupScrollBehavior();
    this.updateCartBadge();
    this.setupEventListeners();
  }

  setupHeader() {
    this.header = document.querySelector('.header');
  }

  setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');

    if (toggle && this.mobileMenu) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
      });

      // Close menu when clicking a link
      this.mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('active');
          this.mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }

  setupMiniCart() {
    const cartIcon = document.querySelector('.cart-icon-wrapper');
    this.miniCart = document.querySelector('.mini-cart');

    if (cartIcon && this.miniCart) {
      let timeout;

      cartIcon.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        this.miniCart.classList.add('active');
      });

      cartIcon.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          this.miniCart.classList.remove('active');
        }, 300);
      });

      this.miniCart.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
      });

      this.miniCart.addEventListener('mouseleave', () => {
        this.miniCart.classList.remove('active');
      });
    }
  }

  setupScrollBehavior() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (this.header) {
        if (currentScroll > 100) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }

        // Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
          this.header.style.transform = 'translateY(-100%)';
        } else {
          this.header.style.transform = 'translateY(0)';
        }
      }

      lastScroll = currentScroll;
    });
  }

  updateCartBadge() {
    // Listen for cart updates
    window.addEventListener('cartUpdated', (e) => {
      if (window.ShoppingCart) {
        window.ShoppingCart.updateCartUI();
      }
    });
  }

  setupEventListeners() {
    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  static renderNavigation() {
    return `
      <header class="header">
        <div class="nav-container">
          <a href="index.html" class="logo">
            <span>✨</span>
            <span>LUXE</span>
          </a>

          <nav class="nav-links">
            <a href="index.html" class="nav-link" data-testid="link-home">Home</a>
            <a href="shop.html" class="nav-link" data-testid="link-shop">Shop</a>
            <a href="blog.html" class="nav-link" data-testid="link-blog">Blog</a>
            <a href="contact-us.html" class="nav-link" data-testid="link-contact">Contact</a>
          </nav>

          <div class="nav-actions">
            <button class="theme-toggle" data-testid="button-theme-toggle">
              <span class="theme-icon">🌙</span>
            </button>

            <a href="wishlist.html" class="wishlist-icon" data-testid="link-wishlist">
              <span>🤍</span>
            </a>

            <div class="cart-icon-wrapper">
              <a href="shopping-cart.html" class="cart-icon" data-testid="link-cart">
                <span>🛒</span>
              </a>
              <div class="cart-badge" style="display: none;">0</div>

              <div class="mini-cart">
                <div class="mini-cart-header">Shopping Cart</div>
                <div class="mini-cart-items"></div>
                <div class="mini-cart-footer">
                  <div class="mini-cart-total">
                    <span>Total:</span>
                    <span class="mini-cart-total-amount">$0.00</span>
                  </div>
                  <a href="shopping-cart.html" class="btn btn-primary btn-sm" style="width: 100%; margin-top: 0.5rem;" data-testid="button-view-cart">
                    View Cart
                  </a>
                </div>
              </div>
            </div>

            <button class="mobile-menu-toggle" data-testid="button-mobile-menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div class="mobile-menu">
        <nav class="mobile-nav-links">
          <a href="index.html" class="mobile-nav-link">Home</a>
          <a href="shop.html" class="mobile-nav-link">Shop</a>
          <a href="blog.html" class="mobile-nav-link">Blog</a>
          <a href="contact-us.html" class="mobile-nav-link">Contact</a>
          <a href="wishlist.html" class="mobile-nav-link">Wishlist</a>
          <a href="shopping-cart.html" class="mobile-nav-link">Cart</a>
        </nav>
      </div>
    `;
  }

  static renderFooter() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h4>LUXE</h4>
              <p style="color: var(--text-secondary);">Premium products for the modern lifestyle. Curated with care, delivered with excellence.</p>
              <div class="social-links">
                <a href="#" class="social-link" data-testid="link-social-instagram">📷</a>
                <a href="#" class="social-link" data-testid="link-social-twitter">🐦</a>
                <a href="#" class="social-link" data-testid="link-social-facebook">👥</a>
                <a href="#" class="social-link" data-testid="link-social-pinterest">📌</a>
              </div>
            </div>

            <div class="footer-section">
              <h4>Shop</h4>
              <ul class="footer-links">
                <li><a href="shop.html" class="footer-link">All Products</a></li>
                <li><a href="shop.html?category=new" class="footer-link">New Arrivals</a></li>
                <li><a href="shop.html?category=trending" class="footer-link">Trending</a></li>
                <li><a href="shop.html?category=sale" class="footer-link">Sale</a></li>
              </ul>
            </div>

            <div class="footer-section">
              <h4>Support</h4>
              <ul class="footer-links">
                <li><a href="contact-us.html" class="footer-link">Contact Us</a></li>
                <li><a href="#" class="footer-link">Shipping Info</a></li>
                <li><a href="#" class="footer-link">Returns</a></li>
                <li><a href="#" class="footer-link">FAQ</a></li>
              </ul>
            </div>

            <div class="footer-section">
              <h4>Newsletter</h4>
              <p style="color: var(--text-secondary); margin-bottom: 1rem;">Get exclusive offers and updates</p>
              <div style="display: flex; gap: 0.5rem;">
                <input type="email" placeholder="Your email" style="flex: 1;" data-testid="input-newsletter-email">
                <button class="btn btn-primary btn-sm" data-testid="button-newsletter-subscribe">Subscribe</button>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <p>&copy; 2026 LUXE. All rights reserved. | Premium eCommerce Experience</p>
          </div>
        </div>
      </footer>
    `;
  }
}

// Auto-render navigation and footer on page load
if (typeof window !== 'undefined') {
  // Immediately insert navigation and footer HTML
  document.addEventListener('DOMContentLoaded', () => {
    const navPlaceholder = document.getElementById('nav-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (navPlaceholder) {
      navPlaceholder.innerHTML = Navigation.renderNavigation();
    }
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = Navigation.renderFooter();
    }
    
    // Initialize interactive features
    window.navigationInstance = new Navigation();
  });
}
