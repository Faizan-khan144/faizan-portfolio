import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function TiltCard({
  children,
  className = '',
  max = 7,
  glare = true,
  whileHover = true,
}) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const reduce = useReducedMotion()

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 160, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 160, damping: 18 })
  const glareX = useTransform(mx, [-0.5, 0.5], ['-30%', '130%'])
  const glareY = useTransform(my, [-0.5, 0.5], ['-30%', '130%'])
  const glareBg = useMotionTemplate`radial-gradient(260px circle at ${glareX} ${glareY}, rgb(var(--color-accent) / 0.12), transparent 60%)`

  function onPointerMove(e) {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onPointerLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={whileHover ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}