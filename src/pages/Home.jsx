import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import SocialLinks from '../components/SocialLinks'
import ContactForm from '../components/ContactForm'
import Typewriter from '../components/Typewriter'
import CountUp from '../components/CountUp'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { skillCategories } from '../data/skills'
import { journey } from '../data/journey'
import { IconMail, IconMapPin } from '../components/Icons'

const heroName = ['Muhammad', 'Faizan', 'Khan']
const typingRoles = ['Frontend Developer', 'React Builder', 'JavaScript Engineer', 'MERN Stack Learner']

const filters = ['All', 'Websites', 'Dashboards', 'Platforms', 'Tools']

const techStrip = [
  'React',
  'Tailwind CSS',
  'JavaScript',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Python',
  'Git',
  'GitHub',
  'VS Code',
]

function TechStrip() {
  const Row = () => (
    <div className="flex shrink-0 items-center py-4">
      {techStrip.map((item) => (
        <span key={item} className="mx-6 inline-flex items-center gap-3">
          <span>{item}</span>
          <span className="text-accent" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="overflow-hidden border-y border-line bg-surface/40" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  )
}

function SectionHeader({ num, eyebrow, title, description }) {
  return (
    <div>
      <p className="eyebrow mb-4 flex items-center gap-3">
        <span className="text-accent">{num}</span>
        <span className="h-px w-8 bg-line" aria-hidden="true"></span>
        {eyebrow}
      </p>
      <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 max-w-2xl text-muted">{description}</p>}
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_72%_0%,rgba(var(--color-accent)_/_0.1),transparent_60%)]"
        aria-hidden="true"
      ></div>
      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden="true"></div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-[linear-gradient(rgba(var(--color-ink)_/_0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-ink)_/_0.045)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      ></div>

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-sm border border-line bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wide2 text-ink shadow-card">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              Available for projects
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="eyebrow mt-7">Hi, I'm</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {heroName.map((word, i) => (
                <span
                  key={word}
                  className="inline-block overflow-hidden align-top"
                  aria-hidden="true"
                >
                  <motion.span
                    className={`inline-block ${word === 'Khan' ? 'text-accent' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                  {i < heroName.length - 1 && <span>&nbsp;</span>}
                </span>
              ))}
            </h1>
            <p className="mt-5 h-8 font-mono text-lg font-medium text-accent sm:text-xl">
              <Typewriter words={typingRoles} />
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {profile.heroDescription}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button to="/projects" withArrow>
                View my work
              </Button>
              <Button to="/contact" variant="ghost">
                Get in touch
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 border-t border-line pt-6">
              <p className="eyebrow mb-3">Find me on</p>
              <SocialLinks />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mx-auto w-full max-w-sm">
            <div className="relative rounded-lg border border-line bg-surface p-6 shadow-card">
              <motion.div
                className="absolute -top-4 -right-3 flex items-center gap-2 rounded-sm border border-accent bg-accent-ink px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide2 text-accent shadow-card"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                5+ Years Coding
              </motion.div>
              <div className="flex items-start justify-between gap-4">
                <img
                  src={profile.avatar}
                  alt={`${profile.name} avatar`}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="h-24 w-24 rounded-lg border border-line object-cover"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide2 text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true"></span>
                  Open to work
                </span>
              </div>

              <p className="mt-5 font-display text-xl font-semibold tracking-tight">
                {profile.firstName} Khan
              </p>
              <p className="mt-1 text-sm text-muted">{profile.role}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
                <IconMapPin className="h-4 w-4 text-accent" />
                {profile.location}
              </p>

              <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-md border border-line bg-surface-2">
                {profile.facts.map((fact) => (
                  <div key={fact.label} className="px-3 py-4 text-center">
                    <dd className="font-display text-2xl font-semibold text-accent">
                      <CountUp value={parseInt(fact.value, 10)} />
                      {fact.value.endsWith('+') && (
                        <span className="text-accent" aria-hidden="true">+</span>
                      )}
                    </dd>
                    <dt className="mt-1 block text-[0.6rem] uppercase tracking-wide2 text-muted">
                      {fact.label}
                    </dt>
                  </div>
                ))}
              </dl>

              <a
                href={`mailto:${profile.email}`}
                className="btn-base mt-6 w-full border border-line text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                <IconMail className="h-4 w-4" />
                {profile.email}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function About() {
  return (
    <section className="border-t border-line py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <SectionHeader
            num="01"
            eyebrow="About me"
            title={
              <>
                A frontend developer who builds <span className="text-accent">by doing</span>.
              </>
            }
          />
          <div className="mt-6 space-y-4 text-muted">
            {profile.shortBio.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <p>{profile.currentFocus}</p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {['React', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Python'].map(
              (item) => (
                <li key={item}>
                  <span className="chip">{item}</span>
                </li>
              )
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4">
            <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
              <p className="eyebrow mb-2">Location</p>
              <p className="inline-flex items-center gap-2 text-sm text-ink">
                <IconMapPin className="h-4 w-4 text-accent" />
                {profile.location}
                <span className="text-muted">· Remote friendly</span>
              </p>
            </div>
            <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
              <p className="eyebrow mb-2">Focus</p>
              <p className="text-sm text-ink">Frontend Development · MERN Stack</p>
            </div>
            <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
              <p className="eyebrow mb-2">Education</p>
              <p className="text-sm text-ink">Self-directed, project-based learning</p>
              <p className="mt-1 text-sm text-muted">CodeAlpha frontend internship (2026)</p>
            </div>
            <div className="rounded-lg border border-accent/25 bg-surface p-6 shadow-card">
              <p className="eyebrow mb-2">Availability</p>
              <p className="inline-flex items-center gap-2 text-sm text-ink">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
                {profile.availability}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function Skills() {
  return (
    <section className="border-t border-line py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            num="02"
            eyebrow="Tech stack & skills"
            title={
              <>
                Tools I work with, <span className="text-accent">every day.</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-base font-semibold">{category.label}</h3>
                  <span className="font-mono text-xs text-accent">{category.num}</span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {category.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <li key={skill}>
                      <span className="inline-flex rounded border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.65rem] text-ink/75">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Experience() {
  return (
    <section className="border-t border-line py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            num="03"
            eyebrow="Experience"
            title={
              <>
                The journey <span className="text-accent">so far.</span>
              </>
            }
            description="From first lines of HTML toward the full MERN stack - every step shipped as a real, working project."
          />
        </Reveal>

        <ol className="mt-12 space-y-4">
          {journey.map((item, i) => (
            <Reveal key={item.period + item.title} delay={i * 0.04}>
              <li className="group relative flex flex-col gap-3 rounded-lg border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover sm:flex-row sm:items-center sm:gap-8">
                <div className="sm:w-44 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-wide2 text-accent">
                    {item.period}
                  </span>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wide2 text-muted">
                    {item.type}
                  </p>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const list =
    filter === 'All' ? projects.filter((p) => p.featured) : projects.filter((p) => p.category === filter)

  return (
    <section className="border-t border-line py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              num="04"
              eyebrow="Portfolio"
              title={
                <>
                  Featured <span className="text-accent">projects.</span>
                </>
              }
              description="Real products and experiments I designed, built and shipped - with live demos and open source code."
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {filters.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={filter === tab}
                onClick={() => setFilter(tab)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-200 ${
                  filter === tab
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line bg-surface text-muted hover:border-accent/50 hover:text-accent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.04}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Button to="/projects" variant="ghost" withArrow>
              View all projects
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function Contact() {
  return (
    <section className="border-t border-line py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            num="05"
            eyebrow="Contact"
            title={
              <>
                Let's connect - <span className="text-accent">send me a message.</span>
              </>
            }
            description="Have a project in mind or just want to chat? My inbox is always open. I usually reply within a day."
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="space-y-4">
              <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
                <p className="eyebrow mb-3">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 break-all text-sm text-ink transition-colors hover:text-accent"
                >
                  <IconMail className="h-4 w-4 shrink-0 text-accent" />
                  {profile.email}
                </a>
              </div>

              <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
                <p className="eyebrow mb-3">Location</p>
                <p className="inline-flex items-center gap-2 text-sm text-ink">
                  <IconMapPin className="h-4 w-4 text-accent" />
                  {profile.location}
                  <span className="text-muted">· Remote friendly</span>
                </p>
              </div>

              <div className="rounded-lg border border-accent/25 bg-surface p-6 shadow-card">
                <p className="eyebrow mb-2">Availability</p>
                <p className="inline-flex items-center gap-2 text-sm text-ink">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
                  {profile.availability}
                </p>
              </div>

              <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
                <p className="eyebrow mb-3">Elsewhere</p>
                <SocialLinks />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <PageTransition>
      <Seo
        title="Muhammad Faizan Khan - Frontend Developer"
        description="Frontend developer based in Karachi, Pakistan. Building responsive, modern web interfaces with React, JavaScript and Tailwind CSS. Currently learning the MERN stack."
      />

      <Hero />
      <TechStrip />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </PageTransition>
  )
}