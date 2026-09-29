import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { about } from '@/data/about'

/** Bulleted intro. `*emphasis*` inside a string renders bold. */
export function About() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ul className="space-y-2 text-base text-balance">
          {about.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-border" />
              <span className="text-muted-foreground">{renderEmphasis(item)}</span>
            </li>
          ))}
        </ul>
      </PanelContent>
    </Panel>
  )
}

/** Minimal inline `*bold*` support so the copy file stays readable. */
function renderEmphasis(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
      <strong key={i} className="font-medium text-foreground">
        {part.slice(1, -1)}
      </strong>
    ) : (
      part
    ),
  )
}
