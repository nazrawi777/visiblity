# LUXE - Premium eCommerce Template

A complete, functional eCommerce website built with pure vanilla HTML/CSS/JavaScript (no frameworks). Features a modern design system, LocalStorage-based cart/wishlist persistence, and responsive layouts.

## 🚀 Features

### Core Pages
- **4 Unique Home Page Variants** (index.html - index-4.html)
  - Diagonal split heroes with overlapping product cards
  - Blob SVG shapes and CSS parallax effects
  - Horizontal trending product galleries
  - Trust signals and customer stats

- **Shop Page** (shop.html)
  - Masonry product grid layout
  - Live filtering by category and price range
  - Product sorting (price, newest, featured)
  - Load more pagination

- **Single Product Page** (single-product.html)
  - Image gallery with thumbnail switching
  - Product details, reviews, and ratings
  - Quantity controls and wishlist toggle
  - Related products grid

- **Shopping Cart** (shopping-cart.html)
  - LocalStorage persistence across sessions
  - Quantity adjustment controls
  - Live total calculations
  - Proceed to checkout CTA

- **Wishlist** (wishlist.html)
  - Save-for-later functionality
  - Move items to cart with one click
  - LocalStorage persistence

- **Checkout** (checkout.html)
  - Multi-step form (Contact → Shipping → Review)
  - Step-by-step progress indicators
  - Form validation
  - Demo completion (no real payment processing)

- **Blog** (blog.html, blog-details.html)
  - Featured and standard post layouts
  - Article categorization
  - Reading progress bar
  - Related articles

- **Contact** (contact-us.html)
  - Contact form (demo - no backend)
  - Office location and hours
  - Email and contact information

- **404 Error Page** (404.html)
  - Branded error message
  - Product suggestions
  - Navigation back to shop

### Implementation Features

#### JavaScript Functionality
- **Shopping Cart** (cart.js): Add/remove items, update quantities, calculate totals, LocalStorage persistence
- **Wishlist** (wishlist.js): Toggle items, move to cart, LocalStorage persistence  
- **Dark/Light Mode** (theme-toggle.js): Theme switching with LocalStorage persistence
- **Navigation** (nav.js): Auto-rendering header/footer, mobile menu, mini-cart dropdown
- **Custom Cursor** (cursor.js): Magnetic button effects (where supported)
- **Smooth Scroll** (smooth-scroll.js): Lenis.js wrapper for enhanced scrolling
- **Animations** (animations.js): Anime.js wrapper for fade-in and reveal effects

#### Visual Design
- Modern color scheme with CSS custom properties
- Responsive grid layouts (mobile, tablet, desktop)
- Hover and active states on interactive elements
- Google Fonts integration (Plus Jakarta Sans, Inter, DM Sans)
- SVG blob shapes and gradients

#### Dark/Light Mode
- Theme toggle in navigation
- LocalStorage persistence
- System preference detection on first visit
- All colors adapt via CSS variables

#### Performance & Best Practices
- Clean, semantic HTML5
- Mobile-first responsive CSS
- External script loading via CDN (Anime.js, Lenis.js)
- Reading progress bars on content pages
- Image alt text and ARIA labels where appropriate

## 📁 File Structure

```
ecom/
├── index.html              # Home variant 1 (Diagonal split hero)
├── index-2.html            # Home variant 2 (Centered fullscreen)
├── index-3.html            # Home variant 3 (Minimalist)
├── index-4.html            # Home variant 4 (Bold dynamic)
├── shop.html               # Product catalog with filters
├── single-product.html     # Detailed product view
├── shopping-cart.html      # Cart management
├── wishlist.html           # Saved items
├── checkout.html           # Multi-step checkout
├── blog.html               # Blog listing
├── blog-details.html       # Article view
├── contact-us.html         # Contact form
├── 404.html                # Error page
│
├── css/
│   ├── variables.css       # Design system tokens
│   ├── base.css            # Reset & typography
│   ├── components.css      # Reusable components
│   ├── animations.css      # Animation utilities
│   └── navigation.css      # Header & footer styles
│
├── js/
│   ├── cart.js             # Shopping cart logic
│   ├── wishlist.js         # Wishlist management
│   ├── theme-toggle.js     # Dark/light mode
│   ├── cursor.js           # Custom magnetic cursor
│   ├── smooth-scroll.js    # Lenis.js wrapper
│   ├── animations.js       # Anime.js controller
│   └── nav.js              # Navigation component
│
└── assets/
    └── images/             # Product images
```

## 🎨 Design System

### Colors
- Primary: `#8b5cf6` (Purple)
- Accent: `#ec4899` (Pink)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Orange)
- Error: `#ef4444` (Red)

### Typography
- Display: Plus Jakarta Sans (product titles, headings)
- Body: Inter (descriptions, body text)
- CTA: DM Sans (buttons, calls-to-action)

### Spacing Scale
- XS: 0.5rem (8px)
- SM: 1rem (16px)
- MD: 1.5rem (24px)
- LG: 2rem (32px)
- XL: 3rem (48px)
- 2XL: 4rem (64px)

## 🛠️ Setup & Usage

### Option 1: Direct Browser Access
1. Navigate to `client/public/ecom/`
2. Open `index.html` in any modern browser
3. All features work immediately (uses CDN for libraries)

### Option 2: Local Development Server
```bash
# Using Python
cd client/public/ecom
python -m http.server 8000

# Using Node.js http-server
npm install -g http-server
cd client/public/ecom
http-server -p 8000

# Access at http://localhost:8000
```

### Option 3: Replit Deployment
The site is already configured to run on Replit. The `Start application` workflow serves files from `client/public/ecom/`.

## 🎯 Key Features in Action

### Shopping Cart
- **Add Items**: Click "Add to Cart" on any product
- **View Cart**: Cart badge updates automatically
- **Mini-Cart**: Hover over cart icon for quick preview
- **Manage**: Navigate to cart page to update quantities or remove items
- **Persistence**: Cart saves to localStorage, persists across sessions

### Wishlist
- **Save Items**: Click heart icon on any product card
- **Manage**: View all saved items on wishlist page
- **Move to Cart**: One-click transfer from wishlist to cart
- **Visual Feedback**: Pulsing heart indicator when items are saved

### Dark Mode
- **Toggle**: Click moon/sun icon in navigation
- **Persistence**: Preference saved to localStorage
- **System Sync**: Detects system dark mode preference
- **Auto-Adapt**: All colors, shadows, and images adjust automatically

### Filters & Search (Shop Page)
- **Categories**: Tech & Gadgets, Fashion, Home & Living
- **Price Ranges**: Under $50, $50-$150, $150-$300, $300+
- **Sorting**: Featured, Price (Low/High), Newest
- **Real-time**: Results update instantly as filters change

## 🚀 Performance Optimizations

- **Images**: Lazy loading via Intersection Observer
- **Fonts**: Preloaded with `display: swap`
- **JavaScript**: Deferred loading for non-critical scripts
- **CSS**: Critical styles inlined, others deferred
- **Animations**: Hardware-accelerated transforms
- **Reduced Motion**: Respects `prefers-reduced-motion`

## 📱 Responsive Design

- **Mobile**: Single-column layouts, touch-optimized carousels
- **Tablet**: 2-column balanced grids
- **Desktop**: Asymmetric multi-column layouts (2-4 products)
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🔧 Customization

### Colors
Edit `css/variables.css` to change color scheme:
```css
:root {
  --primary: 262 83% 58%;     /* Purple */
  --accent: 340 75% 55%;      /* Pink */
  /* Add your custom colors */
}
```

### Typography
Replace Google Fonts link in HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

Update `css/variables.css`:
```css
:root {
  --font-display: 'Your Display Font', sans-serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Products
Edit product arrays in JavaScript files:
- `shop.html` - Main product catalog
- `index.html` - Featured hero products

## 🌐 Browser Support

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile Safari: 14+
- Samsung Internet: 14+

## 📄 License

This is a demo template created for educational purposes. Use freely for personal or commercial projects.

## 🙏 Credits

- **Design System**: Custom design following 2026 trends
- **Animations**: Anime.js (MIT License)
- **Smooth Scroll**: Lenis.js (MIT License)
- **Fonts**: Google Fonts (Open Font License)
- **Images**: Unsplash (Free to use)

## 💡 Tips

1. **Start with Home**: Explore index.html through index-4.html to see different hero styles
2. **Test Cart Flow**: Add items → View cart → Proceed to checkout
3. **Try Dark Mode**: Toggle theme and see all elements adapt
4. **Explore Animations**: Scroll slowly to see staggered reveals and counters
5. **Mobile Testing**: Resize browser to see responsive breakpoints

## 🐛 Known Limitations

- **No Backend**: Cart/wishlist use localStorage (data is client-side only)
- **No Payment**: Checkout is for demonstration purposes
- **No Search**: Product search not implemented (filter/sort only)
- **Static Content**: Blog and products are hardcoded (not dynamic)

## 🔮 Future Enhancements

Potential additions (not included in this version):
- Real payment gateway integration (Stripe/PayPal)
- Backend with PostgreSQL database
- User accounts with order history
- Product search with live results
- Email notifications
- Inventory management

---

**Built with ❤️ using pure HTML/CSS/JavaScript**

*For questions or support, visit the contact page or open an issue.*
