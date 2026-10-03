import { useCallback, useEffect, useRef, useState } from 'react'
import { playChirp, speak } from '../lib/mascotSound'

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

export default function MascotInteractive({
  size = 120,
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

  const dx = look.x * 2.7
  const dy = look.y * 2.5
  const tilt = look.x * 2.4

  const eyeStyle = {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transform: blink ? 'scaleY(0.1)' : 'scaleY(1)',
    transition: 'transform 90ms ease',
  }

  const svg = (
    <svg
      ref={ref}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ display: 'block' }}
      role="img"
      aria-label="FZ AI mascot"
    >
      <g transform={`rotate(${tilt} 32 42)`}>
        <path d="M32 9c0-4 3-7 7-7 0 5-2 8-7 8z" style={{ fill: 'rgb(var(--color-accent))' }} />
        <line
          x1="32"
          y1="9"
          x2="32"
          y2="14"
          stroke="rgb(var(--color-accent))"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="32" cy="8" r="2.4" style={{ fill: 'rgb(var(--color-accent))' }} />

        <rect
          x="8"
          y="14"
          width="48"
          height="44"
          rx="22"
          style={{
            fill: 'rgb(var(--color-surface-2))',
            stroke: 'rgb(var(--color-accent))',
            strokeWidth: '2.5',
          }}
        />

        <ellipse cx="16.5" cy="43" rx="5" ry="3.4" style={{ fill: 'rgb(244 114 182 / 0.42)' }} />
        <ellipse cx="47.5" cy="43" rx="5" ry="3.4" style={{ fill: 'rgb(244 114 182 / 0.42)' }} />

        <g style={eyeStyle}>
          <circle cx="22.5" cy="33" r="7.4" fill="#ffffff" />
          <g transform={`translate(${dx} ${dy})`}>
            <circle cx="22.5" cy="33" r="3.7" style={{ fill: 'rgb(var(--color-ink))' }} />
            <circle cx="23.8" cy="31.4" r="1.3" fill="#ffffff" />
          </g>
        </g>
        <g style={eyeStyle}>
          <circle cx="41.5" cy="33" r="7.4" fill="#ffffff" />
          <g transform={`translate(${dx} ${dy})`}>
            <circle cx="41.5" cy="33" r="3.7" style={{ fill: 'rgb(var(--color-ink))' }} />
            <circle cx="42.8" cy="31.4" r="1.3" fill="#ffffff" />
          </g>
        </g>

        {grin ? (
          <g>
            <path
              d="M25.5 44c2 5.2 11 5.2 13 0z"
              style={{ fill: 'rgb(var(--color-ink))' }}
            />
            <path d="M28.6 47.6c1.4 1.7 5.4 1.7 6.8 0z" style={{ fill: '#f472b6' }} />
          </g>
        ) : (
          <path
            d="M26.5 45.5c2.2 2.5 8.8 2.5 11 0"
            fill="none"
            stroke="rgb(var(--color-ink))"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        )}
      </g>
    </svg>
  )

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
