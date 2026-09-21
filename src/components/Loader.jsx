import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

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
    const t = setTimeout(() => setGone(true), 700)
    return () => clearTimeout(t)
  }, [leaving])

  if (gone) return null

  return (
    <div className="pointer-events-none" aria-hidden="true">
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg transition-opacity duration-700 ease-out ${
          leaving ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="font-mono text-sm tracking-[0.2em] text-accent">
          {`<`}faizan /{`>`}
        </p>

        <span className="mt-8 font-display text-7xl font-extrabold tabular-nums tracking-tight text-ink sm:text-8xl">
          {progress}
          <span className="text-accent">%</span>
        </span>

        <div className="relative mt-8 h-[2px] w-[min(220px,60vw)] overflow-hidden bg-line/15">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent via-[#52b788] to-[#7388ff]"
            style={{ width: `${progress}%`, transitionDuration: '120ms' }}
          ></div>
        </div>
      </div>
    </div>
  )
}