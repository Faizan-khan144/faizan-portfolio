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

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 9)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const pastels = [0xcdd0ff, 0xbdece2, 0xffd6e4, 0xffe3c2, 0xd0e8ff]
    const geometryByShape = {
      icosa: () => new THREE.IcosahedronGeometry(1, 0),
      octa: () => new THREE.OctahedronGeometry(1, 0),
      knot: () => new THREE.TorusKnotGeometry(0.7, 0.22, 90, 12),
      torus: () => new THREE.TorusGeometry(0.8, 0.28, 16, 64),
    }

    const shapes = []
    const addShape = (key, color, x, y, z, scale, rotSpeed) => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.9,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      })
      const mesh = new THREE.Mesh(geometryByShape[key](), mat)
      mesh.position.set(x, y, z)
      mesh.scale.setScalar(scale)
      mesh.castShadow = false
      scene.add(mesh)
      shapes.push({ mesh, rotSpeed, floatOffset: Math.random() * Math.PI * 2 })
    }

    addShape('icosa', pastels[0], -4.5, 2.4, -3, 0.7, 0.22)
    addShape('knot', pastels[1], 4.8, 2.8, -4, 0.6, 0.3)
    addShape('torus', pastels[2], 5.2, -2.4, -2.5, 0.55, 0.5)
    addShape('octa', pastels[3], -4.8, -2.6, -3.5, 0.8, 0.26)
    addShape('icosa', pastels[4], 0.6, 3.8, -5, 0.45, 0.4)

    scene.add(new THREE.AmbientLight(0xffffff, 1.1))
    const dir = new THREE.DirectionalLight(0xffffff, 1.6)
    dir.position.set(4, 6, 4)
    scene.add(dir)
    const back = new THREE.DirectionalLight(0xbdb4ff, 0.8)
    back.position.set(-5, -3, -4)
    scene.add(back)

    // Floating soft dots
    const dotGeo = new THREE.BufferGeometry()
    const count = 220
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const dotMat = new THREE.PointsMaterial({
      color: 0x8d8d99,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
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

      target.x += (mouse.x - target.x) * 0.045
      target.y += (mouse.y - target.y) * 0.045

      shapes.forEach((s) => {
        s.mesh.rotation.x += s.rotSpeed * 0.02
        s.mesh.rotation.y += s.rotSpeed * 0.035
        s.mesh.position.y += Math.sin(time * 1.4 + s.floatOffset) * 0.0016
      })

      camera.position.x = target.x * 0.9
      camera.position.y = 0.4 + target.y * 0.6
      camera.lookAt(0, 0, 0)

      dots.rotation.y = time * 0.02
      dots.rotation.x = time * 0.01

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
      shapes.forEach((s) => {
        scene.remove(s.mesh)
        s.mesh.geometry.dispose()
        s.mesh.material.dispose()
      })
      dots.geometry.dispose()
      dotMat.dispose()
      renderer.dispose()
      while (mount.firstChild) mount.removeChild(mount.firstChild)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}