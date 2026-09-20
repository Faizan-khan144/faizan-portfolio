import { IconArrow, IconExternal, IconGitHub, IconStar } from './Icons'

function PreviewFrame({ project }) {
  const initial = project.title.charAt(0)

  return (
    <div className="pointer-events-none relative aspect-[16/10] select-none overflow-hidden rounded-t-lg border-b border-line bg-surface">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 20% 0%, rgba(217,168,91,0.07) 0%, rgba(0,0,0,0) 55%)`,
        }}
        aria-hidden="true"
      ></div>

      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#2a2a31]" aria-hidden="true"></span>
        <span className="h-2 w-2 rounded-full bg-[#2a2a31]" aria-hidden="true"></span>
        <span className="h-2 w-2 rounded-full bg-[#2a2a31]" aria-hidden="true"></span>
        <span className="ml-3 truncate font-mono text-[0.65rem] text-muted">
          {project.live || `github.com/Faizan-khan144/${project.name}`}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-9 flex flex-col justify-end p-4">
        <span
          className="font-serif text-5xl italic leading-none text-accent/90"
          aria-hidden="true"
        >
          {initial}
        </span>
        <span className="mt-2 h-px w-10 bg-accent/50" aria-hidden="true"></span>
        <div className="mt-3 flex flex-col gap-1.5">
          <span className="h-1.5 w-3/4 rounded-full bg-white/[0.08]" aria-hidden="true"></span>
          <span className="h-1.5 w-1/2 rounded-full bg-white/[0.05]" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  )
}

export default function ProjectCard({ project, index = 0, delay = 0 }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-300 hover:border-accent/40">
      <PreviewFrame project={project} />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-wide2 text-muted">
            {project.category}
          </span>
          {project.stars ? (
            <span className="inline-flex items-center gap-1 font-mono text-[0.65rem] text-muted">
              <IconStar className="h-3 w-3 text-accent" />
              {project.stars}
            </span>
          ) : null}
        </div>

        <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
          {project.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t}>
              <span className="inline-flex rounded border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-[0.65rem] text-ink/70">
                {t}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
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
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent"
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
        className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-md border border-line bg-bg/80 text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:border-accent/60 hover:text-accent"
        aria-hidden="true"
        tabIndex={-1}
      >
        <IconArrow className="h-4 w-4 -rotate-45" />
      </a>
    </article>
  )
}