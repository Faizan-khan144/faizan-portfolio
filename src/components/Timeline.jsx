export default function Timeline({ items }) {
  return (
    <ol className="relative border-l border-line pl-8 sm:pl-10">
      {items.map((item, i) => (
        <li key={item.title} className="relative pb-12 last:pb-0">
          <span
            className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border border-accent bg-bg sm:-left-[45px]"
            aria-hidden="true"
          ></span>
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-accent">{item.period}</span>
            <span className="h-1 w-1 rounded-full bg-muted" aria-hidden="true"></span>
            <span className="font-mono text-[0.65rem] uppercase tracking-wide2 text-muted">
              {item.type}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ol>
  )
}