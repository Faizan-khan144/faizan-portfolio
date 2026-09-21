import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronRight, Rocket, Sparkles } from 'lucide-react'
import ChatPanel from '../components/ChatPanel'
import ParticleField from '../components/ParticleField'
import Magnetic from '../components/Magnetic'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import SocialLinks from '../components/SocialLinks'
import ContactForm from '../components/ContactForm'
import Typewriter from '../components/Typewriter'
import { profile } from '../data/profile'
import { projects, featuredProjects } from '../data/projects'
import { skillCategories } from '../data/skills'
import { journey } from '../data/journey'
import { IconMail, IconMapPin } from '../components/Icons'

const typingRoles = ['interfaces', 'dashboards', 'web products', 'landing pages']

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
    <div className="flex shrink-0 items-center">
      {techStrip.map((item) => (
        <span
          key={item}
          className="mx-8 inline-flex items-center gap-8 font-display text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl"
        >
          {item}
          <Sparkles className="h-4 w-4 text-accent transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="group relative overflow-hidden border-y border-line/10 bg-surface/40 py-4" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent"></div>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
      <div className="mt-2 flex w-max animate-marquee-reverse group-hover:[animation-play-state:paused] opacity-70">
        <Row />
        <Row />
      </div>
    </div>
  )
}

const terminalSessions = [
  { cmd: 'whoami', out: 'Muhammad Faizan Khan - Frontend Developer' },
  { cmd: 'ls ./stack', out: 'React  Tailwind CSS  JavaScript' },
  { cmd: 'cat ./learning', out: 'Node.js  Express.js  MongoDB  (MERN)' },
  { cmd: 'ls ./featured', out: 'OpenTrace  DevDock  CryptoLens' },
  { cmd: './status', out: 'open to new opportunities' },
]

function TerminalChip({ children, className = '', delay = 0, distance = 8 }) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-20 ${className}`}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  )
}

function HeroTerminal() {
  const [si, setSi] = useState(0)
  const [cmdLen, setCmdLen] = useState(0)
  const [outLen, setOutLen] = useState(0)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 160, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 160, damping: 18 })

  useEffect(() => {
    const session = terminalSessions[si]
    if (cmdLen < session.cmd.length) {
      const t = setTimeout(() => setCmdLen((v) => v + 1), 42)
      return () => clearTimeout(t)
    }
    if (outLen < session.out.length) {
      const t = setTimeout(() => setOutLen((v) => v + 1), 26)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setSi((v) => (v + 1) % terminalSessions.length)
      setCmdLen(0)
      setOutLen(0)
    }, 1700)
    return () => clearTimeout(t)
  }, [si, cmdLen, outLen])

  function onPointerMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onPointerLeave() {
    mx.set(0)
    my.set(0)
  }

  const active = terminalSessions[si]
  const past = terminalSessions.slice(Math.max(0, si - 2), si)

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <TerminalChip className="-left-6 -top-5">
        <span className="flex items-center gap-1.5 rounded-full border border-line/15 bg-surface px-3.5 py-2 font-mono text-xs font-medium text-ink shadow-card">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          React
        </span>
      </TerminalChip>
      <TerminalChip className="-right-4 top-[44%]" delay={0.8} distance={10}>
        <span className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 font-mono text-xs font-medium text-accent-ink shadow-card">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-ink"></span>
          Open to work
        </span>
      </TerminalChip>
      <TerminalChip className="-bottom-5 -left-4" delay={1.6} distance={9}>
        <span className="flex items-center gap-1.5 rounded-full border border-line/15 bg-surface px-3.5 py-2 font-mono text-xs font-medium text-ink shadow-card">
          <Rocket className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          MERN
        </span>
      </TerminalChip>

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-line/10 bg-surface shadow-card-hover"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent via-[#52b788] to-transparent"></div>

        <div className="flex items-center gap-2 border-b border-line/10 bg-surface-2/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true"></span>
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true"></span>
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true"></span>
          <span className="ml-3 font-mono text-[0.65rem] tracking-wide2 text-muted">
            &lt;faizan /&gt; — zsh
          </span>
        </div>

        <div className="h-56 px-5 py-4 font-mono text-[0.8rem] leading-[1.7]">
          {past.map((session) => (
            <div key={session.cmd} className="mb-1">
              <p className="text-ink">
                <ChevronRight className="mr-1.5 inline h-4 w-4 text-accent" aria-hidden="true" />
                <span className="text-muted">{session.cmd}</span>
              </p>
              <p className="pl-5 text-accent">{session.out}</p>
            </div>
          ))}

          <p className="text-ink">
            <ChevronRight className="mr-1.5 inline h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-muted">{active.cmd.slice(0, cmdLen)}</span>
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] animate-pulse bg-accent"></span>
          </p>
          {outLen > 0 && (
            <p className="pl-5 text-accent">
              {active.out.slice(0, outLen)}
              <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] animate-pulse bg-accent"></span>
            </p>
          )}

          <p className="mt-3 text-muted/60">
            <ChevronRight className="mr-1.5 inline h-4 w-4 text-accent" aria-hidden="true" />
            Featured: <span className="text-ink">{featuredProjects.map((id) => projects.find((p) => p.id === id)?.title).join(' · ')}</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function SectionHeader({ num, eyebrow, title, description }) {
  const words =
    typeof title === 'string'
      ? title.split(' ').map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {'\u00A0'}
          </motion.span>
        ))
      : null

  return (
    <div>
      <motion.p
        className="eyebrow mb-4 flex items-center gap-3"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="text-accent">{num}</span>
        <span className="h-px w-8 bg-line" aria-hidden="true"></span>
        {eyebrow}
      </motion.p>
      <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {words || title}
      </h2>
      {description && (
        <motion.p
          className="mt-4 max-w-2xl text-muted"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_0%,rgba(var(--color-accent)_/_0.08),transparent_60%)]"
        aria-hidden="true"
      ></div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[linear-gradient(rgba(var(--color-ink)_/_0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-ink)_/_0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      ></div>
      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />

      <motion.div
        className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      ></motion.div>
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
        animate={{ y: [0, 26, 0], x: [0, -18, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      ></motion.div>

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wide2 text-muted">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              Muhammad Faizan Khan — Frontend · MERN Learner
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]">
              I build{' '}
              <Typewriter words={typingRoles} className="text-accent" />
              <br />
              that feel <span className="text-shimmer">alive.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {profile.heroDescription}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.35}>
                <Button to="/projects" withArrow>
                  See the work
                </Button>
              </Magnetic>
              <Magnetic strength={0.35}>
                <Button to="/contact" variant="ghost">
                  Start a project
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-xs tracking-wide2 text-muted">
              30+ public repos · {profile.facts[2].value} projects shipped · {profile.availability}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('fz:assistant:open'))}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-dashed border-accent/50 px-4 py-2 font-mono text-xs text-accent transition-colors hover:border-accent hover:bg-accent/10"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"></span>
              Ask my AI assistant about me
            </button>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 border-t border-line/10 pt-6">
              <p className="eyebrow mb-3">Find me on</p>
              <SocialLinks />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <HeroTerminal />
        </Reveal>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-wide2 text-muted">scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line/30 p-1">
          <span className="animate-hero-bounce h-1.5 w-1 rounded-full bg-accent"></span>
        </span>
      </motion.div>
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
              <ProjectCard project={project} index={i} />
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

function AiSection() {
  return (
    <section className="border-t border-line py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeader
              num="05"
              eyebrow="FZ AI"
              title={
                <>
                  Meet <span className="moss-text">FZ AI</span> - my assistant, built on real data.
                </>
              }
              description="Ask it anything about my work, skills, projects or journey - it answers only from what I've actually built. Nothing is fabricated."
            />
            <ul className="mt-6 space-y-3">
              {['What has he built?', 'What skills does he have?', 'How do I contact him?'].map(
                (q) => (
                  <li key={q} className="flex items-center gap-3 font-mono text-sm text-muted">
                    <ChevronRight className="h-4 w-4 text-accent" aria-hidden="true" />
                    {q}
                  </li>
                )
              )}
            </ul>
            <Magnetic strength={0.3}>
            <Button to="/ai" withArrow className="mt-8">
              Open the AI page
            </Button>
          </Magnetic>
          </Reveal>
          <Reveal delay={0.1}>
            <ChatPanel className="h-full" />
          </Reveal>
        </div>
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
            num="06"
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
      <AiSection />
      <Contact />
    </PageTransition>
  )
}