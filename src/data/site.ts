/**
 * ────────────────────────────────────────���────────────────────
 * IDENTITY — edit this file first.
 * Everything else on the site reads from here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Resolve a file in `public/` to a URL the deployed site can actually fetch.
 *
 * GitHub Pages serves this site from a subpath (`/portfolio/`), so a plain
 * `/avatar.png` asks the domain root for a file that is not there and 404s.
 * The base is normalised so a `VITE_BASE_PATH` override works whether or not
 * it carries a trailing slash.
 */
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`

const asset = (path: string) => `${BASE}${path}`

export const site = {
  /**
   * Full name. Used in meta tags, the footer, and anywhere the name needs to
   * be spelled out. Prefer `displayName` in visible UI.
   */
  name: 'Bambang Tri Rahmat Doni',
  /**
   * Abbreviation, used as the wordmark in the hero and the header. Kept short
   * so it holds its weight at display size.
   */
  displayName: 'BTRD',
  /** Short handle. Used for the GitHub panel and as the default monogram. */
  handle: 'bengidev',

  /** Current role, shown in the overview strip. */
  role: 'Software Engineer',
  company: 'Your Company',

  location: 'Indonesia',
  /** UTC offset, used to show local time. Indonesia is GMT+7 (WIB). */
  timezone: 'Asia/Jakarta',
  timezoneLabel: 'GMT+7',

  email: 'bambang.trd17@gmail.com',
  phone: '+62 896 6906 6999',
  /** Digits only, for a tel: link. */
  phoneHref: '+6289669066999',

  /** Shown under the name in the hero. */
  tagline: 'Software engineer building for the web and for mobile.',
  /** One-line description for meta tags and link previews. */
  description:
    'Bambang Tri Rahmat Doni — software engineer based in Indonesia, working across web, React Native, Flutter, and native iOS and Android. Selected work and experience.',
  /** Where the site is published once deployed. */
  url: 'https://bengidev.github.io/portfolio/',

  /**
   * Portrait, shown in the card beside the name. Put the file in `public/`.
   *
   * The image is black ink on a near-white ground, so dark mode applies a CSS
   * `invert()` — the ink turns white and the background dissolves into the
   * page. One file therefore serves both themes; if you ever swap in a
   * genuinely different dark-mode image, drop the `dark:invert` class in
   * `profile.tsx` and point this at the other file.
   */
  avatar: asset('avatar.png'),
} as const

/**
 * Social links. `icon` must match a key exported from
 * `src/components/social-icon.tsx` (X, GitHub, LinkedIn, Discord, YouTube,
 * Bluesky, Instagram, Dribbble, Email).
 *
 * Only real accounts are listed here — add more by copying an entry and filling
 * in your handle. `followTarget` picks which one the "follow me" link uses.
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
  { key: 'github', label: 'GitHub', href: 'https://github.com/bengidev', handle: '@bengidev' },
  { key: 'email', label: 'Email', href: `mailto:${site.email}`, handle: site.email },
  // { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
  // { key: 'x', label: 'X', href: 'https://x.com/your-handle' },
]

/** Which link the "follow me" button in the social panel points at. */
export const followTarget: SocialKey = 'github'

/**
 * Rotating lines shown under the name in the hero. Add or remove freely —
 * the list loops on an interval.
 */
export const flipSentences: string[] = [
  'Software Engineer',
  'Based in Indonesia',
  'Web, iOS and Android',
  'React Native, Flutter, native',
  'Open to interesting work',
]
