import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { IconArrow } from './Icons'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line/15 bg-bg text-ink shadow-card transition-colors hover:border-accent/60 hover:text-accent"
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
            <motion.circle
              cx="20"
              cy="20"
              r="17"
              fill="none"
              stroke="rgb(var(--color-accent))"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <IconArrow className="h-4 w-4 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}