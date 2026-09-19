import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createCharacter() {
  const g = new THREE.Group()

  const M = {
    skin: new THREE.MeshStandardMaterial({ color: 0xffc29e, roughness: 0.55 }),
    hair: new THREE.MeshStandardMaterial({ color: 0x12141f, roughness: 0.5, metalness: 0.05 }),
    sweater: new THREE.MeshStandardMaterial({ color: 0x2b2f4a, roughness: 0.75 }),
    sweaterDark: new THREE.MeshStandardMaterial({ color: 0x1e2238, roughness: 0.8 }),
    cuff: new THREE.MeshStandardMaterial({ color: 0x8b7bff, roughness: 0.6 }),
    glow: new THREE.MeshStandardMaterial({
      color: 0x4ff2de,
      emissive: 0x4ff2de,
      emissiveIntensity: 1.2,
      roughness: 0.3,
    }),
    dark: new THREE.MeshStandardMaterial({ color: 0x0a0c16, roughness: 0.5 }),
  }

  const add = (geo, mat, x, y, z, sx = 1, sy = 1, sz = 1, parent = g) => {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    m.scale.set(sx, sy, sz)
    m.castShadow = true
    m.receiveShadow = true
    parent.add(m)
    return m
  }

  const body = new THREE.Group()
  body.position.y = 0
  g.add(body)

  // Torso (hoodie)
  const torso = add(new THREE.CapsuleGeometry(0.55, 0.9, 8, 24), M.sweater, 0, 0.75, 0, 1, 0.92, 0.78, body)
  // Hoodie neck
  add(new THREE.CylinderGeometry(0.3, 0.32, 0.28, 24), M.sweaterDark, 0, 1.38, 0, 1, 1, 1, body)
  // Hoodie seam / center stripe
  add(new THREE.BoxGeometry(0.05, 1.0, 0.06), M.cuff, 0, 0.75, 0.42, 1, 1, 1, body)
  // Pocket
  add(new THREE.BoxGeometry(0.5, 0.22, 0.08), M.sweaterDark, 0, 0.55, 0.42, 1, 1, 1, body)

  // Arms
  const armGeo = new THREE.CapsuleGeometry(0.16, 0.55, 6, 16)
  const armL = add(armGeo, M.sweater, -0.68, 0.95, 0, 1, 1.15, 1, body)
  const armR = add(armGeo, M.sweater, 0.68, 0.95, 0, 1, 1.15, 1, body)
  armL.rotation.z = 0.25
  armR.rotation.z = -0.25
  // Hand
  const handGeo = new THREE.SphereGeometry(0.13, 16, 16)
  const handL = add(handGeo, M.skin, -0.72, 0.52, 0, 1, 0.9, 1, body)
  const handR = add(handGeo, M.skin, 0.72, 0.52, 0, 1, 0.9, 1, body)
  // Cuff
  add(new THREE.CylinderGeometry(0.15, 0.17, 0.16, 16), M.cuff, -0.72, 0.66, 0, 1.05, 1, 1.05, body)
  add(new THREE.CylinderGeometry(0.15, 0.17, 0.16, 16), M.cuff, 0.72, 0.66, 0, 1.05, 1, 1.05, body)

  const ikArmL = { sleeve: armL, hand: handL }
  const ikArmR = { sleeve: armR, hand: handR }

  // Head group (rotates for look behavior)
  const head = new THREE.Group()
  head.position.y = 1.62
  body.add(head)

  // Skull
  const skull = add(new THREE.SphereGeometry(0.52, 32, 32), M.skin, 0, 0, 0, 1, 1.08, 0.98, head)
  // Jaw
  add(new THREE.SphereGeometry(0.36, 24, 24), M.skin, 0, -0.16, 0.02, 1.05, 0.7, 0.95, head)

  // Hair — styled fringe + sides + back
  const hairBack = add(new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55), M.hair, 0, 0.12, -0.06, 1.02, 1.1, 0.98, head)
  const hairTop = add(new THREE.SphereGeometry(0.46, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.42), M.hair, 0, 0.24, 0, 1.04, 1.05, 1.0, head)
  // Fringe (front swoop)
  const fringe = add(new THREE.BoxGeometry(0.26, 0.34, 0.5), M.hair, -0.14, 0.2, 0.3, 1, 1, 1, head)
  fringe.rotation.x = -0.35
  const fringe2 = add(new THREE.BoxGeometry(0.22, 0.3, 0.44), M.hair, 0.16, 0.16, 0.32, 1, 0.8, 1, head)
  fringe2.rotation.x = -0.5
  // Sideburns
  add(new THREE.BoxGeometry(0.12, 0.42, 0.3), M.hair, -0.5, 0.02, 0.06, 1, 1, 1, head)
  add(new THREE.BoxGeometry(0.12, 0.42, 0.3), M.hair, 0.5, 0.02, 0.06, 1, 1, 1, head)

  const hairFringe = [fringe, fringe2]
  const hairParts = [hairBack, hairTop, fringe, fringe2]

  // Ears
  const earGeo = new THREE.CapsuleGeometry(0.09, 0.16, 4, 8)
  add(earGeo, M.skin, -0.52, -0.08, 0, 1, 1, 1, head)
  add(earGeo, M.skin, 0.52, -0.08, 0, 1, 1, 1, head)

  // Eyebrows
  const browGeo = new THREE.BoxGeometry(0.3, 0.05, 0.07)
  const browL = add(browGeo, M.hair, -0.2, 0.13, 0.47, 1, 1, 1, head)
  const browR = add(browGeo, M.hair, 0.2, 0.13, 0.47, 1, 1, 1, head)
  browL.rotation.z = -0.1
  browR.rotation.z = 0.1

  // Eyes — white, iris, pupil (iris tracks mouse)
  const eyes = []
  ;[-1, 1].forEach((side) => {
    const x = 0.2 * side
    const white = add(new THREE.SphereGeometry(0.15, 20, 20), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }), x, 0.05, 0.44, 1, 0.85, 0.4, head)
    const iris = add(new THREE.SphereGeometry(0.09, 20, 20), new THREE.MeshStandardMaterial({ color: 0x9d7bff, roughness: 0.3 }), x, 0.05, 0.5, 0.5, 0.5, 0.35, head)
    const pupil = add(new THREE.SphereGeometry(0.045, 16, 16), new THREE.MeshStandardMaterial({ color: 0x0a0c16, roughness: 0.2 }), x, 0.05, 0.52, 1, 1, 0.4, head)
    const highlight = add(new THREE.SphereGeometry(0.02, 10, 10), new THREE.MeshBasicMaterial({ color: 0xffffff }), x - 0.025, 0.085, 0.54, 1, 1, 0.3, head)
    const lid = add(new THREE.BoxGeometry(0.32, 0.03, 0.06), M.skin, x, 0.03, 0.5, 1, 1, 1, head)
    eyes.push({ side, white, iris, pupil, highlight, lid, baseX: x, baseY: 0.05 })
  })

  const [eyeL, eyeR] = eyes

  // Blink eyelids (thin skin spheres that scale to cover eyes)
  const blinkLidGeo = new THREE.SphereGeometry(0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5)
  const lidL = add(blinkLidGeo, M.skin, -0.2, 0.05, 0.42, 1, 1, 0.5, head)
  const lidR = add(blinkLidGeo, M.skin, 0.2, 0.05, 0.42, 1, 1, 0.5, head)
  lidL.rotation.x = Math.PI * 0.5
  lidR.rotation.x = Math.PI * 0.5
  // Start "open" (hidden above eyes)
  const lids = [lidL, lidR]
  lids.forEach((l) => {
    l.position.y = 0.32
    l.visible = false
  })

  // Nose hint
  add(new THREE.SphereGeometry(0.05, 12, 12), M.skin, 0, -0.07, 0.5, 1, 0.7, 0.6, head)
  // Mouth
  add(new THREE.BoxGeometry(0.18, 0.035, 0.04), new THREE.MeshStandardMaterial({ color: 0xb96a5a, roughness: 0.6 }), 0, -0.2, 0.5, 1, 1, 1, head)

  // Glasses vibe? small accent pixels on sides
  add(new THREE.BoxGeometry(0.06, 0.02, 0.02), M.cuff, 0, 0.26, 0.5, 1, 1, 1, head)

  g.userData = {
    head,
    body,
    eyes,
    lids,
    hairFringe,
    hairParts,
    torso,
  }

  return g
}

function createPlatform() {
  const group = new THREE.Group()

  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.7, 0.22, 48),
    new THREE.MeshStandardMaterial({ color: 0x0c0f1e, roughness: 0.4, metalness: 0.4 })
  )
  disc.position.y = -1.45
  disc.castShadow = true
  disc.receiveShadow = true
  group.add(disc)

  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x4ff2de,
    emissive: 0x4ff2de,
    emissiveIntensity: 1.4,
    roughness: 0.3,
    metalness: 0.4,
  })
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.03, 16, 64), ringMat)
  ring1.rotation.x = Math.PI / 2.15
  ring1.position.y = -1.33
  group.add(ring1)

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.02, 16, 64), new THREE.MeshBasicMaterial({ color: 0x8b7bff, transparent: true, opacity: 0.6 }))
  ring2.rotation.x = Math.PI / 2.15
  ring2.rotation.z = 0.4
  ring2.position.y = -1.3
  group.add(ring2)

  const underGlow = new THREE.Mesh(
    new THREE.CircleGeometry(1.6, 48),
    new THREE.MeshBasicMaterial({ color: 0x8b7bff, transparent: true, opacity: 0.28 })
  )
  underGlow.rotation.x = -Math.PI / 2
  underGlow.position.y = -1.335
  group.add(underGlow)

  const light = new THREE.PointLight(0x8b7bff, 1.8, 6)
  light.position.y = -1.2
  group.add(light)

  group.userData = { ring1, ring2 }
  return group
}

function createOrbitRings() {
  const group = new THREE.Group()
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x4ff2de, transparent: true, opacity: 0.35 })
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.012, 8, 96), ringMat)
  r1.rotation.x = Math.PI / 2.4
  r1.rotation.z = 0.35
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.012, 8, 96), new THREE.MeshBasicMaterial({ color: 0x8b7bff, transparent: true, opacity: 0.3 }))
  r2.rotation.x = Math.PI / 2.6
  r2.rotation.z = -0.3
  group.add(r1, r2)
  group.userData = { r1, r2 }
  return group
}

export default function HeroCharacter() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer, scene, camera
    let rafId
    let character, platform, orbits
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let blinkTimer = 2 + Math.random() * 2
    let blinkT = 0

    const width = mount.clientWidth
    const height = mount.clientHeight

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100)
    camera.position.set(0, 0.1, 8.4)
    camera.lookAt(0, 0.1, 0)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.DirectionalLight(0xffffff, 2.2)
    key.position.set(2, 4, 5)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    scene.add(key)
    const cool = new THREE.DirectionalLight(0x8b7bff, 1.6)
    cool.position.set(-4, 2, -2)
    scene.add(cool)
    const rim = new THREE.PointLight(0x4ff2de, 1.4, 10)
    rim.position.set(3, -1, 4)
    scene.add(rim)

    // Soft radial backdrop glow
    const glowTex = (() => {
      const c = document.createElement('canvas')
      c.width = c.height = 128
      const ctx = c.getContext('2d')
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
      grad.addColorStop(0, 'rgba(139,123,255,0.5)')
      grad.addColorStop(0.5, 'rgba(139,123,255,0.15)')
      grad.addColorStop(1, 'rgba(139,123,255,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 128, 128)
      return new THREE.CanvasTexture(c)
    })()
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 9),
      new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false })
    )
    glow.position.z = -1.4
    scene.add(glow)

    character = createCharacter()
    platform = createPlatform()
    orbits = createOrbitRings()
    scene.add(character, platform, orbits)

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove)

    let time = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      const dt = 1 / 60
      time += dt

      target.x += (mouse.x - target.x) * 0.05
      target.y += (mouse.y - target.y) * 0.05

      const head = character.userData.head
      head.rotation.y += (target.x * 0.35 - head.rotation.y) * 0.05
      head.rotation.x += (-target.y * 0.25 - head.rotation.x) * 0.05

      // Eyes + lids
      character.userData.eyes.forEach((e) => {
        e.iris.position.x = e.baseX + target.x * 0.045
        e.iris.position.y = e.baseY + target.y * 0.03
        e.pupil.position.x = e.iris.position.x
        e.pupil.position.y = e.iris.position.y
        e.pupil.position.z = 0.52 + Math.abs(target.y) * 0.01
        e.highlight.position.x = e.iris.position.x - 0.025
        e.highlight.position.y = e.iris.position.y + 0.035
      })

      // Blink
      blinkTimer -= dt
      if (blinkTimer <= 0) {
        blinkT = 1
        blinkTimer = 2.5 + Math.random() * 3.5
      }
      if (blinkT > 0) blinkT -= dt * 6
      const closed = Math.max(0, blinkT)
      character.userData.lids.forEach((lid) => {
        lid.visible = closed > 0
        lid.position.y = 0.05 + (0.32 - 0.05) * closed
      })

      // Idle animations
      character.position.y = 0
      character.userData.body.position.y = Math.sin(time * 1.6) * 0.045
      character.userData.torso.rotation.z = Math.sin(time * 0.9) * 0.02
      character.userData.body.rotation.z = Math.sin(time * 0.7) * 0.03
      // Breathing
      const breath = 1 + Math.sin(time * 2.2) * 0.012
      character.userData.hairFringe.forEach((f) => {
        f.position.y += Math.sin(time * 1.3) * 0.001
      })

      // Platform rings spin
      platform.userData.ring1.rotation.z += dt * 0.6
      platform.userData.ring2.rotation.z -= dt * 0.4
      orbits.userData.r1.rotation.z += dt * 0.15
      orbits.userData.r2.rotation.z -= dt * 0.12
      orbits.position.y = Math.sin(time * 0.5) * 0.05

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
      renderer.dispose()
      while (mount.firstChild) mount.removeChild(mount.firstChild)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="h-[440px] w-full md:h-[620px]"
      aria-hidden="true"
    />
  )
}