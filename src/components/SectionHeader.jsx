import { motion } from 'framer-motion'

function Word({ children, i }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ y: '110%', opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )
}

export default function SectionHeader({ eyebrow, index, title, description }) {
  const words =
    typeof title === 'string'
      ? title.split(' ').map((word, i) => (
          <Word key={i} i={i}>
            {word}
            {'\u00A0'}
          </Word>
        ))
      : null

  return (
    <div className="mb-12 max-w-2xl">
      <motion.p
        className="eyebrow mb-4 flex items-center gap-3"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {index && <span className="text-accent">{index}</span>}
        {index && <span className="h-px w-8 bg-line" aria-hidden="true"></span>}
        {eyebrow}
      </motion.p>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {words || title}
      </h2>
      {description && (
        <motion.p
          className="mt-4 leading-relaxed text-muted"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}