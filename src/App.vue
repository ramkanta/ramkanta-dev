<script setup>
import { ref, onMounted, watch } from 'vue'
import { sections } from './data/content'
import { useActiveSection, useScrollProgress } from './composables/useReveal'

import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import TechMarquee from './components/TechMarquee.vue'
import ApproachSection from './components/ApproachSection.vue'
import CapabilitySection from './components/CapabilitySection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import WorkSection from './components/WorkSection.vue'
import ContactSection from './components/ContactSection.vue'

const active = useActiveSection(sections.map((s) => s.id))
const progress = useScrollProgress()

/* Theme — remembered, but the system preference wins on a first visit. */
const theme = ref('light')

onMounted(() => {
  const stored = localStorage.getItem('theme')
  theme.value =
    stored ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
})

watch(theme, (value) => {
  document.documentElement.dataset.theme = value
  localStorage.setItem('theme', value)
}, { immediate: true })

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <SiteNav
    :active="active"
    :progress="progress"
    :theme="theme"
    @toggle-theme="toggleTheme"
  />

  <!-- Section index rail, desktop only -->
  <nav class="rail" aria-label="Section index">
    <ul>
      <li v-for="s in sections" :key="s.id">
        <a
          :href="`#${s.id}`"
          class="rail__item"
          :class="{ 'is-active': active === s.id }"
        >
          <span class="rail__n">{{ s.n }}</span>
          <span class="rail__tick" aria-hidden="true" />
          <span class="rail__label">{{ s.label }}</span>
        </a>
      </li>
    </ul>
  </nav>

  <main id="main">
    <HeroSection />
    <TechMarquee />
    <ApproachSection />
    <CapabilitySection />
    <ExperienceSection />
    <WorkSection />
    <ContactSection />
  </main>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  z-index: 200;
  padding: 0.75rem 1.1rem;
  background: var(--ink);
  color: var(--paper);
  font-size: 0.85rem;
  border-radius: 2px;
  transition: top 0.25s var(--ease);
}
.skip-link:focus-visible { top: 0.75rem; }

/* Section index rail ---------------------------------------- */
.rail {
  display: none;
  position: fixed;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 60;
}

.rail ul { display: grid; gap: 0.15rem; }

.rail__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-4);
  transition: color 0.3s var(--ease);
}

.rail__tick {
  width: 14px;
  height: 1px;
  background: currentColor;
  transition: width 0.35s var(--ease);
}

.rail__label {
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}

.rail__item:hover,
.rail__item.is-active { color: var(--accent); }

.rail__item.is-active .rail__tick { width: 26px; }

.rail__item:hover .rail__label,
.rail__item.is-active .rail__label {
  opacity: 1;
  transform: none;
}

/* Only show the rail where there is room beside the content. */
@media (min-width: 1400px) {
  .rail { display: block; }
}
</style>
