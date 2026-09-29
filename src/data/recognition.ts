export interface RecognitionItem {
  /** What kind of thing this is, e.g. "Award", "Prize", "Certification". */
  type: string
  /** The specific name, e.g. "Summer 2025 cohort". */
  title: string
  /** When it was given. */
  awardedAt: string
  /** Optional: when you actually received it, if that differs. */
  receivedAt?: string
  /** What it was given for, e.g. "Open source project". */
  category: string
  href?: string
}

export const recognition: RecognitionItem[] = [
  {
    type: 'Award',
    title: 'Your Award Name',
    awardedAt: '07.2026',
    category: 'Open source project',
  },
  {
    type: 'Prize',
    title: 'Your Prize Name',
    awardedAt: '07.2025',
    receivedAt: '09.2025',
    category: 'Community',
    href: 'https://example.com',
  },
  {
    type: 'Certification',
    title: 'Your Certification',
    awardedAt: '03.2024',
    category: 'Professional',
  },
]
