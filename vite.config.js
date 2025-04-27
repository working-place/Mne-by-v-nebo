import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/assets/scss/mixins.scss" as *;
        @use "@/assets/scss/variables.scss" as *;
        @use "@/assets/scss/modalViewer.scss" as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  optimizeDeps: {
    include: ['vue-pdf-embed']
  },
  assetsInclude: ['**/*.pdf']
})
