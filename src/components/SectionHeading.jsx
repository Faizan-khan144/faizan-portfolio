export default function SectionHeading({ num, label, title, desc }) {
  return (
    <div className="mb-14 max-w-3xl">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm font-medium text-accent">{num}</span>
        <span className="line-h w-12"></span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          {label}
        </span>
      </div>
      <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {desc}
        </p>
      )}
    </div>
  )
}