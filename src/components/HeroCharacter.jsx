import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createCharacterMaterial() {
  return {
    skin: new THREE.MeshStandardMaterial({ color: 0xffbd8f, roughness: 0.7 }),
    hair: new THREE.MeshStandardMaterial({ color: 0x1d1d2b, roughness: 0.85 }),
    shirt: new THREE.MeshStandardMaterial({ color: 0x7c5cff, roughness: 0.5, metalness: 0.1 }),
    accent: new THREE.MeshStandardMaterial({
      color: 0x33e6ff,
      emissive: 0x0d808f,
      emissiveIntensity: 0.5,
      roughness: 0.4,
    }),
    white: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x12121c, roughness: 0.6 }),
  }
}

function createCharacter() {
  const group = new THREE.Group()
  const mat = createCharacterMaterial()

  // Neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.5, 16), mat.skin)
  neck.position.y = -0.2
  group.add(neck)

  // Shoulders / torso
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.75, 0.8, 6, 16), mat.shirt)
  torso.position.y = -1.15
  torso.scale.set(1, 0.9, 0.75)
  group.add(torso)

  const badge = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.16, 0.06),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x33e6ff,
      emissiveIntensity: 0.8,
    })
  )
  badge.position.set(0, -1.2, 0.72)
  group.add(badge)

  // Head group (everything head-like rotates together for look behavior)
  const head = new THREE.Group()
  head.position.y = 0.1

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32), mat.skin)
  skull.scale.set(0.95, 1.05, 0.95)
  head.add(skull)

  // Hair (top + back)
  const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.2), mat.hair)
  hairTop.position.y = 0.12
  hairTop.scale.set(0.99, 1.02, 0.99)
  head.add(hairTop)

  const hairBack = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32, 0, Math.PI * 2, Math.PI / 3, Math.PI / 2), mat.hair)
  hairBack.position.set(0, 0.05, -0.05)
  hairBack.scale.set(0.97, 1.0, 0.9)
  head.add(hairBack)

  // Ears
  const earGeo = new THREE.SphereGeometry(0.13, 16, 16)
  const earL = new THREE.Mesh(earGeo, mat.skin)
  earL.position.set(-0.6, -0.05, 0)
  const earR = new THREE.Mesh(earGeo, mat.skin)
  earR.position.set(0.6, -0.05, 0)
  head.add(earL, earR)

  // Eyes
  const eyeWhiteGeo = new THREE.SphereGeometry(0.14, 16, 16)
  const eyeWhiteL = new THREE.Mesh(eyeWhiteGeo, mat.white)
  eyeWhiteL.position.set(-0.21, 0.05, 0.53)
  const eyeWhiteR = new THREE.Mesh(eyeWhiteGeo, mat.white)
  eyeWhiteR.position.set(0.21, 0.05, 0.53)
  head.add(eyeWhiteL, eyeWhiteR)

  const pupilGeo = new THREE.SphereGeometry(0.075, 16, 16)
  const pupilL = new THREE.Mesh(pupilGeo, mat.dark)
  pupilL.position.set(-0.21, 0.05, 0.63)
  const pupilR = new THREE.Mesh(pupilGeo, mat.dark)
  pupilR.position.set(0.21, 0.05, 0.63)
  head.add(pupilL, pupilR)

  group.userData.pupils = [pupilL, pupilR]

  // Eyebrows
  const browGeo = new THREE.BoxGeometry(0.28, 0.05, 0.06)
  const browL = new THREE.Mesh(browGeo, mat.hair)
  browL.position.set(-0.21, 0.24, 0.55)
  browL.rotation.z = -0.12
  const browR = new THREE.Mesh(browGeo, mat.hair)
  browR.position.set(0.21, 0.24, 0.55)
  browR.rotation.z = 0.12
  head.add(browL, browR)

  // Mouth
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 8, 24, Math.PI), mat.dark)
  mouth.position.set(0, -0.2, 0.54)
  mouth.rotation.z = Math.PI
  head.add(mouth)

  // Eyelids for blink (hides eyes briefly)
  const lidGeo = new THREE.BoxGeometry(0.34, 0.04, 0.05)
  const lidL = new THREE.Mesh(lidGeo, mat.skin)
  lidL.position.set(-0.21, 0.05, 0.62)
  const lidR = new THREE.Mesh(lidGeo, mat.skin)
  lidR.position.set(0.21, 0.05, 0.62)
  head.add(lidL, lidR)
  group.userData.lids = [lidL, lidR]

  // Arms
  const armMat = new THREE.MeshStandardMaterial({ color: 0x946bff, roughness: 0.55 })
  const shoulderGeo = new THREE.SphereGeometry(0.22, 16, 16)
  const shL = new THREE.Mesh(shoulderGeo, armMat)
  shL.position.set(-0.82, -0.85, 0)
  const shR = new THREE.Mesh(shoulderGeo, armMat)
  shR.position.set(0.82, -0.85, 0)
  group.add(shL, shR)

  const armGeo = new THREE.SphereGeometry(0.16, 16, 16)
  const armL = new THREE.Mesh(armGeo, armMat)
  armL.position.set(-0.82, -1.5, 0)
  const armR = new THREE.Mesh(armGeo, armMat)
  armR.position.set(0.82, -1.5, 0)
  group.add(armL, armR)

  // Hands
  const handGeo = new THREE.SphereGeometry(0.11, 16, 16)
  const handL = new THREE.Mesh(handGeo, mat.skin)
  handL.position.set(-0.82, -1.98, 0)
  const handR = new THREE.Mesh(handGeo, mat.skin)
  handR.position.set(0.82, -1.98, 0)
  group.add(handL, handR)

  group.userData.head = head
  group.add(head)

  return group
}

export default function HeroCharacter() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer, scene, camera
    let rafId
    let character
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let blinkTimer = 2 + Math.random() * 2
    let blinkPhase = 0

    const width = mount.clientWidth
    const height = mount.clientHeight

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 7.5)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Soft ground shadow plane
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.6, 32),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.25,
      })
    )
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = -2.35
    scene.add(shadow)

    scene.add(new THREE.AmbientLight(0xffffff, 0.9))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(3, 5, 4)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0x7c5cff, 1.8)
    rimLight.position.set(-4, 1, -2)
    scene.add(rimLight)
    const accentLight = new THREE.PointLight(0x33e6ff, 1.4, 12)
    accentLight.position.set(3, -1, 3)
    scene.add(accentLight)

    character = createCharacter()
    scene.add(character)

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const time = performance.now() * 0.001

      // Smooth follow
      target.x += (mouse.x - target.x) * 0.05
      target.y += (mouse.y - target.y) * 0.05

      const head = character.userData.head
      head.rotation.y = target.x * 0.45
      head.rotation.x = -target.y * 0.35

      // Pupils follow mouse
      character.userData.pupils.forEach((p) => {
        p.position.x = (p.position.x >= 0 ? 0.21 : -0.21) + target.x * 0.06
        p.position.y = 0.05 + target.y * 0.03
        p.position.z = 0.63
      })

      // Blink
      blinkTimer -= 0.016
      if (blinkTimer <= 0) {
        blinkPhase = 0.09
        blinkTimer = 2.2 + Math.random() * 3
      }
      if (blinkPhase > 0) blinkPhase -= 0.016
      const lidScale = Math.min(1, Math.max(0, blinkPhase / 0.04))
      character.userData.lids.forEach((lid) => {
        lid.scale.set(1, Math.max(0.001, lidScale), 1)
      })

      // Idle: gentle bob + breathing + arm sway
      character.position.y = Math.sin(time * 1.2) * 0.06
      character.rotation.y += (0 - character.rotation.y) * 0.02
      character.position.x += (target.x * 0.15 - character.position.x) * 0.02

      renderer.render(scene, camera)
    }

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(mount)
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      resizeObserver.disconnect()
      renderer.dispose()
      while (mount.firstChild) mount.removeChild(mount.firstChild)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="h-[380px] w-full md:h-[540px]"
      aria-hidden="true"
    />
  )
}