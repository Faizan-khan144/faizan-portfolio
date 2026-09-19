import { navLinks } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white/60 backdrop-blur-md">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <a href="#top" className="font-display text-lg font-bold">
          Faizan<span className="text-accent">.</span>
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

        <p className="font-mono text-xs text-muted">
          © 2026 Faizan Khan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}