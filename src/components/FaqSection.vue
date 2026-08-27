<script setup>
import { faq } from '../data/content'
import SheetHead from './SheetHead.vue'
</script>

<template>
  <section id="faq" class="section">
    <div class="shell">
      <SheetHead n="05" label="Details" :count="`${faq.length} questions`" />

      <h2 class="section-title" v-reveal>The short answers.</h2>
      <p class="section-lede" v-reveal="80">
        Plainly stated, so a person skimming — or a search engine summarising —
        gets the facts right rather than inferring them.
      </p>

      <!-- Rendered as a definition list: the question/answer relationship is
           in the markup, not just implied by styling. -->
      <dl class="faq">
        <div
          v-for="(item, i) in faq"
          :key="item.q"
          class="faq__row"
          v-reveal="i * 60"
        >
          <dt class="faq__q">
            <span class="faq__n" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            {{ item.q }}
          </dt>
          <dd class="faq__a">{{ item.a }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.faq { margin-top: clamp(2.5rem, 6vw, 4rem); }

.faq__row {
  display: grid;
  gap: 0.75rem;
  padding-block: clamp(1.4rem, 3vw, 2rem);
  border-top: 1px solid var(--rule);
}
.faq__row:last-child { border-bottom: 1px solid var(--rule); }

.faq__q {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  font-size: clamp(1.05rem, 2.1vw, 1.3rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.25;
}

.faq__n {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  font-weight: 500;
  color: var(--accent);
  flex-shrink: 0;
}

.faq__a {
  margin: 0;
  max-width: 62ch;
  font-size: 0.97rem;
  line-height: 1.68;
  color: var(--ink-2);
}

@media (min-width: 860px) {
  .faq__row {
    grid-template-columns: minmax(260px, 1fr) 1.7fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
  }
  .faq__a { margin-top: 0.2rem; }
}
</style>
