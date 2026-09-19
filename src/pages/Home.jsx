import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import { selectedProjects } from '../data'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <section id="work" className="py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-accent">01</span>
                  <span className="h-px w-10 bg-line"></span>
                  <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                    Featured
                  </span>
                </div>
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Selected <span className="text-gradient">Work</span>
                </h2>
              </div>
              <Link
                to="/projects"
                className="group hidden items-center gap-2 text-sm text-white/50 transition-colors hover:text-cyan md:inline-flex"
              >
                All Projects{' '}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &#8594;
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {selectedProjects.slice(0, 4).map((project, i) => (
              <Reveal key={project.num} delay={(i % 2) * 0.1}>
                <TiltCard className="h-full">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass group relative block h-full overflow-hidden rounded-3xl p-8 transition-colors duration-300 hover:border-accent/50 md:p-10"
                  >
                    <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-sm text-white/40">{project.num}</span>
                      <span className="rounded-full border border-line bg-white/5 px-3 py-1 font-mono text-[10px] tracking-widest text-cyan">
                        {project.tag}
                      </span>
                    </div>
                    <h3 className="mt-14 text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                      {project.text}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent">
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

          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-9 py-4 text-sm font-medium text-white/80 transition-all duration-200 hover:border-accent hover:text-accent"
              >
                Explore All Projects{' '}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &#8594;
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}