import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import BackToTop from './components/BackToTop'
import Assistant from './components/Assistant'
import CursorGlow from './components/CursorGlow'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Journey from './pages/Journey'
import Contact from './pages/Contact'
import AiAssistant from './pages/AiAssistant'
import NotFound from './pages/NotFound'

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
        </main>
        <Footer />
        <BackToTop />
        <Assistant />
      </div>
    </MotionConfig>
  )
}