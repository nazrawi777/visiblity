# Premium eCommerce Platform

## Overview

A modern, full-stack eCommerce web application built with React, Express, and PostgreSQL. The project features a premium design system inspired by high-end eCommerce platforms (Shopify Plus, Apple Store, Vercel Store) with 2026 aesthetic trends. The application includes a complete static eCommerce frontend demo with LocalStorage-based cart/wishlist functionality, and a React-based SPA foundation using shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- Hot Module Replacement (HMR) enabled in development

**UI Component Library**
- shadcn/ui (Radix UI primitives with Tailwind CSS styling)
- "New York" style variant configured
- Comprehensive component collection including: accordion, alert-dialog, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, and more
- Custom Tailwind configuration with CSS variables for theming

**State Management**
- TanStack Query (React Query) for server state management
- Custom query client with infinite stale time and disabled auto-refetching
- Toast notifications using Radix UI Toast primitives

**Styling System**
- Tailwind CSS with custom configuration
- CSS variables for dynamic theming (light/dark mode support)
- Custom border radius values (.5625rem, .375rem, .1875rem)
- Extensive color system with HSL values and alpha support
- Hover elevation and active state utilities
- Path aliases: `@/` maps to `client/src/`, `@shared/` to shared directory, `@assets/` to attached_assets

**Static Demo Pages**
- Four unique home page variants (index.html through index-4.html) showcasing different hero layouts
- Complete eCommerce flow: shop, single product, shopping cart, wishlist, checkout, blog, contact pages
- LocalStorage-based persistence for cart and wishlist
- Premium design features: diagonal splits, blob SVG shapes, parallax scrolling, masonry layouts, magnetic cursor effects
- Custom animations using Anime.js and smooth scrolling with Lenis.js
- Responsive design with mobile menu support

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- Modular route registration system
- Request/response logging middleware
- JSON body parsing with raw body preservation for webhook support
- Separate development and production entry points

**Development vs Production**
- Development: Vite middleware integration with HMR, hot reloading of index.html with cache busting via nanoid
- Production: Static file serving from compiled dist/public directory
- esbuild for server-side bundling in production

**Storage Layer**
- Interface-based storage pattern (`IStorage`) for flexibility
- In-memory implementation (`MemStorage`) as default
- CRUD methods for user management (getUser, getUserByUsername, createUser)
- Ready for PostgreSQL integration via Drizzle ORM

### Data Storage Solutions

**Database ORM**
- Drizzle ORM configured for PostgreSQL
- Neon serverless PostgreSQL driver (`@neondatabase/serverless`)
- Schema definition in `shared/schema.ts` for code sharing between client and server
- Migration files output to `./migrations` directory
- Drizzle Zod integration for runtime validation

**Schema Design**
- Users table with UUID primary keys (auto-generated via PostgreSQL)
- Username/password authentication fields
- Zod schemas derived from Drizzle tables for validation

**Session Management**
- `connect-pg-simple` for PostgreSQL-backed session storage (configured but not actively used in current implementation)

### External Dependencies

**Third-Party Services**
- Neon Database for PostgreSQL hosting (connection via DATABASE_URL environment variable)

**CDN Libraries (Static Demo)**
- Anime.js v3.2.1 for advanced animations
- Lenis v1.0.19 for smooth scrolling effects
- Google Fonts for typography (Plus Jakarta Sans, Inter, DM Sans)
- Unsplash for product imagery

**NPM Packages**
- React ecosystem: react, react-dom, @tanstack/react-query
- Radix UI primitives: 20+ component packages (@radix-ui/react-*)
- Form handling: react-hook-form, @hookform/resolvers, zod
- Utilities: clsx, class-variance-authority, tailwind-merge, date-fns, nanoid
- Icons: lucide-react, embla-carousel-react
- Routing: wouter
- Command palette: cmdk

**Development Tools**
- TypeScript with strict mode enabled
- Vite plugins: @vitejs/plugin-react, @replit/vite-plugin-runtime-error-modal
- Replit-specific plugins: cartographer, dev-banner (development only)
- PostCSS with Tailwind CSS and Autoprefixer
- drizzle-kit for database migrations

**Design System Resources**
- Custom typography: Clash Display (variable weight 300-700), Satoshi/Inter, General Sans/DM Sans
- Premium design guidelines documented in `design_guidelines.md`
- Asymmetric spacing, masonry layouts, magnetic hover effects
- Blob SVG shapes, mesh gradients, parallax effects