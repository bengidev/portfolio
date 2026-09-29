import { Panel } from '@/components/panel'
import { overviewFacts } from '@/data/about'
import { site } from '@/data/site'
import { useLocalTime } from '@/hooks/use-local-time'

/**
 * A short strip of facts sitting under the social row: where you are, your
 * timezone, and how to reach you. All static text apart from the clock.
 */
export function Overview() {
  const localTime = useLocalTime(site.timezone)

  return (
    <Panel className="px-4 py-3">
      <p className="text-base text-balance">
        <span className="text-muted-foreground">Overview</span>
        <span className="mx-2 text-border">/</span>
        <span>{site.role}</span>
        {site.company && (
          <>
            <span className="text-muted-foreground"> @ </span>
            <span className="font-medium">{site.company}</span>
          </>
        )}
      </p>

      <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
        {overviewFacts.map((fact) => (
          <div key={fact.label} className="flex gap-2">
            <dt className="shrink-0 text-muted-foreground">{fact.label}</dt>
            <dd className="truncate">
              {fact.href ? (
                <a className="link-underline" href={fact.href}>
                  {fact.value}
                </a>
              ) : (
                fact.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-2 text-sm text-muted-foreground/70 tabular">
        Local time {localTime} ({site.timezoneLabel})
      </p>
    </Panel>
  )
}
