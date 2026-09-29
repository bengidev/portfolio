import { Briefcase, MapPin } from 'lucide-react'

import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { Badge } from '@/components/ui/badge'
import { experiences } from '@/data/experience'

/** Roles, newest first. */
export function Experiences() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ol className="space-y-6">
          {experiences.map((experience) => (
            <li key={`${experience.company}-${experience.period}`} className="group">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-base font-medium tracking-tight">
                  {experience.href ? (
                    <a
                      href={experience.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline"
                    >
                      {experience.company}
                    </a>
                  ) : (
                    experience.company
                  )}
                </h3>
                {experience.status === 'Current' && <Badge variant="muted">Current</Badge>}
                <span className="ml-auto text-sm text-muted-foreground tabular">
                  {experience.period}
                </span>
              </div>

              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" aria-hidden />
                {experience.location}
                {experience.locationType && ` · ${experience.locationType}`}
              </p>

              {experience.highlights.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Briefcase
                        className="mt-0.5 size-3.5 shrink-0 text-border"
                        aria-hidden
                      />
                      <span className="text-balance">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              {experience.tags.length > 0 && (
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {experience.tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="outline">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </PanelContent>
    </Panel>
  )
}
