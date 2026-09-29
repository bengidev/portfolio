import { useEffect, useState } from 'react'

import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

interface ContributionDay {
  count: number
  day: string
}

interface ContributionsResponse {
  totalContributions: number
  weeks: ContributionDay[][]
}

const ENDPOINT = 'https://github-contributions-api.deno.dev'

/**
 * Year-long contribution grid, fetched in the browser.
 *
 * GitHub Pages has no server, so this is a runtime call rather than a build
 * step. Failures are non-fatal: the panel degrades to a muted placeholder so
 * the rest of the page is unaffected. The response is cached for the hour.
 */
export function GitHubContributions() {
  const [data, setData] = useState<ContributionsResponse | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${ENDPOINT}/${site.handle}.json`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status))
        return res.json()
      })
      .then((json: ContributionsResponse) => setData(json))
      .catch((error) => {
        if (error?.name === 'AbortError') return
        setFailed(true)
      })

    return () => controller.abort()
  }, [site.handle])

  const weeks = data?.weeks ?? []
  const total = data?.totalContributions ?? 0

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>GitHub contributions</PanelTitle>
        {total > 0 && (
          <span className="text-sm text-muted-foreground tabular">
            {total.toLocaleString()} in the last year
          </span>
        )}
      </PanelHeader>

      <PanelContent>
        {failed ? (
          <p className="text-sm text-muted-foreground">
            Could not load contributions. Set <code className="font-mono">site.handle</code> in{' '}
            <code className="font-mono">src/data/site.ts</code> to a valid GitHub username.
          </p>
        ) : (
          <ContributionGraph weeks={weeks} loading={!data} />
        )}
      </PanelContent>
    </Panel>
  )
}

function ContributionGraph({ weeks, loading }: { weeks: ContributionDay[][]; loading: boolean }) {
  if (loading) {
    return (
      <div className="flex gap-[3px] overflow-hidden" aria-hidden>
        {Array.from({ length: 53 }).map((_, week) => (
          <div key={week} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, day) => (
              <div key={day} className="size-2.5 animate-pulse rounded-[2px] bg-muted" />
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (weeks.length === 0) {
    return <p className="text-sm text-muted-foreground">No contribution data available.</p>
  }

  return (
    <div className="flex gap-[3px] overflow-x-auto pb-1">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day) => (
            <div
              key={day.day}
              title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.day}`}
              className={cn(
                'size-2.5 rounded-[2px]',
                levelColor(day.count),
                'ring-0 transition-[box-shadow] hover:ring-2 hover:ring-foreground/30',
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/** Map a day's count onto the five-step chart ramp. */
function levelColor(count: number) {
  if (count === 0) return 'bg-chart-1'
  if (count < 5) return 'bg-chart-2'
  if (count < 10) return 'bg-chart-3'
  if (count < 20) return 'bg-chart-4'
  return 'bg-chart-5'
}
