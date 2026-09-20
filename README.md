# Faizan Khan - Portfolio

A premium multi-page developer portfolio for **Muhammad Faizan Khan** — frontend developer based in Karachi, Pakistan. Built with React, Vite and Tailwind CSS.

<p>
  <a href="https://faizan-portfolio-kappa.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20site-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live site" />
  </a>
  <a href="https://github.com/Faizan-khan144/faizan-portfolio">
    <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  </a>
  <a href="https://github.com/Faizan-khan144/faizan-portfolio">
    <img src="https://img.shields.io/badge/Tailwind%20CSS-3-38b2ac?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://github.com/Faizan-khan144/faizan-portfolio">
    <img src="https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </a>
</p>

## Live

- **Vercel:** https://faizan-portfolio-kappa.vercel.app/
- **Repository:** https://github.com/Faizan-khan144/faizan-portfolio

## Stack

- React 18
- React Router (multi-page routing)
- Tailwind CSS 3
- Framer Motion (page transitions, scroll reveals)
- Vite

## Pages

- **Home** — hero, featured projects, skills preview, about preview, experience timeline, contact CTA
- **About** — introduction, learning journey, current focus, interests, philosophy
- **Projects** — every public project with category filtering, source and live links
- **Skills** — frontend, backend, database, Python and tools
- **Journey** — timeline of real milestones (projects, internship, MERN learning)
- **Contact** — details plus a form that delivers straight to Gmail
- **404** — friendly not-found page

## Highlights

- Dark-and-light editorial design with a single restrained accent
- Fully responsive with dedicated mobile navigation
- Accessibility: semantic HTML, skip link, focus-visible rings, ARIA attributes, `prefers-reduced-motion` support
- Performance: production build in Vite, lazy-loaded previews and vectors
- SEO: per-page titles, meta descriptions, canonical URLs, Open Graph + Twitter cards, PWA manifest, custom favicon

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the build
```

## Project Structure

```
├── index.html
├── vercel.json
├── vite.config.js
├── tailwind.config.js
└── src/
    ├── App.jsx            # routing + layout
    ├── main.jsx           # entry point
    ├── index.css          # design tokens, base styles and utilities
    ├── components/        # Navbar, Footer, ProjectCard, BackToTop, ContactForm, etc.
    ├── data/              # profile, projects, skills, journey
    └── pages/             # Home, About, Projects, Skills, Journey, Contact, 404
```

## Deployment

Push to `main` and Vercel auto-deploys (framework preset: Vite, output: `dist`). SPA rewrites handle client-side routing.

---

© 2026 Muhammad Faizan Khan