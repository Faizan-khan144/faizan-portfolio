import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default function SceneBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer, scene, camera, controls
    let animationId
    const shapes = []
    let particleSystem
    let group
    const mouse = { x: 0, y: 0 }

    const colors = [0x7c5cff, 0x33e6ff, 0xff5ca8]
    const geometries = [
      new THREE.TorusKnotGeometry(1, 0.32, 128, 20),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(1, 0.32, 18, 60),
      new THREE.BoxGeometry(1.4, 1.4, 1.4),
      new THREE.DodecahedronGeometry(1, 0),
    ]

    const width = container.clientWidth
    const height = container.clientHeight

    scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x06060a, 0.055)

    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 9

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.enablePan = false

    group = new THREE.Group()
    for (let i = 0; i < 9; i++) {
      const geometry = geometries[i % geometries.length]
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        metalness: 0.85,
        roughness: 0.25,
        flatShading: true,
        transparent: true,
        opacity: 0.85,
      })
      const mesh = new THREE.Mesh(geometry, material)
      const x = (Math.random() - 0.5) * 16
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 6
      mesh.position.set(x, y, z)
      const scale = 0.35 + Math.random() * 0.65
      mesh.scale.set(scale, scale, scale)
      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.01,
        rotY: (Math.random() - 0.5) * 0.01,
        baseY: y,
        floatSpeed: 0.4 + Math.random() * 0.8,
      }
      group.add(mesh)
      shapes.push(mesh)
    }
    scene.add(group)

    const particleGeo = new THREE.BufferGeometry()
    const count = 1800
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30
      positions[i + 1] = (Math.random() - 0.5) * 18
      positions[i + 2] = (Math.random() - 0.5) * 20
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0x7c5cff,
      size: 0.025,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })
    particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    scene.add(new THREE.AmbientLight(0xffffff, 0.45))
    const light1 = new THREE.DirectionalLight(0x7c5cff, 2.5)
    light1.position.set(5, 6, 4)
    scene.add(light1)
    const light2 = new THREE.DirectionalLight(0x33e6ff, 2)
    light2.position.set(-6, -3, 5)
    scene.add(light2)
    const light3 = new THREE.DirectionalLight(0xff5ca8, 1.4)
    light3.position.set(0, -6, -4)
    scene.add(light3)

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const target = new THREE.Vector3()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const time = performance.now() * 0.001

      shapes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotX
        mesh.rotation.y += mesh.userData.rotY
        mesh.position.y =
          mesh.userData.baseY + Math.sin(time * mesh.userData.floatSpeed) * 0.35
      })

      particleSystem.rotation.y = time * 0.02

      target.set(mouse.x * 0.6, mouse.y * 0.4, 0)
      controls.target.lerp(target, 0.05)
      controls.update()
      renderer.render(scene, camera)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      controls.dispose()
      geometries.forEach((g) => g.dispose())
      particleGeo.dispose()
      particleMat.dispose()
      group.traverse((obj) => {
        if (obj.isMesh) obj.geometry?.dispose?.()
        if (obj.isMesh) obj.material?.dispose?.()
      })
      scene.remove(group)
      scene.remove(particleSystem)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    ></div>
  )
}