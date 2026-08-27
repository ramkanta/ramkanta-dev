import { onMounted, onBeforeUnmount, ref } from 'vue'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * v-reveal directive.
 * Adds `is-visible` once the element scrolls into view, then stops observing.
 * Value (a number) sets a stagger delay in ms.
 *
 *   <div v-reveal>            → reveals with no delay
 *   <div v-reveal="i * 60">   → staggered
 */
export const vReveal = {
  mounted(el, binding) {
    const delay = Number(binding.value) || 0
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    if (!el.classList.contains('reveal-rule')) el.classList.add('reveal')

    if (prefersReducedMotion()) {
      el.classList.add('is-visible')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    el._revealObserver = io
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
  /* Prerendered HTML carries the class already, so hydration does not flash
     the content in and straight back out. */
  getSSRProps() {
    return { class: 'reveal' }
  },
}

/**
 * Tracks which section is currently in view, for the index rail and nav.
 * Returns a ref holding the active section id.
 */
export function useActiveSection(ids) {
  const active = ref(ids[0])
  let io

  onMounted(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    io = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length) active.value = visible[0].target.id
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    targets.forEach((t) => io.observe(t))
  })

  onBeforeUnmount(() => io?.disconnect())

  return active
}

/** Scroll progress 0→1 for the top bar. */
export function useScrollProgress() {
  const progress = ref(0)

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return progress
}
