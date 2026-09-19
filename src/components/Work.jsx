import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { selectedProjects, moreProjects } from '../data'

const gradientByTag = {
  ECOMMERCE: 'from-[#cdd0ff] to-[#bdece2]',
  'FINTECH DASHBOARD': 'from-[#d0e8ff] to-[#ffd6e4]',
  FINTECH: 'from-[#ffe3c2] to-[#cdd0ff]',
  'AGENCY WEBSITE': 'from-[#bdece2] to-[#d0e8ff]',
}

export default function Work() {
  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            num="03"
            label="Selected Work"
            title="Things I've built, shipped and learned from."
          />
        </Reveal>

        <div className="flex flex-col gap-6">
          {selectedProjects.map((project) => (
            <Reveal key={project.num}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group block overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
              >
                <div className="grid md:grid-cols-[1.1fr_1.4fr]">
                  <div
                    className={`relative flex min-h-52 items-center justify-center overflow-hidden bg-gradient-to-br md:min-h-72 ${gradientByTag[project.tag] || gradientByTag['ECOMMERCE']}`}
                  >
                    <span className="font-display text-7xl font-bold text-ink/70 transition-transform duration-500 group-hover:scale-110 md:text-9xl">
                      {project.num}
                    </span>
                    <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink backdrop-blur-md">
                      {project.tag}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-12">
                    <span className="font-mono text-sm text-accent">
                      PROJECT {project.num}
                    </span>
                    <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                      {project.text}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-8 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors group-hover:text-accent">
                      Visit Project{' '}
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        &#8599;
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mt-20 mb-10 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            More Experiments
          </h3>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((p) => (
            <Reveal key={p.num}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center justify-between rounded-2xl p-5 transition-all duration-200 hover:border-accent hover:bg-white"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-accent">{p.num}</span>
                  <span className="font-medium text-ink transition-colors group-hover:text-accent">
                    {p.name}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {p.label} &#8599;
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}