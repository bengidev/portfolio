export interface Experience {
  company: string
  /** The position held, e.g. "Frontend Engineer". */
  role: string
  href?: string
  location: string
  locationType?: 'Remote' | 'Hybrid' | 'On-site'
  status?: 'Current' | 'Past'
  /** Human-readable range, e.g. "05.2025—". */
  period: string
  /** Bullets describing what you did. */
  highlights: string[]
  /** Chips rendered under the highlights. */
  tags: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Your Company',
    role: 'Frontend Engineer',
    href: 'https://example.com',
    location: 'Melbourne, Australia',
    locationType: 'Remote',
    status: 'Current',
    period: '01.2024—',
    highlights: [
      'Design and ship front-end components, from Figma to production React.',
      'Own the design system and keep it documented as it evolves.',
      'Work directly with design on interaction details and motion.',
    ],
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Figma', 'Design Systems'],
  },
  {
    company: 'Previous Company',
    role: 'Full-stack Developer',
    location: 'Remote',
    locationType: 'Remote',
    status: 'Past',
    period: '06.2021—12.2023',
    highlights: [
      'Rebuilt the marketing site and cut time-to-interactive by half.',
      'Introduced end-to-end tests and a release checklist the team actually uses.',
    ],
    tags: ['Next.js', 'Node.js', 'Docker', 'CI/CD'],
  },
  {
    company: 'First Company',
    role: 'Junior Developer',
    location: 'Your City',
    locationType: 'On-site',
    status: 'Past',
    period: '07.2019—05.2021',
    highlights: [
      'Built and maintained the customer-facing dashboard.',
      'Worked across design, front-end, and the occasional back-end endpoint.',
    ],
    tags: ['React', 'TypeScript', 'GraphQL'],
  },
]
