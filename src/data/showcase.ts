/**
 * The three showcase panels (Components, Blocks, Blog).
 *
 * These are index cards that link out to their own detail pages. For v1 each
 * entry links to a stub route — replace `href` with a real URL once the
 * corresponding page exists, or delete the entry to drop it from the panel.
 */

export interface ShowcaseItem {
  name: string
  href: string
  /** Optional one-line blurb, used by Blocks but harmless elsewhere. */
  description?: string
}

export const componentsShowcase: ShowcaseItem[] = [
  { name: 'Your Component 01', href: '/components/your-component-01' },
  { name: 'Your Component 02', href: '/components/your-component-02' },
  { name: 'Your Component 03', href: '/components/your-component-03' },
  { name: 'Your Component 04', href: '/components/your-component-04' },
  { name: 'Your Component 05', href: '/components/your-component-05' },
  { name: 'Your Component 06', href: '/components/your-component-06' },
  { name: 'Your Component 07', href: '/components/your-component-07' },
  { name: 'Your Component 08', href: '/components/your-component-08' },
]

export const blocksShowcase: ShowcaseItem[] = [
  { name: 'Marketing 01', href: '/blocks/marketing-01', description: 'A block you built for a marketing page.' },
  { name: 'Marketing 02', href: '/blocks/marketing-02', description: 'Another block. Short and useful.' },
  { name: 'Application 01', href: '/blocks/application-01', description: 'A denser, app-oriented section.' },
  { name: 'Application 02', href: '/blocks/application-02', description: 'A settings or dashboard block.' },
]

export interface BlogPost {
  title: string
  href: string
  date: string
  description?: string
  /** Path to a cover image in `public/`, if you have one. */
  cover?: string
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Your First Post Title',
    href: '/blog/first-post',
    date: '2026-08-14',
    description: 'A sentence or two about what the post covers.',
  },
  {
    title: 'Notes on Design Engineering',
    href: '/blog/design-engineering-notes',
    date: '2026-06-02',
    description: 'Thoughts on living between design and code.',
  },
  {
    title: 'Things I Learned Rebuilding My Portfolio',
    href: '/blog/rebuilding-my-portfolio',
    date: '2026-03-21',
    description: 'Static sites, GitHub Pages, and going too far with CSS.',
  },
]
