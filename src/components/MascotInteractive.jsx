import { useCallback, useEffect, useRef, useState } from 'react'
import { playChirp, speak } from '../lib/mascotSound'
import Mascot from './Mascot.jsx'

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

export default function MascotInteractive({
  size = 168,
  className = '',
  interactive = true,
  autoGreet = false,
  greeting = 'Hi!',
}) {
  const ref = useRef(null)
  const [look, setLook] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)
  const [grin, setGrin] = useState(false)
  const [bubble, setBubble] = useState(false)
  const [reduced] = useState(prefersReducedMotion)
  const timers = useRef([])

  useEffect(() => {
    if (reduced) return undefined
    let raf = 0
    function onMove(event) {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const nx = Math.max(-1, Math.min(1, (event.clientX - cx) / (rect.width / 2 + 140)))
        const ny = Math.max(-1, Math.min(1, (event.clientY - cy) / (rect.height / 2 + 140)))
        setLook({ x: nx, y: ny })
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return undefined
    let timer
    function schedule() {
      timer = window.setTimeout(() => {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 130)
        schedule()
      }, 2200 + Math.random() * 3200)
    }
    schedule()
    return () => window.clearTimeout(timer)
  }, [reduced])

  const poke = useCallback(() => {
    if (!interactive) return
    playChirp()
    speak(greeting)
    setGrin(true)
    setBubble(true)
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = [
      window.setTimeout(() => setGrin(false), 950),
      window.setTimeout(() => setBubble(false), 2300),
    ]
  }, [interactive, greeting])

  useEffect(() => {
    if (!autoGreet) return undefined
    const id = window.setTimeout(poke, 1500)
    return () => window.clearTimeout(id)
  }, [autoGreet, poke])

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  const svg = <Mascot ref={ref} size={size} look={look} blink={blink} grin={grin} />
  const bubbleEl = bubble ? (
    <span className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-accent/30 bg-surface px-3 py-1 font-mono text-xs font-semibold text-accent shadow-card">
      {greeting}
    </span>
  ) : null

  if (!interactive) {
    return (
      <span className={`relative inline-block ${className}`} style={{ width: size, height: size, lineHeight: 0 }}>
        {bubbleEl}
        {svg}
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={poke}
      aria-label="Say hi to the FZ AI mascot"
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size, lineHeight: 0, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
    >
      {bubbleEl}
      {svg}
    </button>
  )
}
