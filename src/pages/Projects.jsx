import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import Parallax from '../components/Parallax'
import Button from '../components/Button'
import ProjectCard from '../components/ProjectCard'
import { projects, projectCategories } from '../data/projects'
import { profile } from '../data/profile'

export default function Projects() {
  const [active, setActive] = useState('All')

  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <PageTransition>
      <Seo
        title="Projects - Faizan Khan"
        description="A selection of projects built by Faizan Khan - school platforms, developer tools, dashboards, websites, games and Python utilities."
        path="/projects"
      />

      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 lg:pt-48 lg:pb-20">
        <Parallax
          from={-30}
          to={30}
          className="pointer-events-none absolute right-4 top-8 hidden select-none font-display text-[13rem] font-extrabold leading-none tracking-tighter text-ink/[0.035] lg:block"
          aria-hidden="true"
        >
          WORK
        </Parallax>
        <Container className="relative">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="text-accent">02</span>
              <span className="h-px w-8 bg-line" aria-hidden="true"></span>
              Projects
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Work built to <span className="text-accent-serif">be used.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Every project below is real, public and shipped - from school platforms and
              developer tools to dashboards, websites, games and a Python utility. All code is on
              my GitHub.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-12 lg:py-16">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={active === category}
                  className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-200 ${
                    active === category
                      ? 'border-accent bg-accent text-accent-ink'
                      : 'border-line text-muted hover:border-accent/50 hover:text-ink'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-6 font-mono text-xs text-muted">
              Showing {visible.length} of {projects.length} projects
            </p>
          </Reveal>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              layout
              className="mt-8 grid gap-6 sm:grid-cols-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {visible.map((project, i) => (
                <motion.div layout key={project.id} exit={{ opacity: 0, scale: 0.95 }}>
                  <Reveal delay={i * 0.05}>
                    <ProjectCard project={project} index={i} />
                  </Reveal>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal>
            <div className="mt-16 rounded-lg border border-line bg-surface p-8 text-center">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Want to see the code behind these?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Every project lives on my GitHub, including experiments and smaller utilities.
              </p>
              <Button
                href={profile.github}
                variant="ghost"
                withArrow
                className="mt-6"
              >
                Visit my GitHub
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  )
}