export default function SectionHeader({ eyebrow, index, title, description }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="eyebrow mb-4 flex items-center gap-3">
        {index && <span className="text-accent">{index}</span>}
        {index && <span className="h-px w-8 bg-line" aria-hidden="true"></span>}
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 leading-relaxed text-muted">{description}</p>}
    </div>
  )
}