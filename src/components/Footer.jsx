import { navLinks } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <a href="#home" className="text-xl font-extrabold tracking-tight">
              Faizan<span className="text-accent">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-white/50">
              Frontend Developer building modern web experiences.
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-5">
            {navLinks.slice(0, 5).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <span className="font-mono text-xs text-white/40">
            &copy; 2026 Faizan Khan
          </span>
          <a
            href="#home"
            className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            Back to top{' '}
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
              &#8593;
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}