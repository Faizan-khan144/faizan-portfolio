export default function Brand({ className = '' }) {
  return (
    <span className={`font-mono font-semibold tracking-tight ${className}`}>
      <span className="text-[0.85em] text-accent" aria-hidden="true">&lt;</span>
      <span className="text-ink">Faizan</span>
      <span className="text-[0.85em] text-accent" aria-hidden="true">/&gt;</span>
    </span>
  )
}