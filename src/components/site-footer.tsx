import { Link } from 'react-router-dom'

import { SocialIcon } from '@/components/social-icon'
import { site, socialLinks } from '@/data/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-6 text-sm text-muted-foreground">
        <span>
          © {year} {site.displayName}
        </span>

        <ul className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener me"
                aria-label={link.label}
                className="transition-colors hover:text-foreground"
              >
                <SocialIcon name={link.key} className="size-4" />
              </a>
            </li>
          ))}
        </ul>

        <Link to="/colophon" className="ml-auto transition-colors hover:text-foreground">
          Colophon
        </Link>
      </div>
    </footer>
  )
}
