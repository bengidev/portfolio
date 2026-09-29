import { Award, ExternalLink } from 'lucide-react'

import { Panel, PanelContent, PanelHeader, PanelTitle, PanelTitleSup } from '@/components/panel'
import { recognition } from '@/data/recognition'

/** Awards, prizes, and certifications. */
export function Recognition() {
  if (recognition.length === 0) return null

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Recognition <PanelTitleSup>({recognition.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ol className="space-y-3">
          {recognition.map((item) => (
            <li
              key={`${item.type}-${item.title}`}
              className="rounded-lg border border-line bg-surface p-3"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="flex items-center gap-2 text-sm font-medium tracking-tight">
                  <Award className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 link-underline"
                    >
                      {item.title}
                      <ExternalLink className="size-3 opacity-60" aria-hidden />
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <span className="ml-auto text-sm text-muted-foreground tabular">
                  {item.awardedAt}
                </span>
              </div>
              <p className="mt-1 pl-6 text-sm text-muted-foreground">
                {item.type} · {item.category}
                {item.receivedAt && (
                  <span className="text-muted-foreground/70"> · received {item.receivedAt}</span>
                )}
              </p>
            </li>
          ))}
        </ol>
      </PanelContent>
    </Panel>
  )
}
