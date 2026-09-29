import { GraduationCap } from 'lucide-react'

import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { Badge } from '@/components/ui/badge'
import { education } from '@/data/education'

export function Education() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Education</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ol className="space-y-5">
          {education.map((item) => (
            <li key={item.school}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="flex items-center gap-2 text-base font-medium tracking-tight">
                  <GraduationCap className="size-4 text-muted-foreground" aria-hidden />
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer noopener" className="link-underline">
                      {item.school}
                    </a>
                  ) : (
                    item.school
                  )}
                </h3>
                <span className="ml-auto text-sm text-muted-foreground tabular">{item.period}</span>
              </div>

              {item.degree && <p className="mt-0.5 pl-6 text-sm text-muted-foreground">{item.degree}</p>}

              {item.tags.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-1.5 pl-6">
                  {item.tags.map((tag) => (
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
