

## Plan: Blog Page + Navigation Link

### Overview
Create a visually striking blog page at `/blog` with a magazine-style editorial layout that fits Publify's brand (coral primary, blue accent). Add the "Blog" link to the landing page header navigation.

### Changes

**1. Header Navigation** (`src/pages/LandingPage/components/Header.tsx`)
- Add `{ href: "/blog", label: "Blog", isRoute: true }` to `navLinks`
- Update rendering to use `<Link>` for route-based links vs `<a>` for anchor links

**2. New Blog Page** (`src/pages/Blog/Blog.tsx`)
- Full standalone page (public, no auth required) with its own Header/Footer reuse from landing
- Hero banner with gradient background, title "El Blog de Publify", subtitle about self-publishing insights
- **Featured post** — large card with image placeholder, category badge, title, excerpt, author avatar, date
- **Post grid** — 3-column responsive grid (1 col mobile, 2 tablet, 3 desktop) with cards featuring:
  - Gradient placeholder images (using brand colors)
  - Category pills (accent color)
  - Title, excerpt, reading time, date
  - Hover animations with framer-motion (scale, shadow lift)
- **Categories sidebar/filter bar** — horizontal scrollable pills on top (Todos, Self-Publishing, Marketing, Finanzas, Productividad)
- **Newsletter CTA** mid-page — accent-colored banner encouraging subscription
- Static mock data (6-8 articles) with realistic Spanish copy about self-publishing topics

**3. Blog Post Detail Page** (`src/pages/Blog/BlogPost.tsx`)
- Clean reading layout with max-width prose container
- Back navigation, category badge, title, author info, date, reading time
- Mock article body with styled typography (headings, paragraphs, quotes)
- Related posts section at bottom
- CTA to waitlist at the end

**4. Routing** (`src/App.tsx`)
- Add `/blog` route → Blog page
- Add `/blog/:slug` route → BlogPost page
- Both public (outside ProtectedRoute)

**5. Lazy Routes** (`src/routes/LazyRoutes.tsx`)
- Add lazy imports for Blog and BlogPost

### Visual Design Details
- Cards use `bg-card` with `hover:shadow-xl` transitions
- Category badges use `bg-accent/10 text-accent` styling
- Featured post spans full width with a left image / right content split
- Gradient overlays on image placeholders using primary→accent brand colors
- Reading time calculated from mock content length
- Smooth `framer-motion` stagger animations on the grid

