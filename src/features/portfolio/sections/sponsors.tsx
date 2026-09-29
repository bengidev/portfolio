import { Heart } from 'lucide-react'

import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { sponsorTiers } from '@/data/sponsors'

/**
 * Supporters, grouped by tier.
 *
 * Sponsors render as text wordmarks so there are no logo assets to source.
 * Swap a row for an `<img>` if you have official brand assets.
 */
export function Sponsors() {
  if (sponsorTiers.every((tier) => tier.sponsors.length === 0)) return null

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Supported by</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="space-y-5">
          {sponsorTiers.map((tier) => {
            if (tier.sponsors.length === 0) return null
            return (
              <section key={tier.tier}>
                <h3 className="mb-2 text-sm text-muted-foreground">{tier.tier}</h3>
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {tier.sponsors.map((sponsor) => (
                    <li key={sponsor.name}>
                      <a
                        href={sponsor.href}
                        target="_blank"
                        rel="noreferrer noopener sponsored"
                        className="text-lg font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {sponsor.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        <p className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Heart className="size-3.5" aria-hidden />
          Grateful to everyone who sponsors this work.
        </p>
      </PanelContent>
    </Panel>
  )
}
