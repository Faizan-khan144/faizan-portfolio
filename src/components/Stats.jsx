import { useEffect, useRef } from 'react'
import { stats } from '../data'

function useCountUp(end, duration = 1400) {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const match = node.dataset.value
    let value = 0
    const start = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration)
      value = Math.round(end * (1 - Math.pow(1 - t, 3)))
      node.textContent = match.includes('+')
        ? `${value}+`
        : match === '∞'
          ? '∞'
          : `${value}%`
      if (t < 1) requestAnimationFrame(step)
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(step)
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [end, duration])
  return ref
}

function StatRow({ num, label }) {
  const end = num.includes('+') ? parseInt(num, 10) : num === '100%' ? 100 : 0
  const ref = useCountUp(end)
  return (
    <div className="text-center md:text-left">
      <div ref={ref} data-value={num} className="font-mono text-5xl font-bold text-accent md:text-7xl">
        0
      </div>
      <div className="mt-3 font-mono text-xs uppercase tracking-widest text-muted md:text-sm">
        {label}
      </div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-surface/60 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 crt-overlay opacity-40"></div>
      <div className="container-x relative">
        <div className="grid gap-10 md:grid-cols-3">
          {stats.map((stat) => (
            <StatRow key={stat.label} num={stat.num} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}