import { useEffect, useRef } from 'react'

export default function ParticleField({ className = '', density = 55 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let particles = []
    const mouse = { x: -9999, y: -9999 }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(density, Math.floor((w * h) / 15000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    function draw() {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        p.pulse += 0.02

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < 130 && dist > 0.001) {
          p.x += (dx / dist) * 0.35
          p.y += (dy / dist) * 0.35
        }

        const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = dark
          ? `rgba(116, 198, 157, ${(0.4 * tw).toFixed(3)})`
          : `rgba(45, 106, 79, ${(0.32 * tw).toFixed(3)})`
        ctx.fill()
      }

      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          if (Math.abs(dx) > 95 || Math.abs(dy) > 95) continue
          const d = Math.hypot(dx, dy)
          if (d < 95) {
            const alpha = (1 - d / 95) * (dark ? 0.1 : 0.08)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = dark ? `rgba(116,198,157,${alpha.toFixed(3)})` : `rgba(45,106,79,${alpha.toFixed(3)})`
            ctx.stroke()
          }
        }
      }
    }

    function loop() {
      draw()
      raf = requestAnimationFrame(loop)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    if (reduced) {
      draw()
    } else {
      loop()
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [density])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}