/**
 * GitHub Pages has no server-side rewrite rules, so a direct request to a
 * client-side route (e.g. /portfolio/blog) would 404. GitHub Pages does serve
 * `404.html` for unmatched paths, so copying the built `index.html` over it
 * makes deep links resolve — the router then reads the path and renders the
 * right route.
 *
 * This only works because Vite emits asset URLs rooted at `base` (absolute
 * `/portfolio/...`), so they resolve the same no matter which URL served the
 * document.
 */
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const index = resolve(dist, 'index.html')
const notFound = resolve(dist, '404.html')

if (!existsSync(index)) {
  console.error('dist/index.html not found — run the build first.')
  process.exit(1)
}

copyFileSync(index, notFound)
console.log('Wrote dist/404.html (SPA fallback).')
