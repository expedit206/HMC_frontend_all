import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // <-- Ajoute cet import

// vite.config.js
export default {
  plugins: [
    vue(), // 2. Add it to the plugins array
    tailwindcss(), 
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
   resolve: {
    alias: {
        '@': '/src/components'
        // '@components': '/src/js/components',
        // '@components/ui': '/src/js/components/ui',
        // '@layouts': '/src/js/layouts',
        // '@pages': '/src/js/pages',
        // '@types': '/src/js/types',
    },
    },
}