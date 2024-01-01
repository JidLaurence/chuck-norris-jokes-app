import dotenv from 'dotenv'
dotenv.config()

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const port: number = parseInt(process.env.VITE_APP_PORT || '8080')

export default defineConfig({
  server: { port },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config/index', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@interfaces': fileURLToPath(new URL('./src/typescript/interfaces', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/typescript/types', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores/index', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/libs/axios', import.meta.url))
    }
  }
})
