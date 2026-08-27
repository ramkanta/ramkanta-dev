import { createApp, createSSRApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vReveal } from './composables/useReveal'
import { vSpotlight } from './composables/useSpotlight'

const container = document.querySelector('#app')

// Production builds are prerendered, so hydrate the existing markup. The dev
// server ships an empty container, where a plain mount is correct.
const app = container.hasChildNodes() ? createSSRApp(App) : createApp(App)

app
  .directive('reveal', vReveal)
  .directive('spotlight', vSpotlight)
  .mount(container)
