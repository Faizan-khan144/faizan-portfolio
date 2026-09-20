import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'
import SocialLinks from '../components/SocialLinks'
import GoToLink from '../components/GoToLink'
import { profile } from '../data/profile'
import { featuredProjects, getProject } from '../data/projects'
import { skillCategories } from '../data/skills'
import { IconArrow, IconMapPin } from '../components/Icons'

const stack = ['React', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Python']

function Hero() {
  const reduce = useReducedMotion()
  const fade = reduce ? {} : { initial: { opacity: 0, y: 24 } }

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-48 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,rgba(217,168,91,0.06),transparent_60%)]"
        aria-hidden="true"
      ></div>

      <Container className="relative grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <motion.p {...fade} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="eyebrow">
            <span className="mr-3 inline-block h-2 w-2 rounded-full bg-accent align-middle" aria-hidden="true"></span>
            Available for opportunities
          </motion.p>

          <motion.h1
            {...fade}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Frontend developer building{' '}
            <span className="text-accent-serif">fast, considered</span>
            <br className="hidden sm:block" /> interfaces for the web.
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            I'm Faizan, a frontend developer from Karachi. I build responsive, modern and
            user-focused experiences with clean code and thoughtful design - and I'm currently
            learning the MERN stack.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button to="/projects" withArrow>
              View projects
            </Button>
            <Button to="/contact" variant="ghost">
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ duration: 0.55, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <p className="eyebrow mb-3">Main technologies</p>
            <ul className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <li key={item}>
                  <span className="chip">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.aside
          {...fade}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pt-4"
        >
          <div className="rounded-lg border border-line bg-surface">
            <div className="border-b border-line p-6">
              <span className="font-serif text-6xl italic leading-none text-accent" aria-hidden="true">
                K.
              </span>
              <p className="mt-4 font-display text-xl font-semibold tracking-tight">{profile.name}</p>
              <p className="mt-1 text-sm text-muted">
                {profile.role} · <span className="text-ink/70">MERN Stack Learner</span>
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
                <IconMapPin className="h-4 w-4 text-accent" />
                {profile.location}
              </p>
            </div>

            <dl className="grid grid-cols-3 divide-x divide-line border-b border-line">
              {profile.facts.map((fact) => (
                <div key={fact.label} className="px-4 py-4 text-center">
                  <dt className="order-2 mt-1 block text-[0.65rem] uppercase tracking-wide2 text-muted">
                    {fact.label}
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-accent">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="p-6">
              <p className="eyebrow mb-3">Find me on</p>
              <SocialLinks />
            </div>
          </div>
        </motion.aside>
      </Container>
    </section>
  )
}

export default function Home() {
  const featured = featuredProjects.map(getProject)

  return (
    <PageTransition>
      <Seo
        title="Muhammad Faizan Khan - Frontend Developer"
        description="Frontend developer based in Karachi, Pakistan. Building responsive, modern web interfaces with React, JavaScript and Tailwind CSS. Currently learning the MERN stack."
      />

      <Hero />

      <section className="border-t border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeader
                eyebrow="Selected work"
                index="01"
                title="Featured projects"
                description="Recent work across dashboards, platforms and developer tools - built with React, Tailwind CSS and vanilla JavaScript."
              />
              <GoToLink to="/projects" label="View all projects" className="mb-12" />
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {featured.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="What I work with"
              index="02"
              title="Skills preview"
              description="Frontend-first, moving toward the full MERN stack - plus Python and everyday developer tooling."
            />
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {skillCategories.map((category, i) => (
              <Reveal key={category.id} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col bg-surface p-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-wide2 text-accent">
                    {category.num}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold">{category.label}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <li key={skill}>
                        <span className="inline-flex rounded border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-[0.65rem] text-ink/70">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8">
              <GoToLink to="/skills" label="Explore the full skills page" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow mb-4 flex items-center gap-3">
                <span className="text-accent">03</span>
                <span className="h-px w-8 bg-line" aria-hidden="true"></span>
                About
              </p>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                A developer who <span className="text-accent-serif">learns by building</span>.
              </h2>
              <div className="mt-5 max-w-xl space-y-4 text-muted">
                <p>
                  I'm a frontend developer focused on building responsive, modern and
                  user-friendly websites with clean code and thoughtful interfaces.
                </p>
                <p>
                  My work spans ecommerce stores, fintech dashboards, banking sites, agency
                  websites, developer tools and interactive JavaScript projects - each designed to
                  feel fast, polished and intentional.
                </p>
              </div>
              <div className="mt-8">
                <GoToLink to="/about" label="More about me" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
              <p className="eyebrow mb-3">Current focus</p>
              <h3 className="font-display text-xl font-semibold leading-snug tracking-tight">
                Learning the MERN stack
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{profile.currentFocus}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {['Node.js', 'Express.js', 'MongoDB'].map((item) => (
                  <li key={item}>
                    <span className="chip">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 font-mono text-xs text-muted">
                {profile.array}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg border border-accent/25 bg-surface p-8 sm:flex-row sm:items-center sm:p-12">
              <div className="max-w-xl">
                <p className="eyebrow mb-3">Contact</p>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Have a project in mind? <span className="text-accent-serif">Let's talk.</span>
                </h2>
                <p className="mt-3 text-muted">
                  Open to opportunities, collaborations and interesting ideas. I usually reply
                  within a day.
                </p>
              </div>
              <Button to="/contact" withArrow className="shrink-0">
                Start a conversation
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  )
}