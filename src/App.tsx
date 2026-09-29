import { Link, Route, Routes } from 'react-router-dom'

import { PageShell, StubPage } from '@/routes/page-shell'
import { projects } from '@/data/projects'
import { Home } from '@/routes/home'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

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
    <PageShell title="Colophon" description="How this site is built.">
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>React 19 + Vite, deployed as a static bundle.</li>
        <li>Tailwind CSS v4 with a custom monochrome token set.</li>
        <li>
          TypeScript throughout; all copy lives in{' '}
          <code className="font-mono text-xs">src/data/</code>.
        </li>
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
