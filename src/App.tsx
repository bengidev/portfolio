import { Link, Route, Routes, useParams } from 'react-router-dom'

import { PageShell, StubPage } from '@/routes/page-shell'
import { blogPosts, blocksShowcase, componentsShowcase } from '@/data/showcase'
import { projects } from '@/data/projects'
import { Home } from '@/routes/home'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/components"
        element={
          <StubPage
            title="Components"
            description="Reusable pieces, documented and ready to drop in."
            items={componentsShowcase}
          />
        }
      />
      <Route path="/components/:slug" element={<DetailStub kind="component" />} />

      <Route
        path="/blocks"
        element={
          <StubPage
            title="Blocks"
            description="Larger sections composed from components."
            items={blocksShowcase}
          />
        }
      />
      <Route path="/blocks/:slug" element={<DetailStub kind="block" />} />

      <Route
        path="/blog"
        element={
          <StubPage
            title="Writing"
            description="Notes on design engineering and the web."
            items={blogPosts.map((post) => ({
              name: post.title,
              href: post.href,
              description: post.description,
            }))}
          />
        }
      />
      <Route path="/blog/:slug" element={<DetailStub kind="post" />} />

      <Route
        path="/projects"
        element={
          <StubPage
            title="Projects"
            description="Things I have built, and why."
            items={projects.map((project) => ({
              name: project.title,
              description: project.summary,
            }))}
          />
        }
      />

      <Route path="/follow" element={<FollowPage />} />
      <Route path="/colophon" element={<Colophon />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

/**
 * Detail placeholder. Resolves the slug against the data files so the heading
 * is correct even before the page is fleshed out.
 */
function DetailStub({ kind }: { kind: 'component' | 'block' | 'post' }) {
  const { slug } = useParams()

  // Normalised so all three pools share one shape.
  const pools: Record<'component' | 'block' | 'post', { name: string; description?: string; href?: string }[]> = {
    component: componentsShowcase,
    block: blocksShowcase,
    post: blogPosts.map((post) => ({
      name: post.title,
      href: post.href,
      description: post.description,
    })),
  }
  const match = pools[kind].find((item) => item.href?.endsWith(`/${slug}`))
  const title = match?.name ?? slug ?? 'Untitled'

  return (
    <PageShell title={title} description={match?.description}>
      <p className="text-sm text-muted-foreground">
        Placeholder for the {kind} page. Add the route and content under{' '}
        <code className="font-mono text-xs">src/routes/</code> when you&apos;re ready.
      </p>
    </PageShell>
  )
}

function FollowPage() {
  return (
    <PageShell
      title="Follow"
      description="Where to find me. The links are the same ones in the header."
    >
      <p className="text-sm text-muted-foreground">
        Social handles live in <code className="font-mono text-xs">src/data/site.ts</code>.
      </p>
    </PageShell>
  )
}

function Colophon() {
  return (
    <PageShell
      title="Colophon"
      description="How this site is built."
    >
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>React 19 + Vite, deployed as a static bundle.</li>
        <li>Tailwind CSS v4 with a custom monochrome token set.</li>
        <li>TypeScript throughout; all copy lives in <code className="font-mono text-xs">src/data/</code>.</li>
        <li>Published to GitHub Pages on every push to the default branch.</li>
      </ul>
    </PageShell>
  )
}

function NotFound() {
  return (
    <PageShell title="404" description="That page does not exist.">
      <Link to="/" className="link-underline text-sm">
        Back to the home page
      </Link>
    </PageShell>
  )
}
