import Reveal from './Reveal'
import { skillCategories } from '../data'

export default function Skills() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-medium text-accent">03</span>
            <span className="line-h w-12"></span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Stack
            </span>
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Tech stack inventory.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.num} delay={(i % 2) * 0.08}>
              <div className="glass h-full rounded-2xl p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-accent">{cat.num}</span>
                  <span className="font-display text-xl font-semibold">
                    {cat.title}
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
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