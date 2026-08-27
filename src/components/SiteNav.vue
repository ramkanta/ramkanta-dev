<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { profile, sections } from '../data/content'

defineProps({
  active: { type: String, default: 'top' },
  progress: { type: Number, default: 0 },
  theme: { type: String, default: 'light' },
})

const emit = defineEmits(['toggle-theme'])

const open = ref(false)
const links = sections.filter((s) => s.id !== 'top')

// The sheet below is teleported, and renderToString diverts teleported markup
// into a separate buffer that never reaches the prerendered HTML — hydration
// then cannot find its anchors. Rendering it only after mount avoids that
// entirely, and costs nothing: the sheet is closed on first paint anyway.
const mounted = ref(false)

function close() {
  open.value = false
}

// Lock body scroll while the mobile sheet is open.
watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

// Bound on mount rather than in setup, so prerendering never touches `window`.
onMounted(() => {
  mounted.value = true
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-nav">
    <!-- Reading progress, doubles as the nav's bottom rule -->
    <div class="scroll-progress" aria-hidden="true">
      <div class="scroll-progress__bar" :style="{ transform: `scaleX(${progress})` }" />
    </div>

    <div class="site-nav__inner shell">
      <a href="#top" class="brand" @click="close">
        <span class="brand__mark" aria-hidden="true">RP</span>
        <span class="brand__text">
          <span class="brand__name">{{ profile.last }}</span>
          <span class="brand__role">{{ profile.role }}</span>
        </span>
      </a>

      <nav class="site-nav__links" aria-label="Sections">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="navlink"
          :class="{ 'is-active': active === link.id }"
          :aria-current="active === link.id ? 'true' : undefined"
        >
          <span class="navlink__n">{{ link.n }}</span>
          <span class="navlink__label">{{ link.label }}</span>
        </a>
      </nav>

      <div class="site-nav__actions">
        <button
          class="theme-toggle"
          type="button"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
          @click="emit('toggle-theme')"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="16" height="16" fill="none"
               stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.4v2.2M12 19.4v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.4 12h2.2M19.4 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none"
               stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1Z" />
          </svg>
        </button>

        <a class="nav-cta" :href="`mailto:${profile.email}`">
          <span>Get in touch</span>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>

        <button
          class="burger"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-sheet"
          aria-label="Menu"
          @click="open = !open"
        >
          <span :class="{ 'is-open': open }" />
          <span :class="{ 'is-open': open }" />
        </button>
      </div>
    </div>

    <!-- Mobile sheet.
         Teleported to <body> because .site-nav uses backdrop-filter, which
         makes it the containing block for position:fixed descendants — the
         sheet would otherwise collapse to the height of the header. -->
    <Teleport v-if="mounted" to="body">
    <Transition name="sheet">
      <div v-if="open" id="mobile-sheet" class="sheet">
        <nav class="sheet__links" aria-label="Sections">
          <a
            v-for="(link, i) in links"
            :key="link.id"
            :href="`#${link.id}`"
            class="sheet__link"
            :style="{ transitionDelay: `${60 + i * 45}ms` }"
            @click="close"
          >
            <span class="sheet__n">{{ link.n }}</span>
            <span>{{ link.label }}</span>
          </a>
        </nav>
        <div class="sheet__foot">
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          <a :href="`tel:${profile.phoneHref}`">{{ profile.phone }}</a>
        </div>
      </div>
    </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.site-nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  background: color-mix(in srgb, var(--paper) 82%, transparent);
  backdrop-filter: blur(14px) saturate(1.4);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  border-bottom: 1px solid var(--rule);
}

.scroll-progress {
  position: absolute;
  inset: auto 0 -1px 0;
  height: 2px;
  pointer-events: none;
}
.scroll-progress__bar {
  height: 100%;
  background: var(--accent);
  transform-origin: left;
  transform: scaleX(0);
}

.site-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  height: 68px;
}

/* Brand ---------------------------------------------------- */
.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-shrink: 0;
}
.brand__mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: 2px;
  transition: background-color 0.3s var(--ease);
}
.brand:hover .brand__mark { background: var(--accent); color: #fff; }

.brand__text { display: flex; flex-direction: column; line-height: 1.15; }
.brand__name { font-size: 0.94rem; font-weight: 600; letter-spacing: -0.02em; }
.brand__role {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-3);
}

/* Links ---------------------------------------------------- */
.site-nav__links { display: none; gap: 0.35rem; }

.navlink {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  color: var(--ink-2);
  border-radius: 2px;
  transition: color 0.25s var(--ease), background-color 0.25s var(--ease);
}
.navlink__n {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--ink-4);
  transition: color 0.25s var(--ease);
}
.navlink:hover { color: var(--ink); background: var(--paper-sunk); }
.navlink.is-active { color: var(--ink); font-weight: 500; }
.navlink.is-active .navlink__n { color: var(--accent); }
.navlink.is-active::after {
  content: '';
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.15rem;
  height: 1px;
  background: var(--accent);
}

/* Actions -------------------------------------------------- */
.site-nav__actions { display: flex; align-items: center; gap: 0.5rem; }

.theme-toggle {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: var(--ink-2);
  border: 1px solid var(--rule);
  border-radius: 2px;
  transition: color 0.25s var(--ease), border-color 0.25s var(--ease),
              background-color 0.25s var(--ease);
}
.theme-toggle:hover {
  color: var(--ink);
  border-color: var(--rule-strong);
  background: var(--paper-sunk);
}

.nav-cta {
  display: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--paper);
  background: var(--ink);
  border-radius: 2px;
  transition: background-color 0.3s var(--ease);
}
.nav-cta:hover { background: var(--accent); color: #fff; }
.nav-cta svg { transition: transform 0.3s var(--ease); }
.nav-cta:hover svg { transform: translateX(3px); }

/* Burger --------------------------------------------------- */
.burger {
  display: grid;
  place-items: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  border: 1px solid var(--rule);
  border-radius: 2px;
}
.burger span {
  display: block;
  width: 15px;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.35s var(--ease);
}
.burger span:first-child.is-open { transform: translateY(3.25px) rotate(45deg); }
.burger span:last-child.is-open { transform: translateY(-3.25px) rotate(-45deg); }

/* Mobile sheet --------------------------------------------- */
.sheet {
  position: fixed;
  inset: 68px 0 0 0;
  background: var(--paper);
  padding: var(--gutter);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}
.sheet__links { display: flex; flex-direction: column; padding-top: 1rem; }
.sheet__link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 1.1rem 0;
  font-size: 1.9rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  border-bottom: 1px solid var(--rule);
}
.sheet__link:hover { color: var(--accent); }
.sheet__n {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--accent);
}
.sheet__foot {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-top: 2rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--ink-2);
}

.sheet-enter-active, .sheet-leave-active { transition: opacity 0.3s var(--ease); }
.sheet-enter-from, .sheet-leave-to { opacity: 0; }

/* Breakpoints ---------------------------------------------- */

/* Touch-sized controls on small screens (44px, Apple's guidance) */
@media (max-width: 899px) {
  .theme-toggle, .burger { width: 44px; height: 44px; }
  .site-nav__inner { height: 62px; }
  .sheet { top: 62px; }
}

@media (min-width: 900px) {
  .site-nav__links { display: flex; }
  .nav-cta { display: inline-flex; }
  .burger { display: none; }
}
</style>
