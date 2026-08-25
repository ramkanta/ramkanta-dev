<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const host = ref(null)
const ready = ref(false)

/* Everything three.js touches lives here so teardown can be exhaustive. */
let ctx = null
let cleanup = []

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

/** Reads a CSS custom property so the scene always matches the active theme. */
function token(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

async function init() {
  const THREE = await import('three')
  const { vertexShader, fragmentShader, buildGridPositions } =
    await import('../webgl/terrain.js')

  if (!host.value) return

  const el = host.value
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const SEGMENTS = coarse ? 54 : 104
  const SIZE = 42
  const RADIUS = SIZE * 0.5

  /* ---- renderer ---- */
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: !coarse,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 1.75))
  renderer.setClearColor(0x000000, 0)
  el.appendChild(renderer.domElement)
  renderer.domElement.setAttribute('aria-hidden', 'true')

  /* ---- scene ---- */
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 160)
  camera.up.set(0, 0, 1)
  camera.position.set(0, -19, 10.5)
  camera.lookAt(0, 3, 0)

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(buildGridPositions(SEGMENTS, SIZE), 3),
  )

  const uniforms = {
    uTime:       { value: 0 },
    uPointer:    { value: new THREE.Vector2(0, 0) },
    uPointerAmt: { value: 0 },
    uAmp:        { value: 1.55 },
    uRadius:     { value: RADIUS },
    uInk:        { value: new THREE.Color(token('--ink-3') || '#8b847a') },
    uAccent:     { value: new THREE.Color(token('--accent') || '#c2410c') },
    uOpacity:    { value: 0 }, // fades in once the first frame is ready
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  })

  const mesh = new THREE.LineSegments(geometry, material)
  scene.add(mesh)

  /* ---- pointer → plane coordinates ---- */
  const raycaster = new THREE.Raycaster()
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  const ndc = new THREE.Vector2()
  const hit = new THREE.Vector3()
  const targetPointer = new THREE.Vector2(0, 0)
  let targetPointerAmt = 0

  function onPointerMove(e) {
    const r = el.getBoundingClientRect()
    if (e.clientY < r.top || e.clientY > r.bottom) {
      targetPointerAmt = 0
      return
    }
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1
    raycaster.setFromCamera(ndc, camera)
    if (raycaster.ray.intersectPlane(plane, hit)) {
      targetPointer.set(hit.x, hit.y)
      targetPointerAmt = 1
    }
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  cleanup.push(() => window.removeEventListener('pointermove', onPointerMove))

  /* ---- resize ---- */
  function resize() {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  cleanup.push(() => ro.disconnect())
  resize()

  /* ---- only run while actually on screen ---- */
  let onScreen = true
  const io = new IntersectionObserver(
    ([entry]) => { onScreen = entry.isIntersecting },
    { threshold: 0 },
  )
  io.observe(el)
  cleanup.push(() => io.disconnect())

  /* ---- context loss ---- */
  function onLost(e) { e.preventDefault(); stop() }
  renderer.domElement.addEventListener('webglcontextlost', onLost)
  cleanup.push(() =>
    renderer.domElement.removeEventListener('webglcontextlost', onLost))

  /* ---- theme ---- */
  const mo = new MutationObserver(() => {
    uniforms.uInk.value.set(token('--ink-3') || '#8b847a')
    uniforms.uAccent.value.set(token('--accent') || '#c2410c')
  })
  mo.observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme'],
  })
  cleanup.push(() => mo.disconnect())

  /* ---- loop ---- */
  let raf = 0
  let last = performance.now()
  let running = true
  const OPACITY = coarse ? 0.5 : 0.62

  function stop() {
    running = false
    cancelAnimationFrame(raf)
  }

  function frame(now) {
    raf = requestAnimationFrame(frame)
    if (!running) return

    // Clamp dt so a backgrounded tab does not jump the animation on return.
    const dt = Math.min((now - last) / 1000, 1 / 30)
    last = now

    if (!onScreen || document.hidden) return

    uniforms.uTime.value += dt

    // Ease the pointer so the ripple trails the cursor instead of snapping.
    uniforms.uPointer.value.lerp(targetPointer, 1 - Math.pow(0.001, dt))
    uniforms.uPointerAmt.value +=
      (targetPointerAmt - uniforms.uPointerAmt.value) * (1 - Math.pow(0.02, dt))

    // Fade in on the first frames, then hold.
    uniforms.uOpacity.value += (OPACITY - uniforms.uOpacity.value) * (1 - Math.pow(0.15, dt))

    // Scroll parallax: the sheet sinks and tips as the hero leaves.
    const t = Math.min(1, Math.max(0, window.scrollY / (el.clientHeight || 1)))
    camera.position.z = 10.5 + t * 7
    camera.position.y = -19 + t * 4
    camera.lookAt(0, 3 - t * 3, 0)

    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(frame)
  cleanup.push(stop)

  ctx = { renderer, geometry, material, scene }
  ready.value = true
}

onMounted(() => {
  if (reducedMotion() || !webglAvailable()) return
  // Defer past first paint so the hero text is never blocked by the import.
  const start = () => init().catch(() => { ready.value = false })
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1200 })
  else setTimeout(start, 200)
})

onBeforeUnmount(() => {
  cleanup.forEach((fn) => fn())
  cleanup = []
  if (!ctx) return
  ctx.geometry.dispose()
  ctx.material.dispose()
  ctx.renderer.dispose()
  ctx.renderer.domElement.remove()
  ctx = null
})
</script>

<template>
  <div ref="host" class="hero-canvas" :class="{ 'is-ready': ready }" aria-hidden="true" />
</template>

<style scoped>
.hero-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.2s var(--ease);
  /* Keep the mesh off the text: strongest bottom-right, gone top-left. */
  mask-image: radial-gradient(120% 95% at 78% 88%, #000 8%, rgba(0,0,0,0.55) 42%, transparent 76%);
  -webkit-mask-image: radial-gradient(120% 95% at 78% 88%, #000 8%, rgba(0,0,0,0.55) 42%, transparent 76%);
}

.hero-canvas.is-ready { opacity: 1; }

.hero-canvas :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
