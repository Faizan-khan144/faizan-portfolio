import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { IconMenu, IconClose, IconArrow } from './Icons'
import Brand from './Brand'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/journey', label: 'Journey' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to main content
      </a>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
        aria-hidden="true"
      ></motion.div>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? 'border-b border-line bg-bg/85 shadow-card backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-[4.5rem] items-center justify-between" aria-label="Main">
          <Link to="/" className="group flex items-center gap-3" aria-label="Faizan Khan - home">
            <Brand className="text-lg" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-muted hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span
                          className="absolute -bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 bg-accent"
                          aria-hidden="true"
                        ></span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/contact"
              className="btn-base hidden bg-accent text-accent-ink hover:bg-accent/90 lg:inline-flex"
            >
              Let's talk
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink lg:hidden"
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
            open ? 'max-h-[calc(100vh-4.5rem)]' : 'max-h-0'
          }`}
        >
          <div className="container-x flex flex-col gap-1 py-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 font-display text-xl font-medium transition-colors ${
                    isActive ? 'bg-surface text-accent' : 'text-ink hover:bg-surface'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center gap-2">
              <ThemeToggle />
              <Link
                to="/contact"
                className="btn-base flex-1 bg-accent text-accent-ink hover:bg-accent/90"
              >
                Let's talk
                <IconArrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}