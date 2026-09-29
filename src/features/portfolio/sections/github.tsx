import { GitFork, Star, Users } from 'lucide-react'

import github from '@/data/github.json'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { site } from '@/data/site'

/**
 * Public GitHub counters, baked in at build time by `scripts/fetch-github.mjs`.
 *
 * These replace the contribution *calendar* the original design used: that
 * grid is only available through an authenticated GraphQL call, which a static
 * site cannot make without shipping a token. The numbers here come from the
 * unauthenticated REST API and are accurate as of `github.json`'s `fetchedAt`.
 */
export function GitHubPanel() {
  const handle = site.handle
  const href = `https://github.com/${handle}`

  const stats = [
    { icon: GitFork, label: 'Repositories', value: github.publicRepos },
    { icon: Users, label: 'Followers', value: github.followers },
    { icon: Star, label: 'Following', value: github.following },
  ]

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>GitHub</PanelTitle>
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener me"
          className="ml-auto text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          @{github.login} →
        </a>
      </PanelHeader>

      <PanelContent>
        {github.bio && <p className="mb-3 text-sm text-muted-foreground">{github.bio}</p>}

        <dl className="grid grid-cols-3 gap-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Icon className="size-3.5 shrink-0" aria-hidden />
                {label}
              </dt>
              <dd className="mt-0.5 text-xl font-medium tabular">{value.toLocaleString()}</dd>
            </div>
          ))}
        </dl>
      </PanelContent>
    </Panel>
  )
}
