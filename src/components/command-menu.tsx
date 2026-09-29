import { FolderGit2, Hash, Link2, Search } from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { SocialIcon } from '@/components/social-icon'
import { projects } from '@/data/projects'
import { sections } from '@/data/sections'
import { site, socialLinks } from '@/data/site'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ *
 * ⌘K palette
 *
 * A hand-rolled command palette — no cmdk dependency, so the bundle
 * stays small. It indexes three kinds of thing: sections of this page,
 * projects, and outbound links.
 * ------------------------------------------------------------------ */

interface Command {
  id: string
  label: string
  /** Extra text matched by the filter but not shown, e.g. a tech stack. */
  keywords?: string
  group: 'Sections' | 'Work' | 'Links'
  icon: React.ReactNode
  run: () => void
}

interface CommandMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null)

export function useCommandMenu() {
  const context = useContext(CommandMenuContext)
  if (!context) throw new Error('useCommandMenu must be used inside <CommandMenuProvider>')
  return context
}

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  // ⌘K / Ctrl+K from anywhere, including while typing in another field.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(() => ({ open, setOpen }), [open])
  return <CommandMenuContext value={value}>{children}</CommandMenuContext>
}

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function CommandMenu() {
  const { open, setOpen } = useCommandMenu()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  const commands = useMemo<Command[]>(() => {
    const sectionCommands: Command[] = sections.map((section) => ({
      id: `section:${section.id}`,
      label: section.title,
      group: 'Sections',
      icon: <Hash className="size-3.5" aria-hidden />,
      run: () => scrollToId(section.id),
    }))

    const projectCommands: Command[] = projects.map((project) => ({
      id: `project:${project.title}`,
      label: project.title,
      keywords: [project.summary, ...project.tags].join(' '),
      group: 'Work',
      icon: <FolderGit2 className="size-3.5" aria-hidden />,
      run: () => scrollToId('projects'),
    }))

    const linkCommands: Command[] = socialLinks.map((link) => ({
      id: `link:${link.key}`,
      label: link.label,
      keywords: link.handle,
      group: 'Links',
      icon: <SocialIcon name={link.key} className="size-3.5" />,
      run: () => window.open(link.href, '_blank', 'noopener,noreferrer'),
    }))

    return [...sectionCommands, ...projectCommands, ...linkCommands]
  }, [])

  // Substring match across label and keywords. Simple and predictable —
  // a fuzzy scorer would rank "About" above "Ab" unpredictably.
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return commands
    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(needle) ||
        command.keywords?.toLowerCase().includes(needle),
    )
  }, [commands, query])

  const grouped = useMemo(() => {
    const map = new Map<Command['group'], Command[]>()
    for (const command of results) {
      const bucket = map.get(command.group)
      if (bucket) bucket.push(command)
      else map.set(command.group, [command])
    }
    return [...map.entries()]
  }, [results])

  // Flattened order, so the highlighted index matches what the user sees.
  const flat = useMemo(() => grouped.flatMap(([, items]) => items), [grouped])

  const reset = useCallback(() => {
    setQuery('')
    setActive(0)
  }, [])

  useEffect(() => {
    if (open) reset()
  }, [open, reset])

  // Keep the highlight inside the list as it shrinks.
  useEffect(() => {
    setActive((current) => (current < flat.length ? current : 0))
  }, [flat.length])

  const close = useCallback(() => setOpen(false), [setOpen])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((current) => (flat.length ? (current + 1) % flat.length : 0))
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((current) => (flat.length ? (current - 1 + flat.length) % flat.length : 0))
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      const command = flat[active]
      if (command) {
        close()
        // Let the dialog unmount before scrolling, so focus does not jump
        // back to a node that is being removed.
        requestAnimationFrame(command.run)
      }
    }
  }

  // Keep the highlighted row in view during keyboard navigation.
  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  if (!open) return null

  let index = -1

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center p-4 pt-[12vh]"
      onKeyDown={onKeyDown}
    >
      {/* Backdrop: click anywhere off the dialog to dismiss. */}
      <button
        type="button"
        aria-label="Close search"
        onClick={close}
        className="enter-fade absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="enter-fade relative w-full max-w-lg overflow-hidden rounded-lg border border-border bg-popover shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            placeholder="Search sections, projects, and links…"
            aria-label="Search"
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div ref={listRef} role="listbox" aria-label="Results" className="max-h-80 overflow-y-auto p-1">
          {flat.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Nothing matches “{query}”.
            </p>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group} className="mb-1 last:mb-0">
                <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">{group}</p>
                {items.map((command) => {
                  index += 1
                  const isActive = index === active
                  const position = index
                  return (
                    <button
                      key={command.id}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onMouseEnter={() => setActive(position)}
                      onClick={() => {
                        close()
                        requestAnimationFrame(command.run)
                      }}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ease-out-expo active:duration-75',
                        isActive ? 'bg-accent text-accent-foreground' : 'text-foreground',
                      )}
                    >
                      <span className="shrink-0 text-muted-foreground">{command.icon}</span>
                      <span className="truncate">{command.label}</span>
                      {command.group === 'Links' && (
                        <Link2 className="ml-auto size-3 shrink-0 text-muted-foreground" aria-hidden />
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-border px-3 py-2 text-xs text-muted-foreground">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}

/** The header button that opens the palette, with its ⌘K hint. */
export function CommandMenuButton({ className }: { className?: string }) {
  const { open, setOpen } = useCommandMenu()

  // Match the platform the way the reference does.
  const [symbol, setSymbol] = useState('Ctrl')
  useEffect(() => {
    const isApple = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent)
    setSymbol(isApple ? '⌘' : 'Ctrl')
  }, [])

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-label="Search"
      aria-expanded={open}
      className={cn(
        'pressable inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-input bg-background px-2.5 text-sm text-muted-foreground hover:bg-accent',
        className,
      )}
    >
      <Search className="size-3.5" aria-hidden />
      <span className="hidden text-xs sm:inline">Search</span>
      <kbd className="hidden h-5 min-w-5 items-center justify-center rounded-sm bg-muted px-1 font-sans text-[11px] font-normal text-muted-foreground sm:inline-flex">
        {symbol === '⌘' ? '⌘' : 'Ctrl'}
      </kbd>
      <kbd className="hidden h-5 min-w-5 items-center justify-center rounded-sm bg-muted px-1 font-sans text-[11px] font-normal text-muted-foreground sm:inline-flex">
        K
      </kbd>
    </button>
  )
}

/** Exported for the header's monogram alt text. */
export const siteMonogram = site.displayName
