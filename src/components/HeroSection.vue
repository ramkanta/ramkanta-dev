<script setup>
import { profile, specs, stats } from '../data/content'
import CountUp from './CountUp.vue'
import HeroCanvas from './HeroCanvas.vue'
</script>

<template>
  <section id="top" class="hero">
    <!-- Faint blueprint grid, purely decorative -->
    <div class="hero__grid" aria-hidden="true" />

    <!-- WebGL terrain. Self-disables under reduced motion or without WebGL,
         in which case the grid above carries the background alone. -->
    <HeroCanvas />

    <div class="shell hero__inner">
      <p class="hero__status" v-reveal>
        <span class="hero__dot" aria-hidden="true" />
        {{ profile.available }}
      </p>

      <h1 class="hero__name">
        <span class="hero__line" v-reveal="60">{{ profile.first }}</span>
        <span class="hero__line hero__line--accent" v-reveal="140">{{ profile.last }}</span>
      </h1>

      <div class="hero__rule reveal-rule" v-reveal="240" />

      <p class="hero__stack mono-label" v-reveal="300">{{ profile.stack }}</p>

      <p class="hero__summary" v-reveal="360">{{ profile.summary }}</p>

      <div class="hero__cta" v-reveal="420">
        <a class="btn btn--accent" href="#work">
          <span>See the work</span>
          <svg class="btn__arrow" viewBox="0 0 16 16" width="14" height="14" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
        <a class="btn btn--ghost" :href="`mailto:${profile.email}`">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor"
               stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="3.5" width="12" height="9" rx="1" />
            <path d="m2.5 4.5 5.5 4 5.5-4" />
          </svg>
          <span>Email me</span>
        </a>
      </div>

      <!-- Drawing title block ---------------------------------- -->
      <dl class="titleblock" v-reveal="480">
        <div v-for="spec in specs" :key="spec.key" class="titleblock__cell">
          <dt class="titleblock__key">{{ spec.key }}</dt>
          <dd class="titleblock__value">{{ spec.value }}</dd>
        </div>
      </dl>

      <!-- Metrics --------------------------------------------- -->
      <ul class="metrics" v-reveal="540">
        <li v-for="stat in stats" :key="stat.label" class="metric">
          <span class="metric__value">
            <CountUp :value="stat.value" :suffix="stat.suffix" />
          </span>
          <span class="metric__label">{{ stat.label }}</span>
        </li>
      </ul>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span class="mono-label">Scroll</span>
      <span class="hero__scroll-line" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: clamp(7rem, 16vh, 11rem);
  padding-bottom: clamp(5rem, 11vw, 9rem);
  overflow: hidden;
  isolation: isolate;
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, var(--rule) 1px, transparent 1px),
    linear-gradient(to bottom, var(--rule) 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: 0.28;
  mask-image: radial-gradient(120% 80% at 50% 0%, #000 20%, transparent 78%);
  -webkit-mask-image: radial-gradient(120% 80% at 50% 0%, #000 20%, transparent 78%);
  pointer-events: none;
}

.hero__inner { position: relative; z-index: 1; }

/* Availability --------------------------------------------- */
.hero__status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-2);
  padding: 0.4rem 0.85rem 0.4rem 0.7rem;
  border: 1px solid var(--rule-strong);
  border-radius: 100px;
  background: var(--paper-raised);
}

.hero__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent);
  animation: pulse 2.4s ease-out infinite;
}

@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 55%, transparent); }
  70%  { box-shadow: 0 0 0 7px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}

/* Name ------------------------------------------------------ */
.hero__name {
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  font-size: clamp(3.2rem, 13vw, 9.5rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.055em;
}

.hero__line { display: block; }
.hero__line--accent { color: var(--accent); }

.hero__rule {
  height: 1px;
  background: var(--rule-strong);
  margin-top: clamp(1.5rem, 4vw, 2.5rem);
}

.hero__stack {
  margin-top: 1rem;
  font-size: clamp(0.62rem, 1.5vw, 0.75rem);
  letter-spacing: 0.2em;
  color: var(--ink-2);
}

.hero__summary {
  margin-top: 2rem;
  max-width: 54ch;
  font-size: clamp(1.02rem, 1.7vw, 1.2rem);
  line-height: 1.62;
  color: var(--ink-2);
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.25rem;
}

/* Title block ---------------------------------------------- */
.titleblock {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: clamp(3rem, 7vw, 4.5rem);
  border: 1px solid var(--rule);
  background: var(--paper-raised);
}

.titleblock__cell {
  padding: 1rem 1.15rem;
  border-bottom: 1px solid var(--rule);
}
.titleblock__cell:last-child { border-bottom: none; }

.titleblock__key {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-4);
}

.titleblock__value {
  margin-top: 0.4rem;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--ink);
}

/* Metrics --------------------------------------------------- */
.metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  margin-top: 1px;
  background: var(--rule);
  border: 1px solid var(--rule);
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.4rem 1.15rem;
  background: var(--paper);
}

.metric__value {
  font-size: clamp(1.9rem, 4.5vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1;
}

.metric__label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
  line-height: 1.45;
}

/* Scroll cue ------------------------------------------------ */
.hero__scroll {
  display: none;
  position: absolute;
  right: var(--gutter);
  bottom: clamp(4rem, 9vw, 7rem);
  align-items: center;
  gap: 0.8rem;
  writing-mode: vertical-rl;
}
.hero__scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--rule-strong), transparent);
}

/* Breakpoints ----------------------------------------------- */
@media (min-width: 640px) {
  .titleblock { grid-template-columns: repeat(2, 1fr); }
  .titleblock__cell { border-right: 1px solid var(--rule); }
  .titleblock__cell:nth-child(2n) { border-right: none; }
  .titleblock__cell:nth-last-child(-n + 2) { border-bottom: none; }
  .metrics { grid-template-columns: repeat(4, 1fr); }
}

@media (min-width: 1100px) {
  .titleblock { grid-template-columns: repeat(4, 1fr); }
  .titleblock__cell { border-bottom: none; }
  .titleblock__cell:nth-child(2n) { border-right: 1px solid var(--rule); }
  .titleblock__cell:last-child { border-right: none; }
  .hero__scroll { display: flex; }
}
</style>
