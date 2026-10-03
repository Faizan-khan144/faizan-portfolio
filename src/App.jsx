import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import BackToTop from './components/BackToTop'
import Assistant from './components/Assistant'
import CursorGlow from './components/CursorGlow'
import ScrollToTop from './components/ScrollToTop'
import MascotInteractive from './components/MascotInteractive'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Skills = lazy(() => import('./pages/Skills'))
const Journey = lazy(() => import('./pages/Journey'))
const Contact = lazy(() => import('./pages/Contact'))
const AiAssistant = lazy(() => import('./pages/AiAssistant'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Ambient() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 240])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.9, 0.5])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ y: y1, opacity }}
        className="animate-drift-one absolute -right-40 top-[-12%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(var(--color-accent)_/_0.1),transparent_62%)]"
      />
      <motion.div
        style={{ y: y2 }}
        className="animate-drift-two absolute -left-52 top-[38%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,_/_0.08),transparent_62%)]"
      />
    </div>
  )
}

function RouteLoading() {
  return (
    <div
      className="flex min-h-[70vh] flex-col items-center justify-center gap-4"
      role="status"
      aria-label="Loading page"
    >
      <motion.div
        initial={{ y: -220, opacity: 0, rotate: -10 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 12, mass: 0.9 }}
      >
        <MascotInteractive size={72} interactive />
      </motion.div>
      <span className="font-mono text-xs uppercase tracking-wide2 text-muted">Loading</span>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col">
        <Ambient />
        <CursorGlow />
        <Loader />
        <ScrollToTop />
        <Navbar />
        <main id="main-content" className="relative z-10 flex-1">
          <Suspense fallback={<RouteLoading />}>
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ai" element={<AiAssistant />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
        <Assistant />
      </div>
    </MotionConfig>
  )
}