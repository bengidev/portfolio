import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

import { cn } from '@/lib/utils'

/**
 * The repeated shape used by Experience and Education: a marked entry, a
 * headline row that can expand, and a row of chips.
 *
 * The list draws its own hairlines and pulls them out to the section's
 * edges with a negative margin, so they run the full width of the frame
 * rather than stopping at the section's padding.
 */
export function EntryList({ children }: { children: React.ReactNode }) {
  return <ul className="-mx-4 divide-y divide-border sm:-mx-5">{children}</ul>
}

export function Entry({
  icon,
  title,
  headline,
  meta,
  tags,
  children,
}: {
  /** Small glyph shown in a bordered square beside the headline. */
  icon?: React.ReactNode
  title: React.ReactNode
  headline: React.ReactNode
  /** Period, location, and anything else secondary. */
  meta?: React.ReactNode
  tags?: string[]
  /** Expanded body. Supplying it turns the row into a toggle. */
  children?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const bodyId = useId()
  const expandable = Boolean(children)

  return (
    <li className="px-4 py-5 sm:px-5">
      <div className="flex items-start gap-2.5">
        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden />

        <div className="min-w-0 flex-1">
          <p className="text-base font-medium text-foreground">{title}</p>

          <div className="mt-2 flex items-start gap-2">
            {icon && (
              <span
                className="grid size-7 shrink-0 place-items-center rounded-md border border-border text-muted-foreground"
                aria-hidden
              >
                {icon}
              </span>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="min-w-0 text-sm font-medium text-foreground">{headline}</p>
                {expandable && (
                  <button
                    type="button"
                    onClick={() => setOpen((current) => !current)}
                    aria-expanded={open}
                    aria-controls={bodyId}
                    aria-label={open ? `Hide details` : `Show details`}
                    className="pressable ml-auto shrink-0 rounded p-1 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronDown
                      className={cn(
                        'size-4 transition-transform duration-200 ease-out-expo motion-reduce:transition-none',
                        open && 'rotate-180',
                      )}
                      aria-hidden
                    />
                  </button>
                )}
              </div>

              {meta && (
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{meta}</p>
              )}
            </div>
          </div>

          {tags && tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {expandable && (
            // Always mounted: the height tween needs the content in the
            // DOM to have something to measure. `inert` keeps the collapsed
            // lines out of the tab order while they are invisible.
            <div id={bodyId} data-open={open || undefined} className="disclose" inert={!open}>
              <div className="min-h-0 overflow-hidden">
                <div className="space-y-1.5 pt-3 pl-1">{children}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
