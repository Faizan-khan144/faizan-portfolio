import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion'
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
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(latest > 8)
    setHidden(latest > prev && latest > 140 && !open)
  })

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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to main content
      </a>

      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent"
        aria-hidden="true"
      ></motion.div>

      <motion.header
        animate={{ y: hidden ? '-110%' : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
          scrolled || open
            ? 'border-b border-line bg-bg/85 shadow-card backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-[4.5rem] items-center justify-between" aria-label="Main">
          <Link to="/" className="group relative z-[65] flex items-center gap-3" aria-label="Faizan Khan - home">
            <Brand className="text-lg" />
            <span
              className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
              aria-hidden="true"
            ></span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `group relative inline-flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-muted hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-0.5 left-3 h-px origin-left bg-accent transition-transform duration-300 ${
                          isActive ? 'w-5 scale-x-100' : 'w-5 scale-x-0 group-hover:scale-x-100'
                        }`}
                      ></span>
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
              className="btn-base group hidden overflow-hidden border border-accent bg-accent text-accent-ink transition-all duration-300 hover:bg-accent-ink hover:text-accent lg:inline-flex"
            >
              Let's talk
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-[65] flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink transition-colors hover:border-accent/60 hover:text-accent lg:hidden"
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex flex-col justify-center bg-bg lg:hidden"
          >
            <div
              className="scanlines pointer-events-none absolute inset-0"
              aria-hidden="true"
            ></div>
            <nav className="container-x relative flex flex-col gap-1" aria-label="Mobile">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `group flex items-center justify-between border-b border-line py-5 font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl ${
                        isActive ? 'text-accent' : 'text-ink hover:text-accent'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-muted">
                            0{i + 1}
                          </span>
                          {link.label}
                        </span>
                        <IconArrow
                          className={`h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5 ${
                            isActive ? 'text-accent' : 'text-muted'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.35 }}
                className="mt-8 flex gap-3"
              >
                <ThemeToggle />
                <Link
                  to="/contact"
                  className="btn-base flex-1 border border-accent bg-accent text-accent-ink transition-colors hover:bg-accent-ink hover:text-accent"
                >
                  Let's talk
                  <IconArrow className="h-4 w-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}