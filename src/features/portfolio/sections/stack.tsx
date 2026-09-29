import { Section } from '@/components/section'
import { stack } from '@/data/stack'

/**
 * The toolkit, grouped by role. Each name links to its own site, so the
 * section doubles as a set of references.
 */
export function Stack() {
  return (
    <Section id="stack" title="Stack">
      <div className="space-y-5">
        {stack.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-xs text-muted-foreground">{group.title}</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="pressable inline-block rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
