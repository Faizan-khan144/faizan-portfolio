import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer, scene, camera
    let rafId
    let group
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const width = mount.clientWidth
    const height = mount.clientHeight

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const matSolid = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.15,
      roughness: 0.35,
      metalness: 0.5,
    })
    const matWire = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const matViolet = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.2,
      roughness: 0.3,
      metalness: 0.6,
    })

    group = new THREE.Group()
    scene.add(group)

    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.15, 0.32, 180, 24), matSolid)
    group.add(knot)

    const knotWire = new THREE.Mesh(new THREE.TorusKnotGeometry(1.35, 0.4, 100, 12), matWire)
    group.add(knotWire)

    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), matViolet)
    octa.position.set(1.9, 1.4, 0)
    group.add(octa)

    const icosa = new THREE.Mesh(new THREE.IcosahedronGeometry(0.4, 0), matWire)
    icosa.position.set(-2, -1.2, -0.5)
    group.add(icosa)

    const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 0), matSolid)
    sphere.position.set(2.1, -1.3, -0.4)
    group.add(sphere)

    // Orbiting rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.4,
    })
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2, 0.015, 12, 100), ringMat)
    ring1.rotation.x = Math.PI / 2.3
    ring1.rotation.z = 0.4
    group.add(ring1)

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.35,
    })
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.012, 12, 100), ringMat2)
    ring2.rotation.x = Math.PI / 1.8
    ring2.rotation.z = -0.5
    group.add(ring2)

    // Small orbiters
    const orbs = []
    const orbGeo = new THREE.SphereGeometry(0.07, 12, 12)
    const orbMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })
    for (let i = 0; i < 6; i++) {
      const orb = new THREE.Mesh(orbGeo, orbMat)
      group.add(orb)
      orbs.push(orb)
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const key = new THREE.DirectionalLight(0xffffff, 2)
    key.position.set(3, 4, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x22d3ee, 1.2)
    rim.position.set(-4, -2, -3)
    scene.add(rim)

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove)

    let time = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      time += 0.008

      target.x += (mouse.x - target.x) * 0.04
      target.y += (mouse.y - target.y) * 0.04

      group.rotation.y = time * 0.35
      group.rotation.x = Math.sin(time * 0.4) * 0.18
      group.rotation.z = Math.cos(time * 0.3) * 0.08

      knotWire.rotation.y = -time * 0.7
      knotWire.rotation.x = time * 0.35

      octa.rotation.y = time * 2
      octa.position.y = 1.4 + Math.sin(time * 1.5) * 0.15
      icosa.rotation.x = time * 1.6
      sphere.rotation.y = time * 1.4

      ring1.rotation.z += 0.0012
      ring2.rotation.z -= 0.0009

      for (let i = 0; i < orbs.length; i++) {
        const a = (i / orbs.length) * Math.PI * 2 + time * 0.9
        orbs[i].position.set(
          Math.cos(a) * 2.0,
          Math.sin(a) * 2.0,
          Math.sin(a * 1.7) * 0.6
        )
      }

      // Subtle parallax response to mouse
      camera.position.x = target.x * 0.35
      camera.position.y = -target.y * 0.25
      camera.lookAt(0, 0, 0)

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
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) obj.material.dispose()
      })
      renderer.dispose()
      while (mount.firstChild) mount.removeChild(mount.firstChild)
    }
  }, [])

  return (
    <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
  )
}