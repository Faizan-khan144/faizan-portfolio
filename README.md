# Faizan Khan - Portfolio

A premium multi-page developer portfolio for **Muhammad Faizan Khan**, built with React, Vite and Tailwind CSS.

## Live

- **Vercel:** https://faizan-portfolio-kappa.vercel.app/
- **Repository:** https://github.com/Faizan-khan144/faizan-portfolio

## Stack

- React 18
- React Router 7 (multi-page routing)
- Tailwind CSS 3
- Framer Motion (page transitions, scroll reveals)
- Vite

## Pages

- **Home** - hero, featured projects, skills preview, about preview, current focus, contact CTA
- **About** - introduction, learning journey, current focus, interests, philosophy
- **Projects** - every public project with category filtering, source and live links
- **Skills** - frontend, backend, database, Python and tools
- **Journey** - timeline of real milestones (projects, internship, MERN learning)
- **Contact** - details plus a form with a mailto fallback (no backend)
- **404** - friendly not-found page

## Details

- Dark, editorial design with a single restrained gold accent
- Fully responsive with dedicated mobile navigation
- Accessibility: semantic HTML, skip link, focus states, ARIA attributes, `prefers-reduced-motion` support
- SEO: per-page titles, meta descriptions, Open Graph tags, favicon

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the build
```

## Project Structure

```
├── index.html
├── vercel.json
├── vite.config.js
├── tailwind.config.js
└── src/
    ├── App.jsx           # routing + layout
    ├── main.jsx          # entry point
    ├── index.css         # base styles and utilities
    ├── components/       # Navbar, Footer, ProjectCard, Timeline, etc.
    ├── data/             # profile, projects, skills, journey
    └── pages/            # Home, About, Projects, Skills, Journey, Contact, 404
```

## Deployment

Push to `main` and Vercel auto-deploys (framework preset: Vite, output: `dist`).

© 2026 Faizan Khan