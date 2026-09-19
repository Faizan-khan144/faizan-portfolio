import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { skillCategories } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-36">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            num="02"
            label="Skills & Stack"
            title="My toolkit for building on the web."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.num} delay={(i % 2) * 0.08}>
              <div className="glass h-full rounded-2xl p-7 md:p-9">
                <div className="mb-7 flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-accent">
                    {cat.num}
                  </span>
                  <span className="font-display text-xl font-semibold md:text-2xl">
                    {cat.title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line bg-white px-4 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}