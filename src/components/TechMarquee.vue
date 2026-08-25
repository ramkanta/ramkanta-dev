<script setup>
import { marquee } from '../data/content'
</script>

<template>
  <section class="marquee" aria-label="Technologies">
    <div class="marquee__row">
      <div class="marquee__track">
        <span v-for="(t, i) in [...marquee.top, ...marquee.top]" :key="`t${i}`" class="chip">
          {{ t }}<i aria-hidden="true">◆</i>
        </span>
      </div>
    </div>

    <div class="marquee__row">
      <div class="marquee__track marquee__track--reverse">
        <span v-for="(t, i) in [...marquee.bottom, ...marquee.bottom]" :key="`b${i}`" class="chip">
          {{ t }}<i aria-hidden="true">◆</i>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  border-block: 1px solid var(--rule);
  background: var(--paper-sunk);
  overflow: hidden;
  padding-block: 0.15rem;
  /* Fade the edges so text does not collide with the viewport border */
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.marquee__row { overflow: hidden; }
.marquee__row + .marquee__row { border-top: 1px solid var(--rule); }

.marquee__track {
  display: flex;
  width: max-content;
  animation: slide 44s linear infinite;
}
.marquee__track--reverse { animation-direction: reverse; }

.marquee:hover .marquee__track { animation-play-state: paused; }

@keyframes slide {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 1.4rem;
  padding: 0.8rem 0;
  padding-right: 1.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-2);
  white-space: nowrap;
}

.chip i {
  font-style: normal;
  font-size: 0.42rem;
  color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
  .marquee__row:last-child { display: none; }
}
</style>
