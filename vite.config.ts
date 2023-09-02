import { resolve } from 'path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      'demos': resolve(__dirname, './demos/'),
    },
  },
  plugins: [
    UnoCSS(),
  ],
  build: {
    chunkSizeWarningLimit: 999999,
  },
})
