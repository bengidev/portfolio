import { Panel } from '@/components/panel'
import { sponsorTiers } from '@/data/sponsors'

const ALL_SPONSORS = sponsorTiers.flatMap((tier) => tier.sponsors)

/**
 * Infinite marquee of sponsor names.
 *
 * The list is rendered twice and translated by -100%, so the seam is invisible
 * as long as `--gap` matches the actual spacing between items.
 */
export function SponsorsCarousel() {
  if (ALL_SPONSORS.length === 0) return null

  return (
    <Panel className="overflow-hidden py-3">
      <div
        className="group flex w-max flex-nowrap gap-6 hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        {[0, 1].map((copy) => (
          <MarqueeRow key={copy} ariaHidden={copy === 1} />
        ))}
      </div>
    </Panel>
  )
}

function MarqueeRow({ ariaHidden }: { ariaHidden: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-6 pr-6"
      aria-hidden={ariaHidden || undefined}
    >
      {ALL_SPONSORS.map((sponsor) => (
        <li key={sponsor.name} className="shrink-0">
          <a
            href={sponsor.href}
            target="_blank"
            rel="noreferrer noopener sponsored"
            tabIndex={ariaHidden ? -1 : undefined}
            className="text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
          >
            {sponsor.name}
          </a>
        </li>
      ))}
    </ul>
  )
}
