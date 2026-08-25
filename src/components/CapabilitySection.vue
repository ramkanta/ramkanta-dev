<script setup>
import { ref, computed } from 'vue'
import { capabilities } from '../data/content'
import SheetHead from './SheetHead.vue'

const activeId = ref(capabilities[0].id)
const active = computed(() => capabilities.find((c) => c.id === activeId.value))

const total = capabilities.reduce((n, c) => n + c.items.length, 0)

const tabs = ref([])

/** Roving-tabindex arrow navigation, per the tablist pattern. */
function onKeydown(e, index) {
  const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
  let next

  if (keys[e.key]) next = (index + keys[e.key] + capabilities.length) % capabilities.length
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = capabilities.length - 1
  else return

  e.preventDefault()
  activeId.value = capabilities[next].id
  tabs.value[next]?.focus()
}
</script>

<template>
  <section id="capability" class="section">
    <div class="shell">
      <SheetHead n="02" label="Capability" :count="`${total} technologies`" />

      <h2 class="section-title" v-reveal>The stack, grouped by the job it does.</h2>
      <p class="section-lede" v-reveal="80">
        Nothing here is aspirational — every line is load-bearing somewhere in the work below.
        Pick a layer to see what it covers.
      </p>

      <div class="matrix" v-reveal="140">
        <!-- Rail --------------------------------------------- -->
        <div class="matrix__rail" role="tablist" aria-orientation="vertical"
             aria-label="Capability layers">
          <button
            v-for="(cap, i) in capabilities"
            :key="cap.id"
            ref="tabs"
            role="tab"
            type="button"
            class="layer"
            :class="{ 'is-active': cap.id === activeId }"
            :id="`tab-${cap.id}`"
            :aria-selected="cap.id === activeId"
            :aria-controls="`panel-${cap.id}`"
            :tabindex="cap.id === activeId ? 0 : -1"
            @click="activeId = cap.id"
            @keydown="onKeydown($event, i)"
          >
            <span class="layer__n">{{ cap.n }}</span>
            <span class="layer__name">{{ cap.name }}</span>
            <span class="layer__count">{{ cap.items.length }}</span>
          </button>
        </div>

        <!-- Panel -------------------------------------------- -->
        <div
          class="matrix__panel"
          role="tabpanel"
          :id="`panel-${active.id}`"
          :aria-labelledby="`tab-${active.id}`"
          tabindex="0"
        >
          <Transition name="swap" mode="out-in">
            <div :key="active.id" class="panel">
              <p class="panel__note">{{ active.note }}</p>
              <ul class="panel__items">
                <li
                  v-for="(item, i) in active.items"
                  :key="item"
                  class="pill"
                  :style="{ '--i': i }"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.matrix {
  display: grid;
  gap: 1px;
  margin-top: clamp(2.5rem, 6vw, 4rem);
  background: var(--rule);
  border: 1px solid var(--rule);
}

/* Rail --------------------------------------------------- */
.matrix__rail {
  display: grid;
  gap: 1px;
  background: var(--rule);
}

.layer {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  text-align: left;
  background: var(--paper);
  color: var(--ink-2);
  transition: background-color 0.3s var(--ease), color 0.3s var(--ease);
}

.layer:hover { background: var(--paper-sunk); color: var(--ink); }

.layer.is-active {
  background: var(--ink);
  color: var(--paper);
}

.layer__n {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--ink-4);
  transition: color 0.3s var(--ease);
}
.layer.is-active .layer__n { color: var(--accent); }

.layer__name {
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.layer__count {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--ink-4);
}
.layer.is-active .layer__count { color: color-mix(in srgb, var(--paper) 55%, transparent); }

/* Panel -------------------------------------------------- */
.matrix__panel {
  background: var(--paper-raised);
  padding: clamp(1.5rem, 4vw, 2.5rem);
}
.matrix__panel:focus-visible { outline-offset: -3px; }

.panel__note {
  max-width: 46ch;
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  line-height: 1.45;
  letter-spacing: -0.025em;
  color: var(--ink);
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--rule);
}

.panel__items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  padding: 0.45rem 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  color: var(--ink-2);
  border: 1px solid var(--rule-strong);
  border-radius: 100px;
  background: var(--paper);
  transition: color 0.25s var(--ease), border-color 0.25s var(--ease),
              transform 0.25s var(--ease);
  animation: pill-in 0.4s var(--ease) backwards;
  animation-delay: calc(var(--i) * 22ms);
}

.pill:hover {
  color: var(--accent);
  border-color: var(--accent-line);
  transform: translateY(-2px);
}

@keyframes pill-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}

/* Panel swap --------------------------------------------- */
.swap-enter-active, .swap-leave-active { transition: opacity 0.22s var(--ease-swift); }
.swap-enter-from, .swap-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .pill { animation: none; }
}

@media (min-width: 900px) {
  .matrix { grid-template-columns: minmax(240px, 1fr) 2fr; }
  .matrix__rail { align-content: start; }
  .matrix__panel { min-height: 340px; }
}
</style>
