import type { ReactNode } from 'react'

/**
 * The page is built from a single column of full-width sections rather
 * than a stack of cards. Each one draws a hairline above and below,
 * carries the vertical rules down its sides, and titles itself in the
 * pixel face.
 */
export function Section({
  id,
  title,
  action,
  children,
}: {
  id: string
  title: string
  /** Optional node on the right of the title row, e.g. a status pill. */
  action?: ReactNode
  children?: ReactNode
}) {
  return (
    <section id={id} className="screen-line-before screen-line-after edge-frame scroll-mt-20">
      <header className="screen-line-after flex items-center justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5">
        <h2 className="section-title">{title}</h2>
        {action}
      </header>
      {children && <div className="p-4 sm:p-5">{children}</div>}
    </section>
  )
}

/**
 * The diagonal hatch that separates major groups of sections. Spans the
 * full viewport width, like every other rule on the page.
 */
export function HatchDivider() {
  return <div className="hatch-divider edge-frame" aria-hidden />
}

/**
 * A field of printed dots. Used for the banner above the profile and for
 * the block that closes the page, which bracket the content and give
 * the composition a top and a bottom edge.
 */
export function DotField({ className = '' }: { className?: string }) {
  return <div className={`dot-pattern ${className}`} aria-hidden />
}
