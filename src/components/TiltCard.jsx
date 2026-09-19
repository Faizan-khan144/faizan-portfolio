import { useCallback, useRef } from 'react'

export default function TiltCard({ children, className = '', max = 10 }) {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback(
    (e) => {
      const el = cardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rx = (0.5 - py) * max
      const ry = (px - 0.5) * max
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`
    },
    [max]
  )

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }, [])

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform', transition: 'transform 0.25s ease-out' }}
    >
      <div className="tilt-inner" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  )
}