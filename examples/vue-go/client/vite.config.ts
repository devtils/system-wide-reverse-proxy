import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const hosts = require('fs').readFileSync(__dirname + '/../.hosts', 'utf-8').split(/\s/).filter(Boolean).slice(1)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // listen on all interfaces instead of only localhost (required when running in docker)
    port: 80, // port to listen on to serve SPA
    strictPort: true, // dont try ports => fail if port is already in use
    hmr: {
      path: 'ws', // public HMR websocket path
      clientPort: 80, // public HMR websocket port
      host: hosts[0], // public HMR websocket host
      port: 8080, // port to actually listen on
    },
  },
})
