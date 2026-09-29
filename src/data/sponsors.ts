export interface Sponsor {
  name: string
  href: string
  /** Optional — when set, the row renders a greyed wordmark instead of a logo. */
  textOnly?: boolean
}

/** Grouped into rows on the sponsors panel. Order matters. */
export const sponsorTiers: { tier: string; sponsors: Sponsor[] }[] = [
  {
    tier: 'Open Source Program',
    sponsors: [
      { name: 'Vercel', href: 'https://vercel.com/open-source' },
      { name: 'PostHog', href: 'https://posthog.com' },
    ],
  },
  {
    tier: 'Platinum',
    sponsors: [
      { name: 'Your Sponsor', href: 'https://example.com' },
      { name: 'Another Sponsor', href: 'https://example.com' },
    ],
  },
  {
    tier: 'Gold',
    sponsors: [{ name: 'Gold Sponsor', href: 'https://example.com' }],
  },
]
