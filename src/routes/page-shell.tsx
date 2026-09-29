import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { site } from '@/data/site'

/**
 * Shared shell for every non-home route: a back link, a title, and content.
 * Keeps subpages visually consistent with the home column.
 */
export function PageShell({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        {site.name}
      </Link>

      <h1 className="text-3xl font-medium tracking-tight text-balance">{title}</h1>
      {description && (
        <p className="mt-2 text-base text-balance text-muted-foreground">{description}</p>
      )}
      <div className="mt-6">{children}</div>
    </main>
  )
}

/**
 * Placeholder for routes that exist in navigation but have no content yet.
 * Swap the body for a real list when you build the page out.
 */
export function StubPage({
  title,
  description,
  items,
}: {
  title: string
  description?: string
  items?: { name: string; href?: string; description?: string }[]
}) {
  return (
    <PageShell title={title} description={description}>
      <Panel>
        <PanelHeader>
          <PanelTitle>{items ? `${items.length} entries` : 'Coming soon'}</PanelTitle>
        </PanelHeader>
        <PanelContent>
          {items && items.length > 0 ? (
            <ul className="space-y-2">
              {items.map((item) => {
                const body = (
                  <>
                    <span className="text-sm font-medium tracking-tight">{item.name}</span>
                    {item.description && (
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </>
                )
                return (
                  <li key={item.name}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="block rounded-lg border border-line bg-surface p-3 transition-colors hover:border-border hover:bg-accent"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="rounded-lg border border-line bg-surface p-3">{body}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              This page hasn&apos;t been built yet. Content comes from{' '}
              <code className="font-mono text-xs">src/data/</code>.
            </p>
          )}
        </PanelContent>
      </Panel>
    </PageShell>
  )
}
