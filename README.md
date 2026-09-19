# Faizan Khan — Portfolio

**Frontend Developer** building responsive, modern and user-friendly websites with clean code and thoughtful interfaces.

## Live

- **Vercel:** https://faizan-portfolio-kappa.vercel.app/
- **Repository:** https://github.com/Faizan-khan144/faizan-portfolio

## Stack

- React 18
- Vite
- Tailwind CSS 3
- Three.js (WebGL 3D background)
- Framer Motion (animations)

## Features

- Single-page layout: Hero, About, Skills, Selected Work, Experience, Stats, Contact
- Light theme with a soft, animated Three.js scene (floating geometrical shapes, particles, mouse parallax) — no character
- Scroll-reveal animations, numbered editorial sections
- Front-end only — no backend

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
├── src/
│   ├── App.jsx           # single-page composition
│   ├── data.js           # all content
│   └── components/       # Navbar, Hero, SceneBackground, sections…
```

## Deployment

Push to `main` and Vercel auto-deploys (framework preset: Vite, output: `dist`).

© 2026 Faizan Khan