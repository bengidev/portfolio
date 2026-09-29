import { Link, NavLink, useLocation } from 'react-router-dom'

import { ThemeToggle } from '@/components/theme-toggle'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Writing' },
  { to: '/components', label: 'Components' },
]

/** Sticky top bar. Hidden on the home page, which is a single uninterrupted column. */
export function SiteHeader() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-sm',
        isHome && 'hidden',
      )}
    >
      <div className="mx-auto flex h-12 max-w-3xl items-center gap-4 px-4">
        <Link to="/" className="text-sm font-medium tracking-tight">
          {site.name}
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-2 py-1 text-sm transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
