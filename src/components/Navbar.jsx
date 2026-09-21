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
import Magnetic from './Magnetic'

const links = [
  { to: '/projects', label: 'Work' },
  { to: '/skills', label: 'Skills' },
  { to: '/journey', label: 'Journey' },
  { to: '/ai', label: 'AI' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const scale = useSpring(1, { stiffness: 260, damping: 24 })
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 12)
  })

  useEffect(() => {
    scale.set(scrolled ? 0.97 : 1)
  }, [scrolled, scale])

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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to main content
      </a>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-3 sm:pt-4"
      >
        <motion.nav
          style={{ scale }}
          animate={{ opacity: 1 }}
          aria-label="Main"
          className={`relative overflow-hidden rounded-full border transition-colors duration-300 ${
            scrolled
              ? 'border-line/15 bg-bg/85 shadow-card backdrop-blur-2xl'
              : 'border-line/10 bg-bg/60 backdrop-blur-xl'
          }`}
        >
          <motion.div
            style={{ scaleX: progress }}
            className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[#52b788] to-sky-500"
            aria-hidden="true"
          ></motion.div>

          <div className="flex items-center gap-1 px-2 py-2 sm:gap-2 sm:px-2.5">
            <Link to="/" className="group relative flex items-center gap-1 rounded-full" aria-label="Faizan Khan - home">
              <span className="font-display text-lg font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                <span className="text-accent">F</span>aizan
              </span>
              <span
                className="h-[0.9em] w-[2.5px] rounded-full bg-accent cursor-blink"
                aria-hidden="true"
              ></span>
            </Link>

            <span className="mx-1 h-4 w-px bg-line/15" aria-hidden="true"></span>

            <ul className="hidden items-center lg:flex">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10 flex items-center gap-1.5">
                          {link.label}
                          {link.label === 'AI' && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span
                                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60"
                                aria-hidden="true"
                              ></span>
                              <span
                                className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"
                                aria-hidden="true"
                              ></span>
                            </span>
                          )}
                        </span>
                        <span
                          className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-accent transition-transform duration-300 ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                          aria-hidden="true"
                        ></span>
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                            aria-hidden="true"
                          ></motion.span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <span className="mx-1 hidden h-4 w-px bg-line/15 lg:block" aria-hidden="true"></span>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <Magnetic strength={0.4}>
                <Link
                  to="/contact"
                  className="btn-shine btn-glow hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-colors duration-300 hover:bg-ink hover:text-bg sm:inline-flex"
                >
                  Let's talk
                </Link>
              </Magnetic>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-accent lg:hidden"
              >
                {open ? <IconClose /> : <IconMenu />}
              </button>
            </div>
          </div>
        </motion.nav>
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] flex flex-col justify-center bg-bg lg:hidden"
          >
            <nav className="container-x flex flex-col" aria-label="Mobile">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.07 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `group flex items-center justify-between border-b border-line/10 py-5 font-display text-4xl font-bold tracking-tight transition-colors ${
                        isActive ? 'text-accent' : 'text-ink hover:text-accent'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-xs font-normal text-muted">
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
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mt-8 flex gap-3"
              >
                <Link
                  to="/contact"
                  className="btn-base flex-1 rounded-full bg-accent text-accent-ink transition-colors hover:bg-ink hover:text-bg"
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