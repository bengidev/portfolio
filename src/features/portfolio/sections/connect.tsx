import { Section } from '@/components/section'
import { SocialIcon } from '@/components/social-icon'
import { socialLinks } from '@/data/site'

/**
 * Outbound links as labelled pills. Only real accounts are listed — they
 * come from `src/data/site.ts`.
 */
export function Connect() {
  return (
    <Section id="connect" title="Connect">
      <ul className="flex flex-wrap gap-2">
        {socialLinks.map((link) => {
          const external = link.href.startsWith('http')
          return (
            <li key={link.key}>
              <a
                href={link.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer noopener me' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground shadow-xs transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-accent"
              >
                <SocialIcon name={link.key} className="size-3.5" aria-hidden />
                {link.label}
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
