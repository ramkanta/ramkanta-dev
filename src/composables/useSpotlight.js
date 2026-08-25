/**
 * v-spotlight — publishes the pointer position on the host element as
 * --mx / --my custom properties, so children can light up a radial gradient
 * that tracks the cursor.
 *
 * Used on the hairline card grids: a tilt or lift would break their seamless
 * 1px seams, but a gradient sitting inside each cell does not move anything.
 */
const isCoarse = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const vSpotlight = {
  mounted(el) {
    if (isCoarse()) return

    let frame = 0
    let pending = null

    const apply = () => {
      frame = 0
      if (!pending) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${pending.clientX - rect.left}px`)
      el.style.setProperty('--my', `${pending.clientY - rect.top}px`)
    }

    const onMove = (e) => {
      pending = e
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onEnter = () => el.style.setProperty('--spot', '1')
    const onLeave = () => el.style.setProperty('--spot', '0')

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)

    el._spotlight = () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
    }
  },
  unmounted(el) {
    el._spotlight?.()
  },
}
