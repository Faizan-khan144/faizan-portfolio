import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)', scale: 0.99 }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}