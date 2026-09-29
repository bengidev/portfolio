/**
 * Visual smoke test: loads the built site in a headless browser, captures
 * light and dark screenshots, and fails loudly on any console error or
 * unhandled rejection. Run with `npm run screenshot` after `npm run build`.
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

const DIST = resolve('dist')
const PORT = 4321

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/ is missing — run `npm run build` first.')
  process.exit(1)
}

// Serves dist/ under /portfolio/ so the build's base path is exercised too.
const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  let pathname = url.pathname.replace(/^\/portfolio/, '') || '/'
  if (pathname.endsWith('/')) pathname += 'index.html'

  let file = join(DIST, pathname)
  if (!existsSync(file)) file = join(DIST, '404.html') // SPA fallback

  try {
    const body = await readFile(file)
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404).end('Not found')
  }
})

await new Promise((r) => server.listen(PORT, r))

const browser = await chromium.launch()
const problems = []

for (const scheme of ['light', 'dark']) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: scheme,
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`[console:${scheme}] ${msg.text()}`)
  })
  page.on('pageerror', (err) => problems.push(`[pageerror:${scheme}] ${err.message}`))

  await page.goto(`http://localhost:${PORT}/portfolio/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  await page.screenshot({ path: `screenshot-${scheme}.png`, fullPage: true })
  console.log(`captured screenshot-${scheme}.png`)

  await context.close()
}

await browser.close()
server.close()

if (problems.length) {
  console.error('\nRuntime problems detected:')
  for (const problem of problems) console.error('  ' + problem)
  process.exit(1)
}

console.log('\nNo console errors. Screenshots written to ./')
