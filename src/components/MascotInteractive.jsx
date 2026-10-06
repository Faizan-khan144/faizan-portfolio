import { useCallback, useEffect, useRef, useState } from 'react'
import { playChirp, speak } from '../lib/mascotSound'
import Mascot from './Mascot.jsx'

const IDLE_LINES = [
  'psst — hover me',
  'click me!',
  'I read your commits',
  'scroll, I dare you',
  'ship it?',
  'bmw of bugs',
]

const POKED_LINES = ['hehe — that tickles!', 'oi, I am working!', 'one more?', 'bzzt!']

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

const pick = (list) => list[Math.floor(Math.random() * list.length)]

/**
 * Mochi with behaviour: eye tracking, blinking, idle breathing, squish on
 * click, a dizzy state when poked too fast, a rotating speech bubble and
 * occasional random idle lines.
 */
export default function MascotInteractive({
  size = 140,
  className = '',
  interactive = true,
  autoGreet = false,
  greeting = 'Hi!',
}) {
  const ref = useRef(null)
  const [look, setLook] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)
  const [squish, setSquish] = useState(false)
  const [grin, setGrin] = useState(false)
  const [wave, setWave] = useState(false)
  const [mood, setMood] = useState('happy')
  const [bubble, setBubble] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [reduced] = useState(prefersReducedMotion)
  const timers = useRef([])
  const pokes = useRef([])

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

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
      }, 1900 + Math.random() * 3400)
    }
    schedule()
    return () => window.clearTimeout(timer)
  }, [reduced])

  useEffect(() => {
    if (reduced || !interactive) return undefined
    const line = window.setInterval(() => {
      setBubble((prev) => (prev && prev !== greeting ? prev : pick(IDLE_LINES)))
    }, 6500)
    return () => window.clearInterval(line)
  }, [reduced, interactive, greeting])

  const poke = useCallback(() => {
    if (!interactive) return
    playChirp()

    const now = Date.now()
    pokes.current = [now, ...pokes.current.filter((t) => now - t < 1600)].slice(0, 3)
    const dizzyNow = pokes.current.length >= 3

    clearTimers()

    if (dizzyNow) {
      speak('whoa!')
      setMood('dizzy')
      setBubble('whoa — too many pokes!')
      pokes.current = []
      timers.current = [
        window.setTimeout(() => {
          setMood('happy')
          setBubble(null)
        }, 2600),
      ]
      return
    }

    speak(greeting)
    setSquish(true)
    setGrin(true)
    setMood('happy')
    setBubble(pick(pokes.current.length > 1 ? POKED_LINES : [greeting]))
    if (pokes.current.length <= 1) setWave(true)

    timers.current = [
      window.setTimeout(() => setSquish(false), 420),
      window.setTimeout(() => setGrin(false), 1100),
      window.setTimeout(() => setWave(false), 1900),
      window.setTimeout(() => setBubble(null), 2500),
    ]
  }, [interactive, greeting])

  useEffect(() => {
    if (!autoGreet) return undefined
    const id = window.setTimeout(poke, 1500)
    return () => window.clearTimeout(id)
  }, [autoGreet, poke])

  useEffect(() => () => clearTimers(), [])

  const svg = (
    <Mascot
      ref={ref}
      size={size}
      look={look}
      blink={blink}
      squish={squish}
      grin={grin}
      wave={wave}
      mood={mood}
      className={mood === 'dizzy' ? 'mo-dizzy' : squish ? undefined : 'mascot-float'}
    />
  )

  const bubbleEl = bubble ? (
    <span className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-accent/30 bg-surface px-3 py-1 font-mono text-xs font-semibold text-accent shadow-card mo-pop">
      {bubble}
    </span>
  ) : null

  const sparkleEls = squish || mood === 'dizzy' ? (
    <span className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`mo-spark mo-spark-${i}`} />
      ))}
    </span>
  ) : null

  const wrap = `relative inline-block ${className}`

  if (!interactive) {
    return (
      <span className={wrap} style={{ width: size, height: size, lineHeight: 0 }}>
        {bubbleEl}
        {sparkleEls}
        {svg}
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={poke}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      aria-label="Poke Mochi"
      className={wrap}
      style={{
        width: size,
        height: size,
        lineHeight: 0,
        padding: 0,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        transform: hovered && !reduced ? 'scale(1.04)' : undefined,
        transition: 'transform .25s cubic-bezier(.16,1,.3,1)',
      }}
    >
      {bubbleEl}
      {sparkleEls}
      {svg}
    </button>
  )
}