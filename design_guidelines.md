# Premium eCommerce Design Guidelines

## Design Approach
**Reference-Based**: Draw inspiration from high-end eCommerce leaders (Shopify Plus, Apple Store, Vercel Store) combined with 2026 aesthetic trends. Break symmetry intentionally - no perfect 12-column grids. Create layouts that feel custom-designed, never template-like.

## Typography
- **Product Titles**: Clash Display (bold, modern, variable weight 300→700 on scroll)
- **Descriptions/Prices**: Satoshi (clean, readable)
- **CTAs/Buttons**: General Sans (confident, action-oriented)
- Micro-copy should feel conversational: "Grab Yours" not "Add to Cart", "Limited Stock • Ships Free" urgency badges

## Layout System
**Spacing**: Use asymmetric padding (20px left, 40px right on hero; varied section margins 1.5rem-2rem)
**Grids**: Masonry layouts for product displays, overlapping cards with shadow lifts, diagonal splits for heroes
**Horizontal Sections**: One Apple-style horizontal scroll gallery per page (Trending Now, Featured Collections)
**Viewport**: Heroes pin for 150vh with parallax scrolling effects

## Component Library

### Navigation
- Horizontal thumbnail navigation that follows scroll
- Mini-cart dropdown showing recent additions with pulsing wishlist heart icons
- Mobile: Fullscreen menu with swipe gestures, cart icon expands to mini-preview

### Hero Sections (All Home Variants)
- Diagonal split layouts with overlapping product cards
- Custom blob SVG shapes around featured items
- Parallax: Product images move 0.5x speed, text 0.3x speed
- Looping 4K WebM lifestyle video backgrounds (under 5MB) or high-quality product photography

### Product Cards
- Asymmetric sizing in masonry grids
- Hover: Card flips to show reviews/details
- Quick-add buttons with magnetic hover (cursor attraction within 100px)
- Trust badges: "Best Seller" ribbons, stock counters, review stars

### Shopping Cart/Wishlist
- Drag-to-remove interactions with visual feedback
- Animated counters (count-up when in view)
- Recent additions highlighted with subtle pulse animations
- Mini-cart preview with live totals

### Checkout
- Multi-step form with progress indication
- Urgency timers for limited offers
- Contact form for final download link (no payment gateway)

## Visual Treatment

### Color & Gradients
- Animated mesh gradients on backgrounds/buttons (conic-gradient with hue rotation every 10s)
- 10% grainy noise overlay (SVG filter) on product cards for premium texture
- Dark mode: Moody shadows, different 3D model glows
- Light mode: Clean, bright, high contrast

### 3D Elements
- One Spline.js scene per page (floating product orb in hero, rotates on hover)
- Single-product page: Interactive 3D model viewer (GLTF under 500KB)
- Quick-view 3D previews on product cards

### Animations (Anime.js)
- Staggered text reveals (line-by-line in hero)
- Product image masks expand on scroll
- Counter animations (500+ sold counts up at 80% scroll)
- Confetti burst on add-to-cart click
- Morphing SVG icons (cart morphs to full basket, hearts pulse)
- Variable font weight shifts on scroll
- Typing animation for rotating promo headlines

### Custom Cursor
- Trail effect that morphs to cart icon near products
- Magnetic buttons (attract cursor within 100px radius)
- Touch-optimized for mobile (standard behavior)

### Micro-Interactions
- Hover sounds (subtle chimes on add-to-cart, toggleable)
- Reading progress bar (thin top line, turns accent color near checkout)
- Smooth scrolling with Lenis.js for buttery feel

## Images
**Product Photography**: High-quality lifestyle shots with "3D rendered" aesthetic - neon-lit studios, minimalist floating product compositions, macro detail shots
**Hero Sections**: Large immersive images or video loops showing product unboxing/usage
**Category Banners**: Asymmetric diagonal crops with negative space
**Blog**: Featured images with parallax scroll effects
**Placement**: Every page has prominent hero imagery; product grids show 2-3 angles per item

## Responsive Behavior
- Mobile: Single-column stacks, swipe carousels for featured products, touch-optimized quick-add
- Desktop: Asymmetric multi-column grids (2-4 products), horizontal scroll galleries
- Tablet: 2-column balanced layouts

## Performance & Polish
- WebP/AVIF images with lazy loading (priority above-fold)
- Preloaded critical fonts (display: swap)
- Infinite scroll on shop/blog with lazy-loaded products
- Custom 404: Fun animation "Product Not Found? Explore These" with random product grid
- Preloader: Logo reveal with 0-100% bar showing "Loading Your Cart..."