/**
 * ─────────────────────────────────────────────────────────────────────────────
 * IDENTITY — edit this file first.
 * Everything else on the site reads from here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /** Shown in the header, the <title>, and structured data. */
  name: 'Your Name',
  /** Short handle, e.g. "bengidev". Used for the GitHub panel. */
  handle: 'your-handle',
  /** Rendered under the name in the hero. */
  tagline: 'Design engineer building thoughtful, pixel-precise things for the web.',
  /** One-line description for meta tags and link previews. */
  description:
    'Personal portfolio — design engineer, open source, and selected work.',
  /** Shown in the footer. */
  location: 'Based in Your City',
  /** Where the site is published once deployed. */
  url: 'https://your-handle.github.io/portfolio/',

  /**
   * Images live in `public/`. Replace these two files with your own — the light
   * variant is shown in light mode, the dark variant in dark mode.
   *  - public/avatar-light.(webp|png|jpg)
   *  - public/avatar-dark.(webp|png|jpg)
   * Dropping in a single image and pointing both keys at it also works.
   */
  avatarLight: '/avatar-light.webp',
  avatarDark: '/avatar-dark.webp',

  /** Optional. Shown next to the name when true. */
  verified: false,
} as const

/**
 * Social links. `icon` must match a key exported from
 * `src/components/social-icon.tsx` (X, GitHub, LinkedIn, Discord, YouTube,
 * Bluesky, Instagram, Dribbble, Email).
 *
 * The first entry is treated as the "primary" link by the follow button.
 * Set `followTarget` to override which one the "follow me" button points at.
 */
export type SocialKey =
  | 'x'
  | 'github'
  | 'linkedin'
  | 'discord'
  | 'youtube'
  | 'bluesky'
  | 'instagram'
  | 'dribbble'
  | 'email'

export interface SocialLink {
  key: SocialKey
  label: string
  href: string
  /** Optional public handle shown as a tooltip. */
  handle?: string
}

export const socialLinks: SocialLink[] = [
  { key: 'x', label: 'X', href: 'https://x.com/your-handle' },
  { key: 'github', label: 'GitHub', href: 'https://github.com/your-handle' },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
  { key: 'discord', label: 'Discord', href: 'https://discord.com/users/your-id' },
  { key: 'youtube', label: 'YouTube', href: 'https://youtube.com/@your-handle' },
]

/** Which link the "follow me" button in the social panel points at. */
export const followTarget: SocialKey = 'x'

/**
 * Rotating lines shown under the name in the hero. Add or remove freely —
 * the list loops on an interval.
 */
export const flipSentences: string[] = [
  'Design engineer',
  'Open source maintainer',
  'Writing about the web',
  'Building in public',
]
