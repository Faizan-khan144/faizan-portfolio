import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Parallax({ children, from = 0, to = -50, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [from, to])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}