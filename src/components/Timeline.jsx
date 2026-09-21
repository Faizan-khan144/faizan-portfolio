import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import TiltCard from './TiltCard'

export default function Timeline({ items }) {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 70%', 'end 55%'],
  })
  const fillScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <ol ref={listRef} className="relative border-l border-line pl-8 sm:pl-10">
      <motion.span
        style={{ scaleY: fillScale }}
        className="absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/70 to-transparent"
        aria-hidden="true"
      ></motion.span>

      {items.map((item, i) => (
        <li key={item.title} className="relative pb-12 last:pb-0">
          <span
            className="group absolute -left-[37px] top-1.5 flex h-3 w-3 items-center justify-center sm:-left-[45px]"
            aria-hidden="true"
          >
            <span className="absolute h-3 w-3 rounded-full border border-accent bg-bg transition-transform duration-300 group-hover:scale-150"></span>
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 260, damping: 18 }}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent"
            ></motion.span>
          </span>

          <TiltCard
            max={5}
            whileHover={false}
            className="rounded-xl border border-line/15 bg-surface p-5 shadow-card transition-colors duration-300 hover:border-accent/40"
          >
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-xs text-accent">{item.period}</span>
              <span className="h-1 w-1 rounded-full bg-muted" aria-hidden="true"></span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wide2 text-muted">
                {item.type}
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{item.text}</p>
          </TiltCard>
        </li>
      ))}
    </ol>
  )
}