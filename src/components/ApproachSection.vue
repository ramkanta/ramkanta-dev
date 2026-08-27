<script setup>
import { principles, profile, education } from '../data/content'
import SheetHead from './SheetHead.vue'
</script>

<template>
  <section id="approach" class="section">
    <div class="shell">
      <SheetHead n="01" label="Approach" :count="`${principles.length} principles`" />

      <div class="intro">
        <!-- Portrait plate. Descriptive filename and alt text, sitting next to
             the text that describes him — which is what image search reads. -->
        <figure class="portrait" v-reveal>
          <img
            src="/ramkanta-pramanik.jpg"
            width="460"
            height="460"
            decoding="async"
            loading="lazy"
            alt="Ramkanta Pramanik, full stack developer at InfluxIQ Tech in Kalyani, West Bengal, India"
          />
          <figcaption class="portrait__cap">
            <span class="mono-label">Fig. 00</span>
            <span>{{ profile.name }} — {{ profile.role }}</span>
          </figcaption>
        </figure>

        <div class="intro__text">
        <h2 class="section-title" v-reveal>
          I build the layer that has to be right.
        </h2>
        <div class="intro__body">
          <p class="section-lede" v-reveal="80">
            I am Ramkanta Pramanik, a full stack developer based in Kalyani, West Bengal, and a
            Software Developer at InfluxIQ Tech since June 2025. Healthcare records on one platform,
            live payments on another. Both are domains where a quiet bug is worse than a loud one —
            so validation, access control and reconciliation are where I spend my attention, not
            where I clean up afterwards.
          </p>
          <p class="section-lede" v-reveal="140">
            I work across the whole stack — React and Next.js interfaces, the NestJS and Node.js
            APIs behind them, and the Docker and GitHub Actions pipelines that ship them. The four
            ideas below held on every system I have shipped, and each names the artefact it actually
            produces, because a principle you cannot point at in the repository is just a preference.
          </p>
        </div>
        </div>
      </div>

      <ol class="principles" v-spotlight>
        <li
          v-for="(p, i) in principles"
          :key="p.n"
          class="principle"
          v-reveal="i * 80"
        >
          <div class="principle__head">
            <span class="principle__n">{{ p.n }}</span>
            <h3 class="principle__title">{{ p.title }}</h3>
          </div>
          <p class="principle__body">{{ p.body }}</p>
          <p class="principle__artefact">
            <span aria-hidden="true">↳</span> {{ p.artefact }}
          </p>
        </li>
      </ol>

      <!-- Context strip ------------------------------------- -->
      <dl class="context" v-reveal>
        <div class="context__cell">
          <dt class="mono-label">Based in</dt>
          <dd>{{ profile.location }}</dd>
        </div>
        <div class="context__cell">
          <dt class="mono-label">Education</dt>
          <dd>{{ education.degree }}<br /><span>{{ education.school }} · {{ education.period }}</span></dd>
        </div>
        <div class="context__cell">
          <dt class="mono-label">Working style</dt>
          <dd>Five-person team, two-week sprints<br /><span>API contracts, design review, PR review</span></dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.intro {
  display: grid;
  gap: clamp(1.75rem, 4vw, 3rem);
  margin-bottom: clamp(3rem, 7vw, 5rem);
}

.intro__text { display: grid; gap: 1.5rem; align-content: start; }

.intro__body { display: grid; gap: 1.1rem; }

/* Portrait --------------------------------------------------- */
.portrait {
  margin: 0;
  align-self: start;   /* do not stretch to the height of the text column */
  max-width: 280px;
  border: 1px solid var(--rule);
  background: var(--paper-raised);
}

.portrait img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  /* Sits on warm paper, so take a little of the clinical blue out of it */
  filter: saturate(0.92) contrast(1.02);
}

.portrait__cap {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.75rem;
  padding: 0.7rem 0.85rem;
  border-top: 1px solid var(--rule);
  font-size: 0.78rem;
  color: var(--ink-3);
  line-height: 1.35;
}

.principles {
  --spot: 0;
  position: relative;
  display: grid;
  gap: 1px;
  background: var(--rule);
  border: 1px solid var(--rule);
}

/* Cursor-tracked wash sitting on the grid itself, so it reads as one light
   source crossing all four cells rather than four independent glows. */
.principles::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--spot, 0);
  transition: opacity 0.45s var(--ease);
  background: radial-gradient(
    300px circle at var(--mx, 50%) var(--my, 50%),
    color-mix(in srgb, var(--accent) 10%, transparent),
    transparent 70%
  );
}

.principle {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: clamp(1.5rem, 3.5vw, 2.25rem);
  background: var(--paper);
  transition: background-color 0.35s var(--ease);
}
.principle:hover { background: var(--paper-raised); }

.principle__head { display: flex; align-items: baseline; gap: 0.9rem; }

.principle__n {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--accent);
  flex-shrink: 0;
}

.principle__title {
  font-size: clamp(1.15rem, 2.2vw, 1.4rem);
  letter-spacing: -0.03em;
  max-width: 22ch;
}

.principle__body {
  color: var(--ink-2);
  font-size: 0.96rem;
  line-height: 1.65;
  max-width: 52ch;
}

.principle__artefact {
  margin-top: auto;
  padding-top: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.principle__artefact span { color: var(--accent); }

/* Context ---------------------------------------------------- */
.context {
  display: grid;
  gap: 1px;
  margin-top: 1px;
  background: var(--rule);
  border: 1px solid var(--rule);
}

.context__cell {
  padding: 1.35rem clamp(1.5rem, 3.5vw, 2.25rem);
  background: var(--paper-sunk);
}

.context__cell dd {
  margin-top: 0.5rem;
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.5;
}
.context__cell dd span {
  font-weight: 400;
  color: var(--ink-3);
  font-size: 0.85rem;
}

@media (min-width: 700px) {
  .principles { grid-template-columns: repeat(2, 1fr); }
  .context { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 760px) {
  .intro { grid-template-columns: minmax(200px, 260px) 1fr; }
}

@media (min-width: 1100px) {
  .intro { grid-template-columns: 260px 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); }
  .intro__text { display: contents; }
}
</style>
