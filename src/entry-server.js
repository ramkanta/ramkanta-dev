/**
 * Server entry, used only at build time by scripts/prerender.js.
 * Renders the app to a static HTML string so crawlers (and anyone with
 * JavaScript disabled) receive the full page instead of an empty <div>.
 */
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { vReveal } from './composables/useReveal'
import { vSpotlight } from './composables/useSpotlight'

export async function render() {
  const app = createSSRApp(App)
  app.directive('reveal', vReveal)
  app.directive('spotlight', vSpotlight)
  return renderToString(app)
}
