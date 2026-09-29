/**
 * "About" panel — the bullet list under the hero.
 * Plain strings; anything wrapped in *asterisks* renders as bold.
 */
export const about: string[] = [
  'I’m a design engineer with a bias toward pixel-perfect execution and obsessive attention to detail.',
  'Most of my work lives at the seam between design and engineering — turning a Figma file into a component library that survives contact with production.',
  'I care about the small things: focus states, empty states, the 40ms a tooltip takes to appear.',
]

/** Short line shown in the Overview panel next to the role. */
export const overviewRole = 'Design Engineer @Your Company'

/** Shown in the "overview" strip — local time, availability, etc. */
export interface OverviewFact {
  label: string
  value: string
  href?: string
}

export const overviewFacts: OverviewFact[] = [
  { label: 'Location', value: 'Your City' },
  { label: 'Focus', value: 'Design engineering, front-end architecture' },
  { label: 'Status', value: 'Open to interesting work' },
]
