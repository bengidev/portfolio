import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CommandMenuButton } from '@/components/command-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { sections } from '@/data/sections'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/** Scrolls to a section on the home page, from anywhere in the app. */
function SectionLink({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={`/#${id}`}
      className={cn(
        'font-mono text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground',
        className,
      )}
    >
      {children}
    </a>
  )
}

function MoreMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 font-mono text-sm font-medium text-muted-foreground outline-none transition-colors duration-300 hover:text-foreground"
      >
        More
        <ChevronDown
          className={cn('size-3 transition-transform duration-300', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <>
          {/* Click-away layer, below the menu. */}
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div
            role="menu"
            className="animate-in fade-in-0 zoom-in-95 absolute top-full left-0 z-20 mt-2 min-w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                role="menuitem"
                href={`/#${section.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {section.title}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/**
 * Sticky top bar.
 *
 * Sits inside a full-width bar with `px-2` so the inner container's
 * `border-x` lines up exactly with the page column below it. Picks up a
 * soft shadow once the page scrolls so it reads as floating over content.
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
        'sticky top-0 z-50 max-w-screen overflow-x-clip bg-background px-2 pt-2 transition-shadow duration-300',
        scrolled && 'shadow-[0_0_16px_0_rgb(0_0_0/0.08)] dark:shadow-[0_0_16px_0_rgb(0_0_0/0.5)]',
      )}
    >
      <div className="mx-auto flex h-12 max-w-3xl items-center gap-2 border-x border-edge px-2 sm:gap-4">
        <Link
          to="/"
          aria-label={`${site.name} — home`}
          className="font-pixel shrink-0 text-lg leading-none transition-transform active:scale-[0.98]"
        >
          {site.displayName}
        </Link>

        <div className="flex-1" />

        <nav className="flex max-sm:hidden items-center gap-4">
          <Link
            to="/"
            className="font-mono text-sm font-medium text-foreground transition-colors duration-300 hover:text-foreground"
          >
            Home
          </Link>
          <SectionLink id="projects">Projects</SectionLink>
          <MoreMenu />
        </nav>

        <div className="flex items-center *:first:mr-2">
          <CommandMenuButton />
          <span className="mx-2 hidden h-4 w-px bg-border sm:block" aria-hidden />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
