import { DotField } from '@/components/section'
import { site } from '@/data/site'

/**
 * Closes the page with the same device that opened it: a field of printed
 * dots under a hairline, bracketing the content between the two.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-2">
      <div className="mx-auto max-w-3xl">
        <div className="screen-line-before screen-line-after edge-frame flex flex-wrap items-end justify-between gap-x-6 gap-y-2 px-4 py-6 sm:px-5">
          <div className="font-mono text-xs text-muted-foreground">
            <p>
              © {year} {site.name}
            </p>
            <p>Built with React, Vite and Tailwind</p>
          </div>

          {/* Monogram in the pixel face — the same device as the header. */}
          <span className="font-pixel text-xl leading-none" aria-hidden>
            {site.displayName}
          </span>
        </div>

        <div className="screen-line-before edge-frame h-[80px] sm:h-[110px]">
          <DotField className="h-full w-full" />
        </div>
      </div>
    </footer>
  )
}
