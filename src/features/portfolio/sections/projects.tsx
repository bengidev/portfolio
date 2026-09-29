import { ArrowUpRight } from 'lucide-react'

import { Panel, PanelContent, PanelHeader, PanelTitle, PanelTitleSup } from '@/components/panel'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Projects <PanelTitleSup>({projects.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.title}>
              <article className="rounded-lg border border-line bg-surface p-4 transition-colors hover:border-border">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-base font-medium tracking-tight">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 link-underline"
                      >
                        {project.title}
                        <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  {project.badge && <Badge variant="muted">{project.badge}</Badge>}
                  <span className="ml-auto text-sm text-muted-foreground tabular">
                    {project.period}
                  </span>
                </div>

                <p className="mt-1 text-sm text-balance text-muted-foreground">{project.summary}</p>

                {project.details && project.details.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {project.details.map((detail) => (
                      <li key={detail} className="flex gap-2.5 text-sm text-muted-foreground">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-border" />
                        <span className="text-balance">{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {project.tags.length > 0 && (
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Badge variant="outline">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ul>
      </PanelContent>
    </Panel>
  )
}
