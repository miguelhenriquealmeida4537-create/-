import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { fontPreload } from './scripts/font-preload.ts'
import { seoFiles } from './scripts/seo-files.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL), fontPreload()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      host: true,
    },
    build: {
      target: 'es2022',
      sourcemap: false,
      rollupOptions: {
        output: {
          // Isola bibliotecas grandes em chunks próprios para melhor cache.
          manualChunks(id) {
            if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) return 'gsap'
            if (id.includes('node_modules/@supabase')) return 'supabase'
            if (id.includes('node_modules/react')) return 'react'
          },
        },
      },
    },
  }
})
