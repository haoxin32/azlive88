import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { seoStaticFiles } from './build-plugins/seoStaticFiles.ts'
import { validateSiteConfig } from './build-plugins/validateSiteConfig.ts'
import { validateTrackingConfig } from './build-plugins/validateTrackingConfig.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), validateSiteConfig(), validateTrackingConfig(), seoStaticFiles()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
})
