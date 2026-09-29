import { site } from '@/data/site'

/**
 * "About" panel — the bullet list under the hero.
 * Plain strings; anything wrapped in *asterisks* renders as bold.
 * Replace these with your own copy.
 */
export const about: string[] = [
  'I’m a software engineer based in Indonesia, working across the web and mobile — React and TypeScript in the browser, React Native and Flutter across both platforms, and Swift and Kotlin when a job wants the real thing.',
  'Most of my work sits at the seam between design and engineering — turning a Figma file into an interface that holds up in production, whether it ships to a browser, the App Store, or Google Play.',
  'I care about the small things: focus states, empty states, the 40ms a tooltip takes to appear, and the 16ms a list takes to settle under a thumb.',
]

/** Rows in the overview strip, below the role line. */
export const overviewFacts: { label: string; value: string; href?: string }[] = [
  { label: 'Location', value: site.location },
  { label: 'Timezone', value: site.timezoneLabel },
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'Phone', value: site.phone, href: `tel:${site.phoneHref}` },
]
