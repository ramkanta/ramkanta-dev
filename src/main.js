import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vReveal } from './composables/useReveal'
import { vSpotlight } from './composables/useSpotlight'

createApp(App)
  .directive('reveal', vReveal)
  .directive('spotlight', vSpotlight)
  .mount('#app')
