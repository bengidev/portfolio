export interface Testimonial {
  quote: string
  author: string
  role?: string
  href?: string
  avatar?: string
}

export const testimonials: Testimonial[] = [
  {
    quote: 'A short, specific compliment beats a paragraph of flattery.',
    author: 'A Colleague',
    role: 'Product Designer',
  },
  {
    quote: 'The kind of feedback that makes you want to keep building.',
    author: 'An Open Source Maintainer',
    role: 'Core Team',
  },
  {
    quote: 'Detail-oriented, fast to ship, and pleasant to work with.',
    author: 'A Former Manager',
    role: 'Engineering Lead',
  },
  {
    quote: 'Noticeably raised the quality bar for the rest of the team.',
    author: 'A Peer',
    role: 'Staff Engineer',
  },
]
