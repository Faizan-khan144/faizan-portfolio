import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { selectedProjects, moreProjects } from '../data'

const gradientByTag = {
  ECOMMERCE: 'from-[#123f2f] to-[#0b2b20]',
  'FINTECH DASHBOARD': 'from-[#12364a] to-[#0b2233]',
  FINTECH: 'from-[#31306b] to-[#221f4d]',
  'AGENCY WEBSITE': 'from-[#5a2450] to-[#3a1635]',
}

export default function Work() {
  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            num="04"
            label="Work"
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
                className="glass group block overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                <div className="grid md:grid-cols-[1.1fr_1.4fr]">
                  <div
                    className={`relative flex min-h-52 items-center justify-center overflow-hidden bg-gradient-to-br md:min-h-72 ${gradientByTag[project.tag] || gradientByTag['ECOMMERCE']}`}
                  >
                    <span className="font-display text-7xl font-bold text-white/15 transition-transform duration-500 group-hover:scale-110 md:text-9xl">
                      {project.num}
                    </span>
                    <span className="absolute left-5 top-5 font-mono text-xs text-white/60">
                      &gt; ./{project.title.toLowerCase().replace(/\s+/g, '-')}.sh
                    </span>
                    <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-md">
                      {project.tag}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-12">
                    <span className="font-mono text-xs text-accent">
                      $ echo "project {project.num}"
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
          <h3 className="mb-10 mt-20 font-mono text-xs uppercase tracking-[0.3em] text-muted">
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
                className="glass group flex items-center justify-between rounded-2xl p-5 transition-all duration-200 hover:border-accent/50"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-accent">{p.num}</span>
                  <span className="font-mono text-sm font-medium text-ink transition-colors group-hover:text-accent">
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