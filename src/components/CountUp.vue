<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  duration: { type: Number, default: 1400 },
})

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The number a screen reader announces — always the true final value,
// never the mid-animation digits.
const finalText = computed(() => `${props.value}${props.suffix}`)

// Animate only as an enhancement; without JS or with reduced motion the
// real number is what renders.
const shown = ref(reduced ? props.value : 0)

const el = ref(null)
let io
let frame

function run() {
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min(1, (now - start) / props.duration)
    // easeOutExpo — fast start, long settle
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    shown.value = Math.round(eased * props.value)
    if (t < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (reduced || !el.value) return

  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        run()
        io.unobserve(entry.target)
      }
    },
    { threshold: 0.4 },
  )
  io.observe(el.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="el" class="countup" :aria-label="finalText">
    <span aria-hidden="true">{{ shown }}{{ suffix }}</span>
  </span>
</template>

<style scoped>
.countup {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
}
</style>
