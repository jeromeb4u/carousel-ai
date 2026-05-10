# CarouselAI — Product Specification

## 1. Concept & Vision

CarouselAI transforms the tedious process of designing LinkedIn carousels into an instant, one-click experience. Feed it any topic or blog post and receive a professionally designed 10-slide carousel with matching captions — optimized for maximum LinkedIn engagement. The product targets LinkedIn creators, marketers, and thought leaders who want the algorithmic advantage of carousel content without the design friction.

**Tagline:** One topic. 10 slides. Done.

---

## 2. Design Language

### Aesthetic Direction
Editorial, clean, design-forward. Think Notion meets Linear — purposeful whitespace, sharp typography, and a confident teal accent that signals credibility without being corporate.

### Color Palette
| Role | Hex | Usage |
|---|---|---|
| Background | `#fafafa` | Page background |
| Surface | `#ffffff` | Cards, navbar |
| Border | `#e5e5e5` | Dividers, input borders |
| Primary | `#056d5c` | CTAs, links, active states |
| Secondary | `#f97316` | Accents, highlights |
| Success | `#22c55e` | Positive indicators |
| Text | `#171717` | Headings, body |
| Muted | `#737373` | Secondary text, placeholders |

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Semi-bold / Bold, tight letter-spacing
- **Body:** Regular, comfortable line-height

### Spatial System
- Base unit: 4px
- Section padding: 80px–120px vertical
- Card padding: 24px–32px
- Border radius: 8px (cards), 6px (buttons), 12px (hero elements)

### Motion Philosophy
- Subtle fade-in on scroll (Intersection Observer)
- Button hover: scale(1.02) + shadow lift, 150ms ease
- Carousel swipe: smooth CSS scroll-snap
- Loading state: pulsing skeleton shimmer

---

## 3. Layout & Structure

### Page Flow
1. **NavBar** — Sticky, minimal: Logo left | Links center | CTA right
2. **Hero** — Full-viewport, centered headline + sub + CTA input
3. **Carousel Preview** — Interactive mock demo (topic → loading → slides)
4. **Features Grid** — 6 features in 3×2 responsive grid
5. **How It Works** — 3 horizontal steps with icons
6. **Stats Bar** — 4 metrics in a horizontal band
7. **Testimonials** — 3 LinkedIn creator cards with engagement numbers
8. **Pricing** — 3-column pricing table
9. **CTA Banner** — Final conversion push
10. **Footer** — Links, social icons, copyright

### Responsive Strategy
- Mobile-first Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- NavBar collapses to hamburger menu on mobile
- Feature grid: 1 col → 2 col → 3 col
- Pricing: stacked → 3-col grid at lg

---

## 4. Features & Interactions

### NavBar
- Sticky on scroll with subtle shadow
- Smooth-scroll anchor links to sections
- "Try Free" button → scrolls to pricing or demo section
- Mobile: hamburger toggles a slide-down menu

### Hero Section
- Headline: "One topic. 10 slides. Done."
- Subheadline: Value prop about LinkedIn carousel engagement
- Primary CTA: Input field "Enter your topic or paste a blog post URL..." + "Generate Carousel" button
- Secondary CTA: "See how it works" (anchor link)
- Background: Subtle gradient mesh or geometric pattern

### Carousel Preview (Interactive Mock)
- Title: "See CarouselAI in action"
- Step 1 — Empty state: Input field + "Generate" button (disabled until text entered)
- Step 2 — Loading state: Animated skeleton slides (3 placeholder slides shimmer)
- Step 3 — Result state: Horizontal scroll of 10 mock carousel slides with:
  - Swipe/drag indicators (dots + arrows)
  - Each slide has a preview number, title, and mock content block
  - "Download PNG" and "Download PDF" mock buttons

### Features Grid
1. **AI Slide Generation** — OpenAI-powered slide design from any text input
2. **LinkedIn-Optimized Dimensions** — 1080×1080px square, perfect for feed algorithm
3. **Brand Color Customization** — Upload logo / pick brand colors (Growth+)
4. **Caption Generator** — AI-generated caption with hashtags optimized for reach
5. **PNG/PDF Export** — One-click download in either format
6. **Template Library** — Pre-built slide structures for common niches (Growth+)

### How It Works
- **Step 1:** Enter Topic — Paste a topic, article URL, or blog post excerpt
- **Step 2:** AI Designs — Our AI analyzes your content, structures it into 10 slides, designs each one
- **Step 3:** Download & Post — Export as PNG (each slide) or PDF (print-ready deck), copy caption, post

### Stats Bar
- **50,000+** Carousels generated
- **4.2M** Impressions driven for creators
- **3.5×** Average engagement lift
- **4.9/5** Average creator rating

### Testimonials
3 creator cards:
1. **Sarah Chen** — Marketing Director | 12,000+ impressions on launch carousels | "CarouselAI cut my content production from 4 hours to 4 minutes."
2. **Marcus Williams** — SaaS Founder | 8 carousels, 45K total impressions | "The LinkedIn algorithm loves these. My outbound replies tripled."
3. **Priya Nair** — Freelance Consultant | 15 carousels, 28K reach in 30 days | "I post twice a week now instead of once a month. No designer needed."

### Pricing Table
| Plan | Price | Carousels/mo | Features |
|---|---|---|---|
| **Starter** | Free | 3 | AI generation, PNG export, basic templates |
| **Growth** | $15/mo | 20 | + Brand colors, template library, PDF export, priority queue |
| **Pro** | $35/mo | Unlimited | + API access, custom dimensions, dedicated support |

- Annual toggle: 20% off
- "Most Popular" badge on Growth plan
- Feature comparison list below pricing cards

### CTA Banner
- Headline: "Ready to dominate your LinkedIn feed?"
- Sub: "Join 10,000+ creators already growing with CarouselAI."
- Primary button: "Start for Free — No Credit Card Required"
- Background: Primary teal gradient

### Footer
- Logo + tagline left
- 4 link columns: Product, Company, Resources, Legal
- Social icons: Twitter/X, LinkedIn, Instagram
- Copyright: "© 2025 CarouselAI. All rights reserved."

---

## 5. Component Inventory

### `<Navbar>`
- States: default (transparent/white bg), scrolled (white + shadow), mobile-open
- Logo: SVG icon + "CarouselAI" wordmark
- Links: hover underline animation, active state (teal color)
- CTA button: primary teal, hover scale + shadow

### `<HeroSection>`
- Large display text, gradient mesh background
- Input: rounded border, focus ring (teal), placeholder
- Button: secondary orange, hover darken + lift

### `<CarouselPreview>`
- States: idle (input), loading (skeleton shimmer), demo (static slides)
- Slides: rounded, shadow, numbered badge
- Navigation: dot indicators, arrow buttons on hover

### `<FeatureCard>`
- Icon (Lucide), title, description
- Hover: subtle border color shift + lift

### `<HowItWorksStep>`
- Numbered badge, icon, title, description
- Connecting line between steps on desktop

### `<StatItem>`
- Large number (animated count-up on scroll), label, optional icon

### `<TestimonialCard>`
- Avatar, name, title, quote, engagement stats (impressions, likes)
- Hover: slight lift

### `<PricingCard>`
- Highlighted border for "popular" plan
- Feature checklist with check/x icons
- CTA button

### `<CTABanner>`
- Full-width teal gradient background
- Centered text + button

### `<Footer>`
- 4-column grid on desktop, stacked on mobile
- Social icons (Lucide)

---

## 6. Technical Approach

### Framework & Tools
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** with `@import "tailwindcss"` + `@theme {}` syntax
- **Lucide React** for icons
- **Inter** font via `next/font/google`

### Architecture
- Single-page marketing landing at `app/page.tsx`
- Server component with `'use client'` directive for interactive sections (preview, mobile nav)
- Component-per-section in `app/components/`
- CSS custom properties in `app/globals.css` for design tokens

### Key Files
```
carousel-ai/
├── SPEC.md
├── package.json
├── next.config.js
├── tsconfig.json
├── postcss.config.js
├── .gitignore
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
```

### Deployment
- Vercel CLI: `npx vercel --yes`
- Build command: `npm run build`
- Output directory: `.next`
- Environment: production auto-deploy

### Performance Targets
- Lighthouse Performance: 90+
- First Contentful Paint: <1.5s
- No layout shift (reserved heights for lazy content)
