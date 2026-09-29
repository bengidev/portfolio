import type * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * A full-width band of the single-column page.
 *
 * Panels are stacked edge to edge and separated by `Separator`. The rules on
 * either side are drawn with the `screen-line-*` utilities so they run the
 * full width of the viewport even though the column itself is narrow.
 */
function Panel({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="panel"
      className={cn(
        'screen-line-top screen-line-bottom screen-line-bottom-border border-x',
        className,
      )}
      {...props}
    />
  )
}

/** Top strip of a panel. Carries the title and optional actions. */
function PanelHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="panel-header"
      className={cn(
        'screen-line-bottom flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3',
        className,
      )}
      {...props}
    />
  )
}

function PanelTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="panel-title"
      className={cn(
        'font-heading text-lg font-medium tracking-tight text-balance',
        className,
      )}
      {...props}
    />
  )
}

/** Muted count or qualifier that trails a panel title. */
function PanelTitleSup({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-sm font-normal tracking-normal text-muted-foreground', className)}
      {...props}
    />
  )
}

function PanelDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="panel-description"
      className={cn('px-4 py-4 text-base text-balance text-muted-foreground', className)}
      {...props}
    />
  )
}

function PanelContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="panel-body" className={cn('p-4', className)} {...props} />
  )
}

/** Hatched gutter between two panels. */
function Separator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden
      className={cn('stripe-divider h-8 w-full border-x', className)}
      {...props}
    />
  )
}

export { Panel, PanelContent, PanelDescription, PanelHeader, PanelTitle, PanelTitleSup, Separator }
