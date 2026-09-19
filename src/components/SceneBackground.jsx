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
    scene.fog = new THREE.Fog(0x08080b, 16, 30)

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.set(0, 1.8, 9)
    camera.lookAt(0, 1.5, 0)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Floor grid
    const grid = new THREE.GridHelper(30, 30, 0x10b981, 0x10b981)
    grid.material.transparent = true
    grid.material.opacity = 0.22
    grid.position.y = -0.5
    scene.add(grid)

    const grid2 = new THREE.GridHelper(30, 30, 0x22d3ee, 0x22d3ee)
    grid2.material.transparent = true
    grid2.material.opacity = 0.06
    grid2.position.y = 0.4
    scene.add(grid2)

    // Floating shapes (far, decorative)
    const colors = [0x10b981, 0x22d3ee, 0x8b5cf6, 0xf2f2f7]
    const shapes = []
    const addShape = (geo, color, x, y, z, scale, wire) => {
      const mat = wire
        ? new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            wireframe: true,
            transparent: true,
            opacity: 0.5,
          })
        : new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            emissive: new THREE.Color(color),
            emissiveIntensity: 0.4,
            roughness: 0.4,
            metalness: 0.4,
            transparent: true,
            opacity: 0.25,
          })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      mesh.scale.setScalar(scale)
      scene.add(mesh)
      shapes.push({ mesh, rot: 0.01 + Math.random() * 0.03, float: Math.random() * Math.PI * 2 })
    }

    addShape(new THREE.TorusKnotGeometry(0.9, 0.3, 120, 16), colors[0], -8, 4, -8, 1, false)
    addShape(new THREE.IcosahedronGeometry(1.2, 0), colors[1], 8, 3.5, -9, 1, true)
    addShape(new THREE.OctahedronGeometry(1.4, 0), colors[2], 9, -2.5, -6, 1, false)
    addShape(new THREE.TorusGeometry(1, 0.4, 12, 48), colors[3], -9, -2, -7, 1, true)
    addShape(new THREE.IcosahedronGeometry(0.8, 0), colors[0], 0, 5.5, -8, 1, true)
    addShape(new THREE.DodecahedronGeometry(1.1, 0), colors[2], -5, -4, -5, 1, false)
    addShape(new THREE.TorusGeometry(0.7, 0.25, 12, 48), colors[1], 4.5, 5, -6, 1, false)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const dir = new THREE.DirectionalLight(0xffffff, 1.2)
    dir.position.set(4, 6, 4)
    scene.add(dir)
    const cyanLight = new THREE.DirectionalLight(0x22d3ee, 0.8)
    cyanLight.position.set(-5, -3, -4)
    scene.add(cyanLight)

    // Particles
    const dotGeo = new THREE.BufferGeometry()
    const count = 500
    const positions = new Float32Array(count * 3)
    const dotColors = new Float32Array(count * 3)
    const palette = [new THREE.Color(0x10b981), new THREE.Color(0x22d3ee), new THREE.Color(0xffffff), new THREE.Color(0x8b5cf6)]
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26
      positions[i * 3 + 1] = Math.random() * 10 - 3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2
      const c = palette[Math.floor(Math.random() * palette.length)]
      dotColors[i * 3] = c.r
      dotColors[i * 3 + 1] = c.g
      dotColors[i * 3 + 2] = c.b
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3))
    const dotMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
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

      target.x += (mouse.x - target.x) * 0.04
      target.y += (mouse.y - target.y) * 0.04

      shapes.forEach((s) => {
        s.mesh.rotation.x += s.rot
        s.mesh.rotation.y += s.rot * 1.5
        s.mesh.position.y += Math.sin(time * 1.2 + s.float) * 0.0012
      })

      camera.position.x = target.x * 1.4
      camera.position.y = 1.8 - target.y * 0.8
      camera.lookAt(target.x * 0.4, 1.5, 0)

      grid.rotation.z = time * 0.008
      grid2.rotation.z = -time * 0.006

      dots.rotation.y = time * 0.015
      dots.rotation.x = time * 0.007

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
      shapes.forEach((s) => {
        scene.remove(s.mesh)
        s.mesh.geometry.dispose()
        s.mesh.material.dispose()
      })
      dotGeo.dispose()
      dotMat.dispose()
      renderer.dispose()
      while (mount.firstChild) mount.removeChild(mount.firstChild)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-90"
      aria-hidden="true"
    />
  )
}