import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { experience } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            num="04"
            label="Experience"
            title="My path so far, one project at a time."
          />
        </Reveal>

        <div className="flex flex-col">
          {experience.map((exp, i) => (
            <Reveal key={exp.title} delay={i * 0.06}>
              <div className="group relative flex flex-col gap-3 border-l-2 border-line py-8 pl-8 transition-colors hover:border-accent md:flex-row md:items-start md:gap-12">
                <div className="absolute -left-[5px] top-10 h-2 w-2 rounded-full bg-ink transition-colors group-hover:bg-accent"></div>
                <div className="shrink-0 md:w-48 md:pt-1">
                  <span className="font-mono text-sm font-medium text-accent">
                    {exp.year}
                  </span>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                    {exp.type}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold md:text-3xl">
                    {exp.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted md:text-lg">
                    {exp.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}