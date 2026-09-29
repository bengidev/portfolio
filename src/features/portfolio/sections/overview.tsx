import { Panel } from '@/components/panel'
import { overviewFacts, overviewRole } from '@/data/about'
import { site } from '@/data/site'

/**
 * A short strip of facts sitting under the social row: where you are, what you
 * do, whether you're available. Static text — no API calls.
 */
export function Overview() {
  return (
    <Panel className="px-4 py-3">
      <p className="text-base text-balance">
        <span className="text-muted-foreground">Overview</span>
        <span className="mx-2 text-border">/</span>
        {overviewRole.split('@').map((part, i) =>
          i === 0 ? (
            <span key={part}>{part}@</span>
          ) : (
            <span key={part} className="font-medium">
              {part}
            </span>
          ),
        )}
      </p>

      <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
        {overviewFacts.map((fact) => (
          <div key={fact.label} className="flex gap-2">
            <dt className="text-muted-foreground">{fact.label}</dt>
            <dd className="truncate">
              {fact.href ? (
                <a className="link-underline" href={fact.href} target="_blank" rel="noreferrer">
                  {fact.value}
                </a>
              ) : (
                fact.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-2 text-sm text-muted-foreground/70">
        {site.location}
      </p>
    </Panel>
  )
}
