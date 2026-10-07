# My Portfolio

A clean, minimalist personal portfolio website for **Samson Mamuya** — Frontend Developer & UI Engineer based in Dar es Salaam, Tanzania (available remotely).

The site presents services, selected project case studies, background and experience, and a working contact section — all wrapped in a calm dark editorial design with smooth scroll-triggered animations.

---

## Tech Stack

| Tool | Purpose |
| --- | --- |
| [React 19](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type-safe code (`strict` mode enabled) |
| [Vite 6](https://vite.dev) | Dev server & production bundler |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling (via `@tailwindcss/vite` plugin) |
| [Motion](https://motion.dev) | Scroll-triggered & micro animations |
| [lucide-react](https://lucide.dev) | Icons |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Contact form success effect |

---

## Features

- **Smart navbar** — transparent-to-solid on scroll, tracks the active section while scrolling, full mobile drawer menu.
- **Hero section** — portrait with vignette blend, serif editorial headline, plus a separate tech-stack band directly below.
- **Services** — three service cards in an asymmetric grid (one featured card + two stacked) with blur-in stagger animation.
- **Selected Work** — full-width case study cards in a single-column sticky stack: on desktop each card pins while the next scrolls over it (GSAP ScrollTrigger pin + scrubbed scale/fade, image parallax); on mobile a plain stacked flow. Cards open an **interactive case study modal** (problem, role, architecture, tech chips, live/GitHub links; Escape or backdrop click closes).
- **About** — bio, core skills matrix, and a CV link.
- **Contact** — copy-email-to-clipboard button, social links, and a validated form that really sends messages to your inbox via FormSubmit.co (with honeypot spam protection and a confetti celebration on success).
- **Back to top** — floating button that appears after scrolling past the hero.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or newer recommended)

### Installation

```bash
npm install
```

### Run in development

```bash
npm run dev
```

The site opens at `http://localhost:3000`.

> One optional environment variable (`VITE_CONTACT_EMAIL`) powers the contact form — see [Contact Form Setup](#contact-form-setup). Everything else is static data inside the repo.

---

## Contact Form Setup

Contact messages are delivered straight to your inbox via [FormSubmit.co](https://formsubmit.co) — no account or API key needed.

1. Set your destination address in `.env.local` (copy from `.env.example`):

   ```bash
   VITE_CONTACT_EMAIL=you@example.com
   ```

2. Run the site, fill in the contact form, and send once.
3. FormSubmit emails an **activation link** to that address — click it one time.
4. Done. Every message after that arrives immediately, formatted as a table, with an automatic thank-you reply sent to the visitor.

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 (LAN-accessible host). |
| `npm run build` | Production build into `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Type-check the whole project (`tsc --noEmit`, strict). |
| `npm run clean` | Delete the `dist/` folder. |

---

## Project Structure

```
MyPortfolio/
├── index.html                     # Entry HTML (fonts, meta/OG tags, JSON-LD)
├── vite.config.ts                 # Vite config (React, Tailwind, @ alias)
├── tsconfig.json                  # Strict TypeScript config
├── public/                        # favicon.svg, robots.txt, sitemap.xml, og.jpg
└── src/
    ├── main.tsx                   # React root
    ├── App.tsx                    # Layout, active-section tracking, modals
    ├── index.css                  # Tailwind import, fonts, focus/reduced-motion, scrollbar
    ├── types.ts                   # Shared TypeScript interfaces
    ├── vite-env.d.ts              # Vite client types (image imports etc.)
    ├── assets/images/             # Portrait & project screenshots
    ├── data/
    │   └── portfolioData.ts       # ALL editable content lives here
    └── components/
        ├── Navbar.tsx             # Fixed nav + mobile drawer
        ├── Hero.tsx               # Intro / headline section
        ├── TechBand.tsx           # Tech-stack band under the hero
        ├── ServicesSection.tsx    # Services cards
        ├── ProjectsSection.tsx    # Project grid
        ├── ProjectDetailModal.tsx # Case study overlay
        ├── AboutSection.tsx       # Bio + skills
        ├── ContactSection.tsx     # Contact info + form
        ├── Footer.tsx             # Footer links
        └── BackToTop.tsx          # Floating back-to-top button
```

> `SKILL_CATEGORIES`, `WORK_EXPERIENCE`, `EDUCATION` and `TESTIMONIALS` remain in `portfolioData.ts` as content inventory for a future experience section; nothing currently renders them.

---

## Customization

Almost everything on the site is driven by a single data file: `src/data/portfolioData.ts`.

| What you want to change | Where |
| --- | --- |
| Name, role, email, socials, bio, stats | `PERSONAL_INFO` |
| Service cards | `SERVICES` |
| Hero tech logos | `CLIENT_LOGOS` |
| Projects / case studies | `PROJECTS` |
| Skills breakdown | `SKILL_CATEGORIES` |
| Work history | `WORK_EXPERIENCE` |
| Education | `EDUCATION` |
| Testimonials | `TESTIMONIALS` |

New projects must match the `Project` interface in `src/types.ts`.
Images live in `src/assets/images/` and are imported as modules (so they are hashed and bundled correctly in production builds).

### Theme

Colors are used inline via Tailwind arbitrary values:

- Background: `#080808`
- Primary text: `#ECE5DA`
- Accent (buttons/highlights): `#E8DEC8`

Fonts (loaded in `index.html` from Google Fonts): Instrument Serif, Cormorant Garamond, Plus Jakarta Sans, JetBrains Mono.

---

## Building for Production

```bash
npm run build
```

Outputs a static site to `dist/`, deployable to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).
