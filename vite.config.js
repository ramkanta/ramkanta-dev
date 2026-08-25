import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // Honour PORT when the environment assigns one (preview harnesses, CI).
    port: Number(process.env.PORT) || 5173,
  },
})
