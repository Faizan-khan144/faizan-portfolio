import { useEffect, useState } from 'react'

const bootLines = [
  '> initializing faizan.dev ... ok',
  '> mounting core modules .......... ok',
  '> loading assets ................. ok',
  '> establishing 3D context ........ ok',
  '> starting route 100 ............. ready',
]

export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 2600
    let raf

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 2)
      const pct = Math.min(100, Math.round(eased * 100))
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setExiting(true)
          setTimeout(onDone, 550)
        }, 500)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const iv = setInterval(() => {
      setVisibleLines((v) => Math.min(v + 1, bootLines.length))
    }, 380)
    return () => clearInterval(iv)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity duration-500 ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-xl px-6">
        <div className="mb-8 font-mono text-sm text-muted">
          <span className="text-accent">faizan@dev</span>:<span className="text-cyan">~</span>$ boot --portfolio
        </div>

        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent via-cyan to-accent transition-[width]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mb-6 flex items-center justify-between font-mono text-xs text-muted">
          <span>Loading route</span>
          <span className="text-accent">{progress}%</span>
        </div>

        <div className="h-36 font-mono text-xs leading-6 md:text-sm">
          {bootLines.slice(0, visibleLines).map((line) => (
            <div key={line} className="text-muted">
              {line}
            </div>
          ))}
          <span className="animate-blink text-accent">▊</span>
        </div>
      </div>
    </div>
  )
}