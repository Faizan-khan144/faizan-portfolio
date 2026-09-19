import { navLinks, socials } from '../data'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="pointer-events-none select-none whitespace-nowrap font-mono text-[13vw] font-bold leading-none text-white/[0.04] md:text-[16vw]">
        FAIZAN KHAN
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <a href="#top" className="font-mono text-sm text-muted">
          <span className="text-accent">faizan@dev</span>:
          <span className="text-cyan">~</span>$
        </a>

        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 bg-bg/60 py-5 text-center font-mono text-xs text-muted">
        © 2026 Faizan Khan — Built with React, Tailwind & Three.js
      </div>
    </footer>
  )
}