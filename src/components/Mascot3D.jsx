import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Mascot from './Mascot'
import { playChirp, speak } from '../lib/mascotSound'

function supportsWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

function useAccent() {
  const [accent, setAccent] = useState('#2d6a4f')

  useEffect(() => {
    function read() {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent')
        .trim()
      if (value) setAccent(`rgb(${value})`)
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  return accent
}

function Head({ accent, talking, reduced }) {
  const root = useRef()
  const eyes = useRef([])
  const mouth = useRef()
  const tip = useRef()
  const blink = useRef({ next: 2.4, closing: 0 })

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const step = Math.min(1, delta * 4)
    const slow = Math.min(1, delta * 6)

    if (root.current) {
      const bob = reduced ? 0 : Math.sin(t * 1.6) * 0.09
      root.current.position.y += (-0.28 + bob - root.current.position.y) * step
      const px = reduced ? 0 : state.pointer.x
      const py = reduced ? 0 : state.pointer.y
      root.current.rotation.y += (px * 0.5 - root.current.rotation.y) * slow
      root.current.rotation.x += (-py * 0.32 - root.current.rotation.x) * slow
    }

    const b = blink.current
    b.next -= delta
    if (b.next <= 0) {
      b.closing = 0.16
      b.next = 2.4 + Math.random() * 3
    }
    if (b.closing > 0) b.closing -= delta
    const eyeTarget = b.closing > 0 ? 0.12 : 1
    eyes.current.forEach((eye) => {
      if (eye) eye.scale.y += (eyeTarget - eye.scale.y) * Math.min(1, delta * 20)
    })

    const open = talking ? 0.34 + Math.abs(Math.sin(t * 15)) * 0.5 : 0.08
    if (mouth.current) mouth.current.scale.y += (open - mouth.current.scale.y) * Math.min(1, delta * 22)
    if (tip.current) tip.current.scale.setScalar(1 + Math.sin(t * 4) * 0.12)
  })

  const dark = '#12261a'

  return (
    <group ref={root} scale={1.25}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#e8f6ee" roughness={0.32} metalness={0.08} />
      </mesh>

      <mesh position={[-1.02, 0.02, 0]}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} roughness={0.4} />
      </mesh>
      <mesh position={[1.02, 0.02, 0]}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} roughness={0.4} />
      </mesh>

      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.5, 16]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={tip} position={[0, 1.48, 0]}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} />
      </mesh>

      <group
        ref={(node) => {
          eyes.current[0] = node
        }}
        position={[-0.36, 0.16, 0.82]}
      >
        <mesh>
          <sphereGeometry args={[0.19, 32, 32]} />
          <meshStandardMaterial color={dark} roughness={0.15} />
        </mesh>
        <mesh position={[0.06, 0.07, 0.15]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
      </group>
      <group
        ref={(node) => {
          eyes.current[1] = node
        }}
        position={[0.36, 0.16, 0.82]}
      >
        <mesh>
          <sphereGeometry args={[0.19, 32, 32]} />
          <meshStandardMaterial color={dark} roughness={0.15} />
        </mesh>
        <mesh position={[0.06, 0.07, 0.15]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
      </group>

      <mesh position={[-0.62, -0.16, 0.72]} scale={[1, 0.72, 0.35]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#f9a8d4" roughness={0.6} transparent opacity={0.78} />
      </mesh>
      <mesh position={[0.62, -0.16, 0.72]} scale={[1, 0.72, 0.35]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#f9a8d4" roughness={0.6} transparent opacity={0.78} />
      </mesh>

      <mesh ref={mouth} position={[0, -0.34, 0.88]} scale={[1, 0.08, 1]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color={dark} roughness={0.3} />
      </mesh>
    </group>
  )
}

export default function Mascot3D({
  size = 200,
  className = '',
  greeting = 'Hi!',
  autoGreet = false,
  interactive = true,
}) {
  const accent = useAccent()
  const [talking, setTalking] = useState(false)
  const [bubble, setBubble] = useState(false)
  const timers = useRef([])
  const supported = useMemo(() => supportsWebGL(), [])
  const reduced = useMemo(() => prefersReducedMotion(), [])

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }, [])

  const sayHi = useCallback(() => {
    clearTimers()
    playChirp()
    speak(greeting)
    setBubble(true)
    setTalking(true)
    timers.current.push(window.setTimeout(() => setTalking(false), 1100))
    timers.current.push(window.setTimeout(() => setBubble(false), 2600))
  }, [clearTimers, greeting])

  useEffect(() => {
    if (!autoGreet) return undefined
    const id = window.setTimeout(sayHi, 1400)
    return () => window.clearTimeout(id)
  }, [autoGreet, sayHi])

  useEffect(() => () => clearTimers(), [clearTimers])

  if (!supported) {
    return <Mascot size={size} className={className} />
  }

  return (
    <div
      className={`relative ${className}`}
      data-mascot3d={size}
      style={{ width: size, height: size, lineHeight: 0 }}
    >
      {bubble && (
        <span className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-accent/30 bg-surface px-3 py-1 font-mono text-xs font-semibold text-accent shadow-card">
          {greeting}
        </span>
      )}
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
        onPointerDown={interactive ? sayHi : undefined}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[3, 5, 4]} intensity={1.25} />
        <directionalLight position={[-4, -2, -3]} intensity={0.55} color={accent} />
        <pointLight position={[0, -2, 3.4]} intensity={0.7} color={accent} />
        <Head accent={accent} talking={talking} reduced={reduced} />
      </Canvas>
    </div>
  )
}
