import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import PageTransition from '../components/PageTransition'
import ContactCta from '../components/ContactCta'

const KEY_BINDINGS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
  W: 'up',
  S: 'down',
  A: 'left',
  D: 'right',
}

function createCharacter() {
  const group = new THREE.Group()
  const matBody = new THREE.MeshStandardMaterial({
    color: 0x7c5cff,
    metalness: 0.7,
    roughness: 0.3,
  })
  const matAccent = new THREE.MeshStandardMaterial({
    color: 0x33e6ff,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x0e7480,
  })
  const matDark = new THREE.MeshStandardMaterial({
    color: 0x1a1a24,
    roughness: 0.5,
  })

  const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.1, 0.9), matBody)
  body.position.y = 1.3
  group.add(body)

  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.55, 0.15), matAccent)
  chest.position.set(0, 1.35, 0.5)
  group.add(chest)

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.7, 0.78), matBody)
  head.position.y = 2.15
  group.add(head)

  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.26, 0.14), matAccent)
  visor.position.set(0, 2.18, 0.4)
  group.add(visor)

  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), matDark)
  eyeL.position.set(-0.13, 2.18, 0.5)
  const eyeR = eyeL.clone()
  eyeR.position.x = 0.13
  group.add(eyeL, eyeR)

  const armGeo = new THREE.BoxGeometry(0.26, 0.95, 0.26)
  const armMat = new THREE.MeshStandardMaterial({
    color: 0x946bff,
    metalness: 0.6,
    roughness: 0.35,
  })
  const armL = new THREE.Mesh(armGeo, armMat)
  armL.position.set(-0.66, 1.35, 0)
  armL.rotation.z = 0.12
  const armR = new THREE.Mesh(armGeo, armMat)
  armR.position.set(0.66, 1.35, 0)
  armR.rotation.z = -0.12
  group.add(armL, armR)
  group.userData.armL = armL
  group.userData.armR = armR

  const legGeo = new THREE.BoxGeometry(0.3, 0.6, 0.34)
  const legMat = new THREE.MeshStandardMaterial({
    color: 0x14141c,
    roughness: 0.5,
  })
  const legL = new THREE.Mesh(legGeo, legMat)
  legL.position.set(-0.24, 0.45, 0)
  const legR = new THREE.Mesh(legGeo, legMat)
  legR.position.set(0.24, 0.45, 0)
  group.add(legL, legR)
  group.userData.legL = legL
  group.userData.legR = legR

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8), matDark)
  antenna.position.set(0, 2.62, 0)
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), matAccent)
  glow.position.y = 2.78
  group.add(antenna, glow)

  return group
}

function createOrb() {
  const material = new THREE.MeshStandardMaterial({
    color: 0x33e6ff,
    emissive: 0x1190a0,
    emissiveIntensity: 0.6,
    metalness: 0.4,
    roughness: 0.2,
  })
  const mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.55), material)
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.85, 0.03, 8, 32),
    new THREE.MeshBasicMaterial({ color: 0x33e6ff, transparent: true, opacity: 0.5 })
  )
  ring.rotation.x = Math.PI / 2
  const holder = new THREE.Group()
  holder.add(mesh, ring)
  return holder
}

function createObstacle() {
  const material = new THREE.MeshStandardMaterial({
    color: 0xff3355,
    emissive: 0x991133,
    emissiveIntensity: 0.5,
    metalness: 0.3,
    roughness: 0.4,
  })
  const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 0), material)
  return mesh
}

function createGround() {
  const grid = new THREE.GridHelper(40, 24, 0x7c5cff, 0x26264a)
  grid.position.y = -2.4
  grid.material.transparent = true
  grid.material.opacity = 0.5
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({
      color: 0x08080f,
      metalness: 0.4,
      roughness: 0.8,
    })
  )
  plane.rotation.x = -Math.PI / 2
  plane.position.y = -2.39
  return { grid, plane }
}

export default function Games() {
  const mountRef = useRef(null)
  const [phase, setPhase] = useState('menu') // menu | playing | over
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem('fz-drift-high')) || 0
    } catch {
      return 0
    }
  })
  const stateRef = useRef({ phase: 'menu', score: 0, lives: 3 })

  const startGame = useCallback(() => {
    stateRef.current = { phase: 'playing', score: 0, lives: 3 }
    setPhase('playing')
    setScore(0)
    setLives(3)
  }, [])

  useEffect(() => {
    setPhase(stateRef.current.phase)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let scene, camera, renderer
    let character, ground
    const orbs = []
    const obstacles = []
    const keys = {}
    let rafId
    let lastTime = 0
    let spawnTimer = 0
    let orbTimer = 0
    let invulnTimer = 0
    let walkPhase = 0
    const bounds = { x: 7, y: 4.5 }

    const width = mount.clientWidth
    const height = mount.clientHeight

    scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x06060a, 0.03)

    camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.set(0, 6, 12)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    mount.appendChild(renderer.domElement)

    const stars = (() => {
      const geo = new THREE.BufferGeometry()
      const count = 500
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 60
        pos[i * 3 + 1] = (Math.random() - 0.5) * 30
        pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 8
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      return new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color: 0x9d9dff, size: 0.08, transparent: true, opacity: 0.7 })
      )
    })()
    scene.add(stars)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const dirLight = new THREE.DirectionalLight(0xffffff, 2)
    dirLight.position.set(5, 10, 7)
    dirLight.castShadow = true
    scene.add(dirLight)
    const accentLight = new THREE.PointLight(0x7c5cff, 3, 20)
    accentLight.position.set(-4, 4, 4)
    scene.add(accentLight)
    const cyanLight = new THREE.PointLight(0x33e6ff, 2.5, 20)
    cyanLight.position.set(4, 2, 5)
    scene.add(cyanLight)

    ground = createGround()
    scene.add(ground.grid, ground.plane)

    character = createCharacter()
    character.position.set(0, 0, 0)
    character.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
      }
    })
    scene.add(character)

    const onKeyDown = (e) => {
      if (KEY_BINDINGS[e.key]) {
        keys[KEY_BINDINGS[e.key]] = true
        e.preventDefault()
      }
    }
    const onKeyUp = (e) => {
      if (KEY_BINDINGS[e.key]) keys[KEY_BINDINGS[e.key]] = false
    }

    let pointerDown = false
    let pointerTarget = new THREE.Vector2(0, 0)
    const onPointerDown = (e) => {
      pointerDown = true
      pointerTarget.set(
        ((e.clientX / window.innerWidth) * 2 - 1) * bounds.x,
        ((e.clientY / window.innerHeight) * 2 - 1) * bounds.y + 1.2
      )
    }
    const onPointerMove = (e) => {
      if (!pointerDown) return
      pointerTarget.set(
        ((e.clientX / window.innerWidth) * 2 - 1) * bounds.x,
        ((e.clientY / window.innerHeight) * 2 - 1) * bounds.y + 1.2
      )
    }
    const onPointerUp = () => {
      pointerDown = false
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    mount.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    const spawnOrb = () => {
      const orb = createOrb()
      orb.position.set(
        (Math.random() - 0.5) * bounds.x * 2,
        (Math.random() - 0.5) * bounds.y * 2,
        -10
      )
      scene.add(orb)
      orbs.push(orb)
    }

    const spawnObstacle = () => {
      const ob = createObstacle()
      ob.position.set(
        (Math.random() - 0.5) * bounds.x * 2,
        (Math.random() - 0.5) * bounds.y * 2,
        -12
      )
      const scale = 0.8 + Math.random() * 0.4
      ob.scale.set(scale, scale, scale)
      scene.add(ob)
      obstacles.push(ob)
    }

    const cameraTarget = new THREE.Vector3(0, 1, 0)

    const gameLoop = (timestamp) => {
      rafId = requestAnimationFrame(gameLoop)
      const dt = Math.min((timestamp - lastTime) / 1000, 0.05)
      lastTime = timestamp
      const state = stateRef.current

      const dirL = keys.left ? -1 : 0
      const dirR = keys.right ? 1 : 0
      const dirU = keys.up ? 1 : 0
      const dirD = keys.down ? -1 : 0
      const moveX = dirL + dirR
      let moveY = dirU + dirD

      if (pointerDown) {
        const speed = 0.3
        const desiredX = THREE.MathUtils.lerp(character.position.x, pointerTarget.x, speed * dt * 60)
        const desiredY = THREE.MathUtils.lerp(character.position.y, pointerTarget.y, speed * dt * 60)
        character.position.x = THREE.MathUtils.clamp(desiredX, -bounds.x, bounds.x)
        character.position.y = THREE.MathUtils.clamp(desiredY, -bounds.y, bounds.y)
      } else {
        const speed = 7
        character.position.x = THREE.MathUtils.clamp(
          character.position.x + moveX * speed * dt,
          -bounds.x,
          bounds.x
        )
        character.position.y = THREE.MathUtils.clamp(
          character.position.y + moveY * speed * dt,
          -bounds.y,
          bounds.y
        )
      }

      const moving = moveX !== 0 || moveY !== 0 || pointerDown
      if (moving) walkPhase += dt * 8

      character.userData.armL.rotation.x = Math.sin(walkPhase) * 0.5
      character.userData.armR.rotation.x = Math.sin(walkPhase + Math.PI) * 0.5
      character.userData.legL.rotation.x = Math.sin(walkPhase) * 0.4
      character.userData.legR.rotation.x = Math.sin(walkPhase + Math.PI) * 0.4
      character.rotation.y = THREE.MathUtils.lerp(character.rotation.y, moveX * 0.4, 0.1)

      stars.rotation.z += dt * 0.02

      if (state.phase === 'playing') {
        const speed = 6 + state.score * 0.02
        spawnTimer -= dt
        if (spawnTimer <= 0) {
          spawnObstacle()
          spawnTimer = Math.max(0.4, 1.1 - state.score * 0.004)
        }
        orbTimer -= dt
        if (orbTimer <= 0) {
          spawnOrb()
          orbTimer = Math.max(0.3, 0.9 - state.score * 0.003)
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
          const ob = obstacles[i]
          ob.position.z += speed * dt
          ob.rotation.x += dt * 2
          ob.rotation.y += dt * 2.4
          if (ob.position.z > 4) {
            scene.remove(ob)
            obstacles.splice(i, 1)
            continue
          }
          if (invulnTimer <= 0) {
            const dx = ob.position.x - character.position.x
            const dy = ob.position.y - character.position.y
            const dz = ob.position.z - character.position.z
            if (dx * dx + dy * dy + dz * dz < 1.6) {
              scene.remove(ob)
              obstacles.splice(i, 1)
              state.lives -= 1
              setLives(state.lives)
              invulnTimer = 1.2
              if (state.lives <= 0) {
                state.phase = 'over'
                try {
                  const hs = Math.max(state.score, Number(localStorage.getItem('fz-drift-high')) || 0)
                  localStorage.setItem('fz-drift-high', String(hs))
                  setHighScore(hs)
                } catch {}
                setPhase('over')
              }
            }
          }
        }

        if (invulnTimer > 0) {
          invulnTimer -= dt
          character.visible = Math.floor(performance.now() / 90) % 2 === 0
        } else {
          character.visible = true
        }

        for (let i = orbs.length - 1; i >= 0; i--) {
          const o = orbs[i]
          o.position.z += speed * 0.85 * dt
          o.rotation.y += dt * 3
          o.rotation.x += dt * 2
          if (o.position.z > 5) {
            scene.remove(o)
            orbs.splice(i, 1)
            continue
          }
          const dx = o.position.x - character.position.x
          const dy = o.position.y - character.position.y
          const dz = o.position.z - character.position.z
          if (dx * dx + dy * dy + dz * dz < 1.2) {
            scene.remove(o)
            orbs.splice(i, 1)
            state.score += 10
            setScore(state.score)
          }
        }
      }

      cameraTarget.lerp(
        new THREE.Vector3(character.position.x * 0.3, 1.5 + character.position.y * 0.1, 0),
        0.06
      )
      camera.position.x += (cameraTarget.x + 0 - camera.position.x) * 0.08
      camera.position.y += (cameraTarget.y - camera.position.y) * 0.08
      camera.lookAt(cameraTarget.x, cameraTarget.y * 0.8, 0)

      renderer.render(scene, camera)
    }

    spawnTimer = 1.2
    orbTimer = 0.6
    for (let i = 0; i < 6; i++) spawnOrb()
    rafId = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', onResize)
      mount.removeEventListener('pointerdown', onPointerDown)
      renderer.dispose()
      while (mount.firstChild) mount.removeChild(mount.firstChild)
    }
  }, [])

  return (
    <PageTransition>
      <section id="games" className="relative flex min-h-screen flex-col items-center justify-center pt-24">
        <div className="container-x py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">&#9670;</span>
            <span className="h-px w-10 bg-line"></span>
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Neon <span className="text-gradient">Drift</span>
              </h2>
              <p className="mt-1 text-sm text-white/50">
                A little 3D character I built with WebGL. Dodge the red mines, grab the orbs.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-line bg-bg/40 backdrop-blur-md">
            <div ref={mountRef} className="h-[520px] w-full md:h-[560px]" />

            {phase === 'menu' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-bg/70 backdrop-blur-sm">
                <h3 className="text-3xl font-extrabold md:text-4xl">
                  Ready to <span className="text-gradient">drift?</span>
                </h3>
                <p className="max-w-md text-center text-sm text-white/60">
                  Move with <span className="font-mono text-cyan">W A S D</span> or{' '}
                  <span className="font-mono text-cyan">arrow keys</span> — or drag with mouse.
                  Grab orbs, dodge mines, 3 lives.
                </p>
                <button
                  onClick={startGame}
                  className="group rounded-full bg-gradient-to-r from-accent to-cyan px-10 py-4 text-sm font-semibold transition-transform duration-200 hover:scale-105"
                >
                  Start Game{' '}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    &#9654;
                  </span>
                </button>
                {highScore > 0 && (
                  <p className="font-mono text-xs text-white/40">
                    HIGH SCORE: {highScore}
                  </p>
                )}
              </div>
            )}

            {phase === 'over' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-bg/70 backdrop-blur-sm">
                <h3 className="text-3xl font-extrabold text-pink md:text-4xl">
                  Game Over
                </h3>
                <p className="font-mono text-white/60">
                  SCORE: <span className="text-gradient font-bold">{score}</span>
                  {score >= highScore && score > 0 && '  — NEW HIGH!'}
                </p>
                <button
                  onClick={startGame}
                  className="group rounded-full bg-gradient-to-r from-accent to-cyan px-10 py-4 text-sm font-semibold transition-transform duration-200 hover:scale-105"
                >
                  Play Again{' '}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    &#9654;
                  </span>
                </button>
              </div>
            )}

            {phase === 'playing' && (
              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-6">
                <span className="rounded-full border border-line bg-bg/60 px-4 py-2 font-mono text-sm text-white/70 backdrop-blur-md">
                  SCORE: <span className="text-gradient font-bold">{score}</span>
                </span>
                <span className="rounded-full border border-line bg-bg/60 px-4 py-2 font-mono text-sm text-white/70 backdrop-blur-md">
                  {'❤️'.repeat(Math.max(0, lives))}
                  <span className="opacity-30">{'❤️'.repeat(Math.max(0, 3 - lives))}</span>
                </span>
              </div>
            )}
          </div>

          <p className="mt-4 text-center font-mono text-xs text-white/30">
            Built with React + Three.js &middot; runs entirely in your browser &middot; no backend
          </p>
        </div>

        <ContactCta />
      </section>
    </PageTransition>
  )
}