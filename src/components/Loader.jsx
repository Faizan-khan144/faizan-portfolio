import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import Brand from './Brand'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)
  const controlsRef = useRef(null)

  useEffect(() => {
    controlsRef.current = animate(0, 100, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => setLeaving(true),
    })
    return () => controlsRef.current?.stop()
  }, [])

  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(() => setGone(true), 750)
    return () => clearTimeout(t)
  }, [leaving])

  if (gone) return null

  return (
    <div className="pointer-events-none" aria-hidden="true">
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-bg transition-opacity duration-700 ease-out ${
          leaving ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <Brand className="text-3xl sm:text-4xl" />
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.45em] text-accent">
            Frontend Developer
          </p>
        </div>

        <div className="flex w-[min(360px,72vw)] flex-col items-center gap-4">
          <div className="relative h-[2px] w-full overflow-hidden bg-line/15">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#8a6a2a] via-[#c9a84c] to-[#e6c97a] transition-[width] ease-out"
              style={{ width: `${progress}%`, transitionDuration: '120ms' }}
            ></div>
          </div>
          <span className="font-mono text-lg font-semibold tracking-[0.2em] text-ink">
            {progress}%
          </span>
        </div>

        <span className="absolute bottom-10 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-muted/60">
          Preparing your experience
        </span>
      </div>
    </div>
  )
}