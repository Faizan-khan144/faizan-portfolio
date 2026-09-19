import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { skillCategories } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">03</span>
            <span className="h-px w-10 bg-line"></span>
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">Tech Stack</h2>
              <p className="mt-1 text-sm text-white/50">Tools I use to create.</p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.num} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="glass h-full rounded-3xl p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="font-mono text-sm text-white/40">{cat.num}</span>
                    <h3 className="text-lg font-bold">{cat.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {cat.items.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between rounded-xl border border-line bg-bg/40 px-4 py-3 transition-colors duration-200 hover:border-accent/50"
                      >
                        <span className="font-medium">{skill.name}</span>
                        <span className="font-mono text-xs text-white/40">{skill.kind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}