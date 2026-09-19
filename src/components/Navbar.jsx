import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      let current = ''
      for (const id of ['about', 'skills', 'work', 'experience', 'contact']) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-bg/80 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between py-4">
        <a href="#top" className="font-mono text-sm text-muted">
          <span className="text-accent">faizan@dev</span>:
          <span className="text-cyan">~</span>$
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === link.id
                    ? 'text-accent'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              Hire Me
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          ></span>
          <span className={`h-0.5 w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`}></span>
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          ></span>
        </button>

        <span className="hidden font-mono text-xs text-muted xl:inline">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-accent"></span>
          {profile.status}
        </span>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-0 z-50 bg-bg transition-all duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="container-x flex items-center justify-between py-4">
          <span className="font-mono text-sm text-muted">
            <span className="text-accent">faizan@dev</span>$
          </span>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-xs tracking-widest text-muted"
            aria-label="Close menu"
          >
            CLOSE &#10005;
          </button>
        </div>
        <ul className="mt-10 flex flex-col gap-2 px-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-4 border-b border-white/10 py-4"
              >
                <span className="font-mono text-xs text-accent">#</span>
                <span className="font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 pt-8">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-accent px-6 py-4 text-center font-mono text-sm font-semibold uppercase tracking-widest text-bg"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  )
}