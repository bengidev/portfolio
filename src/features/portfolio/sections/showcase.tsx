import { Link } from 'react-router-dom'

import { Panel, PanelContent, PanelHeader, PanelTitle, PanelTitleSup } from '@/components/panel'
import { blogPosts, blocksShowcase, componentsShowcase, type ShowcaseItem } from '@/data/showcase'

/**
 * Index-card grids. All three share the same shell; only the data and the
 * footer link differ, so they are generated from one pair of components.
 */
export function Components() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Components <PanelTitleSup>({componentsShowcase.length})</PanelTitleSup>
        </PanelTitle>
        <SeeAll to="/components" />
      </PanelHeader>
      <PanelContent>
        <CardGrid items={componentsShowcase} />
      </PanelContent>
    </Panel>
  )
}

export function Blocks() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Blocks <PanelTitleSup>({blocksShowcase.length})</PanelTitleSup>
        </PanelTitle>
        <SeeAll to="/blocks" />
      </PanelHeader>
      <PanelContent>
        <CardGrid items={blocksShowcase} showDescription />
      </PanelContent>
    </Panel>
  )
}

function SeeAll({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className="ml-auto text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      All →
    </Link>
  )
}

function CardGrid({ items, showDescription }: { items: ShowcaseItem[]; showDescription?: boolean }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nothing here yet.</p>
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            to={item.href}
            className="group block rounded-lg border border-line bg-surface p-3 transition-colors hover:border-border hover:bg-accent"
          >
            <h3 className="text-sm font-medium tracking-tight">{item.name}</h3>
            {showDescription && item.description && (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Most recent posts, as a simple dated list. */
export function Blog() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Writing <PanelTitleSup>({blogPosts.length})</PanelTitleSup>
        </PanelTitle>
        <SeeAll to="/blog" />
      </PanelHeader>
      <PanelContent>
        <ul className="space-y-3">
          {blogPosts.map((post) => (
            <li key={post.href}>
              <Link to={post.href} className="group block">
                <div className="flex items-baseline gap-3">
                  <time
                    dateTime={post.date}
                    className="shrink-0 text-xs text-muted-foreground tabular"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h3 className="text-sm font-medium tracking-tight group-hover:underline">
                    {post.title}
                  </h3>
                </div>
                {post.description && (
                  <p className="mt-0.5 line-clamp-2 pl-[4.75rem] text-sm text-muted-foreground">
                    {post.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </PanelContent>
    </Panel>
  )
}

function formatDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
