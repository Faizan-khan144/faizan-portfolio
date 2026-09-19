import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { experience } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">06</span>
            <span className="h-px w-10 bg-line"></span>
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">Experience</h2>
              <p className="mt-1 text-sm text-white/50">
                Growing through real projects.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="relative mx-auto max-w-3xl space-y-8 pl-8 md:pl-10">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-cyan to-transparent md:left-[15px]"></div>
          {experience.map((exp, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <TiltCard>
                <div className="glass relative rounded-2xl p-6 transition-colors duration-300 hover:border-accent/50">
                  <span className="absolute -left-8 top-7 h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_12px_#7c5cff] md:-left-10"></span>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-cyan/40 px-3 py-1 font-mono text-xs text-cyan">
                      {exp.year}
                    </span>
                    <span className="font-mono text-xs tracking-widest text-white/40">
                      {exp.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{exp.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{exp.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-transparent to-cyan/10 p-8 md:p-12">
            <h3 className="text-xl font-bold md:text-2xl">Currently Exploring</h3>
            <p className="mt-1 text-sm text-white/50">
              Always learning. Always building.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
              My goal is to keep expanding beyond frontend development while
              building strong practical experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {['MERN Stack', 'Python', 'Data Analysis'].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-cyan"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}