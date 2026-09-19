import { useEffect, useState } from 'react'
import { navLinks } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      const ids = ['about', 'skills', 'work', 'experience', 'contact']
      let current = ''
      for (const id of ids) {
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
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between py-4 md:py-5">
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight md:text-2xl"
        >
          Faizan<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`text-sm font-medium transition-colors ${
                  active === link.id ? 'text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
            >
              Let's Talk
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
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-display text-xl font-bold">
            Faizan<span className="text-accent">.</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-xs tracking-widest text-muted"
            aria-label="Close menu"
          >
            CLOSE &#10005;
          </button>
        </div>
        <ul className="mt-10 flex flex-col gap-2 px-5">
          {navLinks.map((link, i) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-4 py-3"
              >
                <span className="font-mono text-xs text-accent">
                  0{i + 1}
                </span>
                <span className="font-display text-3xl font-semibold text-ink transition-colors group-hover:text-accent">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 px-5">
          <a
            href="mailto:muhammadfaizankhan525@gmail.com"
            className="block rounded-full bg-ink px-6 py-4 text-center font-medium text-white"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  )
}