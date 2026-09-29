export interface Project {
  title: string
  href?: string
  period: string
  /** One or two sentences. */
  summary: string
  /** Longer detail shown in the expanded card. */
  details?: string[]
  tags: string[]
  /** Small label such as "Open source" or "Featured". */
  badge?: string
}

export const projects: Project[] = [
  {
    title: 'Your Flagship Project',
    href: 'https://github.com/your-handle/project',
    period: '05.2025—',
    summary:
      'A thing you built that people actually use. Lead with the problem it solves, not the stack.',
    details: [
      'The problem it solves, and for whom.',
      'The interesting constraint you worked around.',
      'What you would do differently next time.',
    ],
    tags: ['React', 'TypeScript', 'Open Source'],
    badge: 'Open source',
  },
  {
    title: 'A Side Project',
    href: 'https://example.com',
    period: '03.2024—07.2025',
    summary: 'Something smaller and scrappier. Side projects are allowed to be imperfect.',
    tags: ['Vite', 'CSS'],
  },
  {
    title: 'A Design System',
    href: 'https://github.com/your-handle/ds',
    period: '01.2022—',
    summary: 'A component library used across more than one product.',
    tags: ['React', 'Tailwind CSS', 'Storybook'],
  },
]
