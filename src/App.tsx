import { Link, Route, Routes } from 'react-router-dom'

import { Section } from '@/components/section'
import { site } from '@/data/site'
import { Home } from '@/routes/home'

/**
 * The site is a single page. The only other route is the 404, which the
 * `404.html` copy of the built index resolves any unknown path to — see
 * `scripts/postbuild.mjs`.
 */
export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function NotFound() {
  return (
    <main className="max-w-screen overflow-x-hidden px-2">
      <div className="mx-auto max-w-3xl">
        <div className="screen-line-before screen-line-after edge-frame">
          <Section id="not-found" title="404">
            <p className="font-mono text-sm text-muted-foreground">
              That page does not exist. The whole site lives on one page, so try the home page.
            </p>
            <Link
              to="/"
              className="pressable mt-4 inline-block rounded-md border border-border px-3.5 py-1.5 font-mono text-sm hover:bg-accent"
            >
              ← {site.displayName}
            </Link>
          </Section>
        </div>
      </div>
    </main>
  )
}
