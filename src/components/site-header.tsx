import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CommandMenuButton } from '@/components/command-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * Sticky top bar.
 *
 * Sits inside a full-width bar with `px-2` so the inner container's
 * `border-x` lines up exactly with the page column below it. Picks up a
 * soft shadow once the page scrolls so it reads as floating over content.
 *
 * There are no section links here. The page is one long column, so
 * scrolling is the primary way to move around it, and ⌘K covers the rest —
 * a row of anchors to sections you are already scrolling past is noise.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-2 pt-2 transition-shadow duration-200 ease-out-expo',
        scrolled && 'shadow-[0_0_16px_0_rgb(0_0_0/0.08)] dark:shadow-[0_0_16px_0_rgb(0_0_0/0.5)]',
      )}
    >
      <div className="mx-auto flex h-12 max-w-3xl items-center gap-2 border-x border-edge px-2 sm:gap-4">
        <Link
          to="/"
          aria-label={`${site.name} — home`}
          className="pressable font-pixel shrink-0 text-lg leading-none"
        >
          {site.displayName}
        </Link>

        <div className="flex-1" />

        <div className="flex items-center *:first:mr-2">
          <CommandMenuButton />
          <span className="mx-2 hidden h-4 w-px bg-border sm:block" aria-hidden />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
