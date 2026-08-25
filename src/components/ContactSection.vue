<script setup>
import { profile } from '../data/content'
import SheetHead from './SheetHead.vue'

const channels = [
  { key: 'Email',    value: profile.email,               href: `mailto:${profile.email}` },
  { key: 'Phone',    value: profile.phone,               href: `tel:${profile.phoneHref}` },
  { key: 'LinkedIn', value: 'ramkanta-pramanik',         href: profile.linkedin, external: true },
  { key: 'GitHub',   value: 'github.com/ramkanta',       href: profile.github,   external: true },
]

const year = new Date().getFullYear()
</script>

<template>
  <section id="contact" class="section section--contact">
    <div class="shell">
      <SheetHead n="05" label="Contact" :count="profile.available" />

      <h2 class="cta-title" v-reveal>
        Have something that needs<br />
        <span class="cta-title__accent">building properly?</span>
      </h2>

      <p class="section-lede" v-reveal="80">
        I am open to full-stack roles and contract work — particularly anything with a real
        payment rail, a permission model, or a schema worth arguing about. Fastest reply is email.
      </p>

      <div class="cta-actions" v-reveal="140">
        <a class="btn btn--accent" :href="`mailto:${profile.email}`">
          <span>{{ profile.email }}</span>
          <svg class="btn__arrow" viewBox="0 0 16 16" width="14" height="14" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
        <a class="btn btn--ghost" :href="profile.linkedin" target="_blank" rel="noopener noreferrer">
          <span>LinkedIn</span>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 10 10.5 5.5M6.5 5.5h4v4" />
          </svg>
        </a>
      </div>

      <dl class="channels" v-reveal="200">
        <div v-for="c in channels" :key="c.key" class="channel">
          <dt class="mono-label">{{ c.key }}</dt>
          <dd>
            <a
              :href="c.href"
              :target="c.external ? '_blank' : undefined"
              :rel="c.external ? 'noopener noreferrer' : undefined"
            >
              {{ c.value }}
            </a>
          </dd>
        </div>
      </dl>
    </div>

    <footer class="footer">
      <div class="shell footer__inner">
        <p>© {{ year }} {{ profile.name }}</p>
        <p class="footer__built">Built with Vue 3 &amp; Vite</p>
        <a href="#top" class="footer__top">
          Back to top
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M8 13V3M4 7l4-4 4 4" />
          </svg>
        </a>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.section--contact { padding-bottom: 0; }

.cta-title {
  font-size: clamp(2.2rem, 6.5vw, 4.6rem);
  letter-spacing: -0.05em;
  line-height: 1;
}
.cta-title__accent { color: var(--accent); }

.section-lede { margin-top: 1.75rem; }

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.25rem;
}

/* Channels --------------------------------------------------- */
.channels {
  display: grid;
  gap: 1px;
  margin-top: clamp(3rem, 7vw, 4.5rem);
  background: var(--rule);
  border: 1px solid var(--rule);
}

.channel {
  padding: 1.2rem 1.15rem;
  background: var(--paper);
}

.channel dd { margin-top: 0.45rem; }

.channel a {
  /* inline-block + vertical padding keeps the tap target above the 24px
     WCAG minimum without changing how the underline reads */
  display: inline-block;
  padding-block: 0.3rem;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  background-image: linear-gradient(var(--accent), var(--accent));
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.35s var(--ease), color 0.25s var(--ease);
  padding-bottom: 2px;
}
.channel a:hover { color: var(--accent); background-size: 100% 1px; }

/* Footer ----------------------------------------------------- */
.footer {
  margin-top: clamp(4rem, 9vw, 6rem);
  border-top: 1px solid var(--rule);
  background: var(--paper-sunk);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding-block: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.footer__top {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-block: 0.4rem;
  transition: color 0.25s var(--ease);
}
.footer__top:hover { color: var(--accent); }
.footer__top svg { transition: transform 0.3s var(--ease); }
.footer__top:hover svg { transform: translateY(-2px); }

@media (min-width: 640px) {
  .channels { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 980px) {
  .channels { grid-template-columns: repeat(4, 1fr); }
}
</style>
