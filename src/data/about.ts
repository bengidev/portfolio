import { site } from '@/data/site'

/**
 * "About" panel — the bullet list under the hero.
 * Plain strings; anything wrapped in *asterisks* renders as bold.
 * Replace these with your own copy.
 */
export const about: string[] = [
  'I’m a software engineer based in Indonesia, focused on building clear, dependable products for the web.',
  'Most of my work sits at the seam between design and engineering — turning a Figma file into an interface that holds up in production.',
  'I care about the small things: focus states, empty states, the 40ms a tooltip takes to appear.',
]

/** Rows in the overview strip, below the role line. */
export const overviewFacts: { label: string; value: string; href?: string }[] = [
  { label: 'Location', value: site.location },
  { label: 'Timezone', value: site.timezoneLabel },
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'Phone', value: site.phone, href: `tel:${site.phoneHref}` },
]
