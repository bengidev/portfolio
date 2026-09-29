/**
 * The ordered list of sections on the home page.
 *
 * Kept as data so the command palette and the header's "More" menu stay in
 * step with the page without either having to parse the other. If you add a
 * section, add it here too.
 */
export const sections = [
  { id: 'about', title: 'About' },
  { id: 'connect', title: 'Connect' },
  { id: 'activity', title: 'GitHub Activity' },
  { id: 'experience', title: 'Experience' },
  { id: 'education', title: 'Education' },
  { id: 'stack', title: 'Stack' },
  { id: 'projects', title: 'Projects' },
] as const

export type SectionId = (typeof sections)[number]['id']
