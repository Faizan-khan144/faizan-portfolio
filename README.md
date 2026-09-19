# Faizan Khan — 3D Portfolio

**Frontend Developer** building responsive, modern and user-friendly websites with clean code and thoughtful interfaces.

## Live

- **Vercel:** https://faizan-portfolio-kappa.vercel.app/
- **GitHub Pages:** https://faizan-khan144.github.io/faizan-portfolio/
- **Repository:** https://github.com/Faizan-khan144/faizan-portfolio

## Stack

- React 18
- Vite
- Tailwind CSS 3
- Three.js (WebGL 3D background + interactive hero character)
- Framer Motion (animations)
- React Router (multi-page)

## Features

- Multi-page layout: Home, About, Services, Projects, Experience, Contact
- Interactive Three.js background scene (floating geometrical shapes, particles, mouse parallax)
- **Interactive 3D character** in the hero — tracks your cursor, blinks, idle animation
- 3D tilt cards, scroll-reveal animations, glassmorphism UI
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
│   ├── App.jsx           # router setup
│   ├── data.js           # all content
│   ├── components/       # Navbar, Hero, HeroCharacter, SceneBackground, sections…
│   └── pages/            # Home, About, Services, Projects, Experience, Contact
```

## Deployment

Push to `main` and Vercel auto-deploys (framework preset: Vite, output: `dist`). The `vercel.json` rewrites ensure SPA routing works for every path.

© 2026 Faizan Khan