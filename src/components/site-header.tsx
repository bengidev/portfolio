import { Link } from 'react-router-dom'

import { ThemeToggle } from '@/components/theme-toggle'
import { site } from '@/data/site'

/**
 * Sticky top bar: the wordmark and the theme switch.
 *
 * Route links were removed — the home page is a single column that already
 * contains everything, so a nav to it was redundant. The theme toggle stays
 * reachable on every page.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-3xl items-center gap-4 px-4">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          {site.displayName}
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
