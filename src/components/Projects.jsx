import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { selectedProjects, moreProjects } from '../data'

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">05</span>
            <span className="h-px w-10 bg-line"></span>
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">Selected Projects</h2>
              <p className="mt-1 text-sm text-white/50">Some things I've built.</p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {selectedProjects.map((project, i) => (
            <Reveal key={project.num} delay={(i % 2) * 0.1}>
              <TiltCard className="h-full">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group relative block h-full overflow-hidden rounded-3xl p-8 transition-colors duration-300 hover:border-accent/50"
                >
                  <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm text-white/40">{project.num}</span>
                    <span className="rounded-full border border-line bg-white/5 px-3 py-1 font-mono text-[10px] tracking-widest text-cyan">
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="mt-12 text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{project.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    View Project{' '}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      &#8599;
                    </span>
                  </span>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 rounded-3xl glass p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">More Work</h3>
                <p className="mt-1 text-sm text-white/50">Explore more projects</p>
              </div>
            </div>
            <ul className="mt-6 divide-y divide-line">
              {moreProjects.map((project) => (
                <li key={project.num}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 transition-all duration-200 hover:pl-2"
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-xs text-white/40">{project.num}</span>
                      <span className="font-medium transition-colors group-hover:text-accent">
                        {project.name}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-sm text-white/50 transition-colors group-hover:text-cyan">
                      {project.label}{' '}
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        &#8599;
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}