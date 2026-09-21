import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export default function CountUp({ value, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const numeric = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0
    const suffix = String(value).replace(/[0-9]/g, '')
    const controls = animate(0, numeric, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString() + suffix),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}