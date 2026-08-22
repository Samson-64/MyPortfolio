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

- **Scroll progress bar** — slim animated bar fixed at the top of the page.
- **Smart navbar** — transparent-to-solid on scroll, tracks the active section while scrolling, full mobile drawer menu.
- **Hero section** — portrait with vignette blend, serif editorial headline, staggered tech-stack entrance.
- **Services** — three service cards with blur-in stagger animation.
- **Selected Work** — project cards that open an **interactive case study modal** (problem, role, architecture, code snippet with copy button, tech chips, live/GitHub links).
- **About** — bio, core skills matrix, and experience timeline.
- **Contact** — copy-email-to-clipboard button, social links, and a validated form with a confetti celebration on submit.
- **Resume modal** — printable CV view plus a plain-text `.txt` download generated on the fly.
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

> No environment variables are required — all content is static data inside the repo.

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
├── index.html                     # Entry HTML (fonts + meta tags)
├── vite.config.ts                 # Vite config (React, Tailwind, @ alias)
├── tsconfig.json                  # Strict TypeScript config
└── src/
    ├── main.tsx                   # React root
    ├── App.tsx                    # Layout, active-section tracking, modals
    ├── index.css                  # Tailwind import, fonts, scrollbar styling
    ├── types.ts                   # Shared TypeScript interfaces
    ├── vite-env.d.ts              # Vite client types (image imports etc.)
    ├── assets/images/             # Portrait & project screenshots
    ├── data/
    │   └── portfolioData.ts       # ALL editable content lives here
    └── components/
        ├── Navbar.tsx             # Fixed nav + mobile drawer
        ├── Hero.tsx               # Intro / headline section
        ├── ServicesSection.tsx    # Services cards
        ├── ProjectsSection.tsx    # Project grid
        ├── ProjectDetailModal.tsx # Case study overlay
        ├── AboutSection.tsx       # Bio + skills + experience list
        ├── ContactSection.tsx     # Contact info + form
        ├── Footer.tsx             # Footer links
        ├── BackToTop.tsx          # Floating back-to-top button
        └── ResumeModal.tsx        # CV viewer (print / download)
```

> `SkillsSection.tsx` and `ExperienceSection.tsx` also exist as ready-made components but are not currently rendered in `App.tsx`.

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
