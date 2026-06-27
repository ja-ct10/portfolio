# Julie Ann Tiron — Portfolio

A modern, dark-themed personal portfolio website built with Next.js, showcasing my journey as an aspiring Backend Developer, Database Administrator, & Cybersecurity Professional.

🔗 **Live Demo:** [julieanntiron.vercel.app](https://julieanntiron.vercel.app/)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS
- **Animations:** Framer Motion, GSAP
- **WebGL:** OGL (Light Rays shader effect)
- **Icons:** Lucide React, React Icons
- **Contact Form:** EmailJS
- **Fonts:** Inter, Cormorant Garamond, Roboto Mono

## Features

- **Loading Screen** — Animated progress bar with cinematic entrance
- **Hero Section** — Interactive ID card with spring physics (drag-to-sway), WebGL light rays, typing animation
- **About Section** — 3D tilt photo with hover swap, gradient border glow, staggered card reveals
- **Stats Section** — Animated count-up numbers with gradient underlines on completion
- **Tech Stack** — Categorized grid with hover spotlight effects and staggered reveal
- **Education Timeline** — Alternating zigzag layout with scroll-triggered reveals
- **Portfolio** — Filterable grid with animated tab pills, 3D flip cards for competitions
- **Gallery** — Horizontal scroll carousel with lightbox, parallax effect, and keyboard navigation
- **Contact** — Floating label form with shake validation, loading spinner, and toast notifications
- **Footer** — Reveal animation with gradient separator and animated nav links

## Animations & Interactions

- Scroll-triggered reveal animations (Intersection Observer)
- Framer Motion staggered entrances
- GooeyNav with particle burst effects
- Smooth scroll with active section detection
- Reduced motion support (`prefers-reduced-motion`)
- Full keyboard accessibility with focus-visible outlines

## Responsive Design

Optimized for all screen sizes with breakpoints at:

- 320px (ultra-small)
- 380px (small mobile)
- 480px (mobile)
- 640px (large mobile / small tablet)
- 768px (tablet)
- 900px (large tablet)
- 1024px (desktop)
- 1100px (large desktop nav)
- 1280px (wide desktop)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
├── app/
│   ├── globals.css        # Global styles & animations
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Main page composition
├── components/
│   ├── layout/            # Navbar, Footer, GooeyNav
│   ├── sections/          # Hero, About, Education, etc.
│   └── ui/                # Reusable UI components
├── hooks/
│   └── useReveal.ts       # Intersection Observer hook
├── public/
│   ├── images/            # Portfolio images
│   └── certificates/      # Achievement certificates
└── tailwind.config.js     # Tailwind configuration
```

## Author

**Julie Ann Tiron**

- LinkedIn: [julie-ann-tiron](https://www.linkedin.com/in/julie-ann-tiron/)
- GitHub: [ja-ct10](https://github.com/ja-ct10)
- Email: tironjulieann10@gmail.com

## License

All rights reserved © 2026 Julie Ann Tiron
