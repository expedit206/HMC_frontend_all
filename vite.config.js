import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vite.config.js
export default {
  plugins: [
    vue(), // 2. Add it to the plugins array
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
}