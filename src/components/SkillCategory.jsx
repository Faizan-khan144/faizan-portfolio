import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

export default function SkillCategory({ category, index = 0 }) {
  return (
    <TiltCard className="h-full flex-col rounded-[1.1rem] border border-line/10 bg-surface p-6 shadow-card transition-shadow duration-300 hover:border-accent/40 hover:shadow-card-hover">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.65rem] tracking-wide2 text-accent">{category.num}</span>
        <span className="font-mono text-[0.65rem] uppercase tracking-wide2 text-muted">
          {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{category.label}</h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{category.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, y: 8, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.04 * i, ease: 'easeOut' }}
          >
            <span className="chip">{skill}</span>
          </motion.li>
        ))}
      </ul>
    </TiltCard>
  )
}