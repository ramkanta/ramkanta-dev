<script setup>
import { project } from '../data/content'
import SheetHead from './SheetHead.vue'
import OrderFlowDiagram from './OrderFlowDiagram.vue'
</script>

<template>
  <section id="work" class="section">
    <div class="shell">
      <SheetHead n="04" label="Selected work" count="1 case study" />

      <!-- Header ------------------------------------------- -->
      <div class="case__head">
        <div>
          <p class="case__kicker" v-reveal>
            <span>{{ project.kicker }}</span>
            <span class="case__kicker-rule" aria-hidden="true" />
            <span>{{ project.eyebrow }}</span>
          </p>
          <h2 class="case__title" v-reveal="60">{{ project.title }}</h2>
          <p class="case__summary" v-reveal="120">{{ project.summary }}</p>

          <ul class="case__stack" v-reveal="180">
            <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
          </ul>
        </div>

        <dl class="case__meta" v-reveal="240">
          <div v-for="m in project.meta" :key="m.key" class="case__meta-row">
            <dt class="mono-label">{{ m.key }}</dt>
            <dd>{{ m.value }}</dd>
          </div>
        </dl>
      </div>

      <!-- Diagram ------------------------------------------ -->
      <div class="case__diagram" v-reveal>
        <OrderFlowDiagram />
      </div>

      <!-- Narrative blocks --------------------------------- -->
      <div class="case__blocks">
        <article
          v-for="(b, i) in project.blocks"
          :key="b.n"
          class="block"
          v-reveal="i * 80"
        >
          <span class="block__n">{{ b.n }}</span>
          <div>
            <h3 class="block__title">{{ b.title }}</h3>
            <p class="block__body">{{ b.body }}</p>
          </div>
        </article>
      </div>

      <!-- Admin modules ------------------------------------ -->
      <div class="modules" v-reveal>
        <div class="modules__head">
          <span class="mono-label">Admin surface</span>
          <p class="modules__title">
            {{ project.modules.length }} modules, one permission model
          </p>
        </div>
        <ul class="modules__grid" v-spotlight>
          <li v-for="(m, i) in project.modules" :key="m" class="module">
            <span class="module__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>{{ m }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Header ---------------------------------------------------- */
.case__head {
  display: grid;
  gap: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}

.case__kicker {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}
.case__kicker-rule {
  width: 28px;
  height: 1px;
  background: var(--accent-line);
}
.case__kicker span:last-child { color: var(--ink-3); }

.case__title {
  margin-top: 1.1rem;
  font-size: clamp(2rem, 5.5vw, 3.6rem);
  letter-spacing: -0.045em;
  max-width: 16ch;
}

.case__summary {
  margin-top: 1.35rem;
  max-width: 56ch;
  font-size: clamp(1rem, 1.7vw, 1.15rem);
  line-height: 1.65;
  color: var(--ink-2);
}

.case__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.75rem;
}
.case__stack li {
  padding: 0.4rem 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: var(--ink-2);
  border: 1px solid var(--rule-strong);
  border-radius: 100px;
}

/* Meta ------------------------------------------------------ */
.case__meta {
  align-self: start;
  border: 1px solid var(--rule);
  background: var(--paper-sunk);
}
.case__meta-row {
  padding: 0.95rem 1.15rem;
  border-bottom: 1px solid var(--rule);
}
.case__meta-row:last-child { border-bottom: none; }
.case__meta-row dd {
  margin-top: 0.3rem;
  font-size: 0.92rem;
  font-weight: 500;
}

.case__diagram { margin-bottom: clamp(2.5rem, 6vw, 4rem); }

/* Blocks ---------------------------------------------------- */
.case__blocks {
  display: grid;
  gap: 1px;
  background: var(--rule);
  border-block: 1px solid var(--rule);
}

.block {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.15rem;
  padding: clamp(1.5rem, 3.5vw, 2.25rem) 0;
  background: var(--paper);
}

.block__n {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--accent);
  padding-top: 0.35rem;
}

.block__title {
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  letter-spacing: -0.03em;
}

.block__body {
  margin-top: 0.7rem;
  max-width: 62ch;
  font-size: 0.96rem;
  line-height: 1.68;
  color: var(--ink-2);
}

/* Modules --------------------------------------------------- */
.modules { margin-top: clamp(2.5rem, 6vw, 4rem); }

.modules__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1.25rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--rule);
}

.modules__title {
  font-size: clamp(1.1rem, 2.4vw, 1.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
}

.modules__grid {
  --spot: 0;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1px;
  background: var(--rule);
  border: 1px solid var(--rule);
  border-top: none;
}

.module {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.95rem 1.1rem;
  background: var(--paper);
  font-size: 0.88rem;
  font-weight: 500;
  transition: background-color 0.3s var(--ease), color 0.3s var(--ease);
}
.module:hover { background: var(--paper-raised); color: var(--accent); }

/* One light source sweeping the whole module grid. */
.modules__grid::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--spot, 0);
  transition: opacity 0.4s var(--ease);
  background: radial-gradient(
    240px circle at var(--mx, 50%) var(--my, 50%),
    color-mix(in srgb, var(--accent) 10%, transparent),
    transparent 68%
  );
}

.module__n {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--ink-4);
}

@media (min-width: 980px) {
  .case__head { grid-template-columns: 3fr minmax(240px, 1fr); }
  .case__blocks { grid-template-columns: repeat(2, 1fr); column-gap: clamp(2rem, 5vw, 4rem); }
  .block { padding-inline: 0; }
}
</style>
