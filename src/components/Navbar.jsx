import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { navLinks } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-bg/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          Faizan<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative text-sm transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-white/60 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium transition-all duration-200 hover:border-accent hover:text-accent"
          >
            Let's Talk <span className="inline-block">&#8599;</span>
          </Link>
        </div>

        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex h-screen flex-col items-center justify-center gap-5 bg-bg/95 backdrop-blur-xl lg:hidden">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-semibold transition-colors ${
                  isActive ? 'text-accent' : 'text-white/80 hover:text-accent'
                }`
              }
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 rounded-full border border-accent px-8 py-3 text-accent"
          >
            Let's Talk <span>&#8599;</span>
          </Link>
        </div>
      )}
    </header>
  )
}