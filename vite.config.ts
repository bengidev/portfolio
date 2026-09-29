import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves project repos from `https://<user>.github.io/<repo>/`.
// Override with VITE_BASE_PATH (e.g. '/' for a user/organisation site, or
// '/portfolio/' when publishing to a custom domain from a subpath).
const DEFAULT_BASE = '/portfolio/'

export default defineConfig(() => {
  const base = process.env.VITE_BASE_PATH ?? DEFAULT_BASE

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
      // Emit plain `.js`/`.css` so the output can be served by any static host.
      assetsDir: 'assets',
    },
  }
})
