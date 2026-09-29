export interface StackItem {
  name: string
  href: string
}

export interface StackGroup {
  title: string
  items: StackItem[]
}

export const stack: StackGroup[] = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', href: 'https://react.dev' },
      { name: 'TypeScript', href: 'https://typescriptlang.org' },
      { name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
      { name: 'shadcn/ui', href: 'https://ui.shadcn.com' },
      { name: 'Vite', href: 'https://vite.dev' },
      { name: 'Motion', href: 'https://motion.dev' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', href: 'https://nodejs.org' },
      { name: 'PostgreSQL', href: 'https://postgresql.org' },
      { name: 'Redis', href: 'https://redis.io' },
    ],
  },
  {
    title: 'Tooling',
    items: [
      { name: 'Figma', href: 'https://figma.com' },
      { name: 'GitHub Actions', href: 'https://github.com/features/actions' },
      { name: 'Playwright', href: 'https://playwright.dev' },
    ],
  },
]
