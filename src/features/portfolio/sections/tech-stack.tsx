import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { stack } from '@/data/stack'

/** Tools and technologies, grouped into columns. */
export function TechStack() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {stack.map((group) => (
            <section key={group.title}>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">{group.title}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex rounded-md border border-line bg-surface px-2 py-1 text-sm transition-colors hover:border-border hover:bg-accent"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}
