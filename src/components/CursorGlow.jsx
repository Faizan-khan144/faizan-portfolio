import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const rx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 120, damping: 22, mass: 0.5 })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return undefined
    function onMove(e) {
      x.set(e.clientX - 200)
      y.set(e.clientY - 200)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <motion.div
      style={{ x: rx, y: ry }}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[400px] w-[400px] rounded-full opacity-60"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(var(--color-accent)_/_0.07),transparent_60%)]"
        aria-hidden="true"
      ></div>
    </motion.div>
  )
}