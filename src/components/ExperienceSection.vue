<script setup>
import { experience, environment } from '../data/content'
import SheetHead from './SheetHead.vue'

/**
 * Splits "shipped {70+ endpoints} in NestJS" into tokens so the braced
 * spans can render as emphasis without putting HTML in the data file.
 */
function tokens(text) {
  return text.split(/(\{[^}]+\})/g).filter(Boolean).map((part) =>
    part.startsWith('{') && part.endsWith('}')
      ? { mark: true, text: part.slice(1, -1) }
      : { mark: false, text: part },
  )
}
</script>

<template>
  <section id="experience" class="section">
    <div class="shell">
      <SheetHead n="03" label="Experience" count="InfluxIQ Tech · 2025 →" />

      <h2 class="section-title" v-reveal>Shipping production systems since day one.</h2>
      <p class="section-lede" v-reveal="80">
        Two roles at the same company — a three-month structured programme, then full ownership of
        API contracts across two production domains.
      </p>

      <div class="timeline">
        <article
          v-for="(role, i) in experience"
          :key="role.id"
          class="role"
          v-reveal="i * 100"
        >
          <!-- Meta column ---------------------------------- -->
          <div class="role__meta">
            <div class="role__marker" aria-hidden="true">
              <span class="role__dot" :class="{ 'is-current': role.current }" />
            </div>
            <p class="role__period mono-label">{{ role.period }}</p>
            <p v-if="role.current" class="role__badge">Current</p>
            <p class="role__place">{{ role.place }}</p>
          </div>

          <!-- Body column ---------------------------------- -->
          <div class="role__body">
            <h3 class="role__title">{{ role.title }}</h3>
            <p class="role__company">{{ role.company }}</p>

            <ul class="role__points">
              <li v-for="(point, j) in role.points" :key="j" class="point">
                <span class="point__n" aria-hidden="true">
                  {{ String(j + 1).padStart(2, '0') }}
                </span>
                <p class="point__text">
                  <template v-for="(tok, k) in tokens(point.text)" :key="k">
                    <strong v-if="tok.mark" class="mark">{{ tok.text }}</strong>
                    <template v-else>{{ tok.text }}</template>
                  </template>
                </p>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <!-- Environment ------------------------------------- -->
      <div class="environment" v-reveal>
        <span class="mono-label">Environment</span>
        <ul class="environment__list">
          <li v-for="tech in environment" :key="tech">{{ tech }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline { margin-top: clamp(2.5rem, 6vw, 4rem); }

.role {
  display: grid;
  gap: 1.5rem;
  padding-block: clamp(2rem, 5vw, 3rem);
  border-top: 1px solid var(--rule);
}

/* Meta ----------------------------------------------------- */
.role__meta { display: flex; flex-direction: column; gap: 0.55rem; }

.role__marker { display: flex; align-items: center; height: 10px; }

.role__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1.5px solid var(--rule-strong);
  background: var(--paper);
}
.role__dot.is-current {
  background: var(--accent);
  border-color: var(--accent);
}

.role__period { color: var(--ink); font-weight: 600; }

.role__badge {
  align-self: flex-start;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--accent-line);
  background: var(--accent-wash);
  border-radius: 100px;
}

.role__place { font-size: 0.85rem; color: var(--ink-3); }

/* Body ----------------------------------------------------- */
.role__title {
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  letter-spacing: -0.035em;
}

.role__company {
  margin-top: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.role__points {
  display: grid;
  gap: 0.15rem;
  margin-top: 1.75rem;
}

.point {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 0.9rem 0;
  border-top: 1px solid var(--rule);
}
.point:first-child { border-top: none; padding-top: 0; }

.point__n {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  color: var(--ink-4);
  padding-top: 0.32rem;
}

.point__text {
  font-size: 0.97rem;
  line-height: 1.66;
  color: var(--ink-2);
  max-width: 66ch;
}

.mark {
  font-weight: 600;
  color: var(--ink);
  box-shadow: inset 0 -0.42em 0 var(--accent-wash);
}

/* Environment ---------------------------------------------- */
.environment {
  display: grid;
  gap: 0.85rem;
  padding-top: clamp(1.75rem, 4vw, 2.5rem);
  border-top: 1px solid var(--rule);
}

.environment__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.9rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--ink-2);
}

.environment__list li { display: flex; align-items: center; gap: 0.9rem; }
.environment__list li:not(:last-child)::after {
  content: '';
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--accent);
}

@media (min-width: 860px) {
  .role { grid-template-columns: minmax(190px, 1fr) 3fr; gap: clamp(2rem, 5vw, 4rem); }
  .role__meta { position: sticky; top: 100px; align-self: start; }
  .environment { grid-template-columns: minmax(190px, 1fr) 3fr; gap: clamp(2rem, 5vw, 4rem); }
}
</style>
