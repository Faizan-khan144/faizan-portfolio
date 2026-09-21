import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import { IconArrow, IconExternal, IconGitHub, IconStar } from './Icons'

const accents = {
  opentrace: '#8B5CF6',
  devdock: '#0EA5E9',
  'eduboard-pro': '#2D6A4F',
  'cryptolens-dashboard': '#C4A265',
  'zaviyan-turns-one': '#F59E0B',
  'fz-bank-modern-banking-website': '#10B981',
  'august-and-oak-ecommerce': '#C4A265',
}

function accentFor(project) {
  return accents[project.id] || '#6E6E73'
}

function initials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

function CoverArt({ project }) {
  const accent = accentFor(project)
  return (
    <div className="absolute inset-0 overflow-hidden transition-transform duration-500 group-hover:scale-[1.05]">
      <div className="absolute inset-0 bg-surface-2" aria-hidden="true"></div>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 100% at 12% 0%, ${accent}40, ${accent}08 48%, transparent 62%)`,
        }}
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-ink)_/_0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-ink)_/_0.045)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:radial-gradient(90%_90%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -right-6 -bottom-8 select-none font-display text-[7.5rem] font-extrabold leading-none tracking-tighter transition-transform duration-500 group-hover:-translate-y-2"
        style={{ color: `${accent}22` }}
        aria-hidden="true"
      >
        {initials(project.title)}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div>
          <p
            className="mb-2 inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wide2"
            style={{ color: accent }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            ></span>
            {project.category}
          </p>
          <p className="font-display text-2xl font-bold leading-none tracking-tight text-ink sm:text-3xl">
            {project.title}
          </p>
        </div>
        <div className="flex max-w-[45%] flex-wrap justify-end gap-1.5">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line/10 bg-bg/80 px-2.5 py-1 font-mono text-[0.6rem] text-ink/70 backdrop-blur"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-0 h-full w-1/3 -rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[420%]"
        aria-hidden="true"
      ></div>
    </div>
  )
}

function PreviewFrame({ project }) {
  return (
    <div className="pointer-events-none relative aspect-[16/10] select-none overflow-hidden rounded-t-xl border-b border-line/10 bg-surface-2">
      <div className="relative z-10 flex items-center gap-1.5 border-b border-line/10 bg-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" aria-hidden="true"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8b33c]" aria-hidden="true"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-[#3fb950]" aria-hidden="true"></span>
        <span className="ml-3 truncate font-mono text-[0.65rem] text-muted">
          {project.live || `github.com/Faizan-khan144/${project.name}`}
        </span>
      </div>

      <CoverArt project={project} />
    </div>
  )
}

export default function ProjectCard({ project, index = 0, delay = 0 }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 180, damping: 18 })
  const glareX = useTransform(mx, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(my, [-0.5, 0.5], [0, 100])
  const glareBg = useMotionTemplate`radial-gradient(220px circle at ${glareX}% ${glareY}%, rgb(var(--color-accent) / 0.16), transparent 65%)`

  function onPointerMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onPointerLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      className="group card-glow relative flex h-full flex-col overflow-hidden rounded-[1.1rem] border border-line/10 bg-surface shadow-card hover:border-line/20"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="project-glow-bar absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r from-[var(--pc-accent)] to-transparent"
        style={{ '--pc-accent': accentFor(project) }}
        aria-hidden="true"
      ></div>
      {project.featured && (
        <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-sm border border-accent/40 bg-accent-ink/90 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wide2 text-accent shadow-card backdrop-blur">
          <IconStar className="h-3 w-3" />
          Featured
        </span>
      )}
      <div className="relative">
        <PreviewFrame project={project} />
        <motion.div
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-t-[1.1rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        ></motion.div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between font-mono text-[0.65rem] text-muted">
          <span>0{index + 1}</span>
          {project.stars ? (
            <span className="inline-flex items-center gap-1">
              <IconStar className="h-3 w-3" style={{ color: accentFor(project) }} />
              {project.stars}
            </span>
          ) : null}
        </div>

        <h3 className="font-display text-lg font-bold tracking-tight text-ink">{project.title}</h3>

        <p className="mt-0.5 font-mono text-xs font-medium" style={{ color: accentFor(project) }}>
          {project.category}
        </p>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t}>
              <span className="inline-flex rounded border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.65rem] text-ink/75">
                {t}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-4 border-t border-line/10 pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-bg transition-colors hover:bg-accent"
            aria-label={`${project.title} source on GitHub`}
          >
            <IconGitHub className="h-4 w-4" />
            Source
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line/20 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
              aria-label={`${project.title} live demo`}
            >
              <IconExternal className="h-4 w-4" />
              Live demo
            </a>
          )}
        </div>
      </div>

      <a
        href={project.live || project.github}
        target="_blank"
        rel="noreferrer"
        className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-md border border-line bg-surface text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:border-accent/60 hover:text-accent"
        aria-hidden="true"
        tabIndex={-1}
      >
        <IconArrow className="h-4 w-4 -rotate-45" />
      </a>
    </motion.article>
  )
}