import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SceneBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer
    let rafId
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x060608, 14, 26)

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.set(0, 1.6, 8.5)
    camera.lookAt(0, 1, 0)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Subtle floor grid
    const grid = new THREE.GridHelper(30, 30, 0x4ade80, 0x22d3ee)
    grid.material.transparent = true
    grid.material.opacity = 0.18
    grid.position.y = -0.5
    scene.add(grid)

    // Faint second grid for depth
    const grid2 = new THREE.GridHelper(30, 30, 0x8b5cf6, 0x8b5cf6)
    grid2.material.transparent = true
    grid2.material.opacity = 0.05
    grid2.position.y = 0.2
    scene.add(grid2)

    // Fine twinkle particles
    const dotGeo = new THREE.BufferGeometry()
    const count = 320
    const positions = new Float32Array(count * 3)
    const dotColors = new Float32Array(count * 3)
    const palette = [new THREE.Color(0x4ade80), new THREE.Color(0x22d3ee), new THREE.Color(0xffffff)]
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2
      const c = palette[Math.floor(Math.random() * palette.length)]
      dotColors[i * 3] = c.r
      dotColors[i * 3 + 1] = c.g
      dotColors[i * 3 + 2] = c.b
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3))
    const dotMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: true,
    })
    const dots = new THREE.Points(dotGeo, dotMat)
    scene.add(dots)

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove)

    let time = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      time += 0.01

      target.x += (mouse.x - target.x) * 0.035
      target.y += (mouse.y - target.y) * 0.035

      camera.position.x += target.x * 0.02
      camera.position.y = 1.6 - target.y * 0.45
      camera.lookAt(target.x * 0.55, 1.6, 0)

      grid.rotation.z = time * 0.01
      grid2.rotation.z = -time * 0.008

      dots.rotation.y = time * 0.012
      dots.rotation.x = time * 0.006

      renderer.render(scene, camera)
    }

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const observer = new ResizeObserver(onResize)
    observer.observe(mount)
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      grid.geometry.dispose()
      grid.material.dispose()
      grid2.geometry.dispose()
      grid2.material.dispose()
      dotGeo.dispose()
      dotMat.dispose()
      renderer.dispose()
      while (mount.firstChild) mount.removeChild(mount.firstChild)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden="true"
    />
  )
}