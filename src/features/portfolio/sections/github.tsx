import { useMemo } from 'react'

import { Section } from '@/components/section'
import { cn } from '@/lib/utils'

import contributions from '@/data/contributions.json'

/**
 * The year-long contribution calendar.
 *
 * Data comes from `src/data/contributions.json`, generated at build time by
 * `scripts/fetch-contributions.mjs`. That file is the only place real
 * contribution counts live; this component has no fetching of its own, so it
 * renders identically on the server and the client and never leaks a token.
 *
 * The grid is laid out column-per-week (CSS `grid-flow-col` over 7 rows), the
 * same axis GitHub's own profile uses, so a column is one week and a row is a
 * day of the week.
 */

interface Day {
  contributionCount: number
  date: string
}

interface Contributions {
  login: string
  totalContributions: number
  firstDate: string | null
  lastDate: string | null
  weeks: { firstDay: string; days: Day[] }[]
  fetchedAt: string
}

const LEVELS = [
  'bg-chart-1', // 0
  'bg-chart-2', // 1–4
  'bg-chart-3', // 5–9
  'bg-chart-4', // 10–19
  'bg-chart-5', // 20+
]

/** Bucket a day's count into the five-step ramp. */
function levelOf(count: number) {
  if (count === 0) return 0
  if (count < 5) return 1
  if (count < 10) return 2
  if (count < 20) return 3
  return 4
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

/** "28 Sep 2025" */
function formatDate(iso: string | null) {
  if (!iso) return '—'
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

/** Pitch of one grid column: a 10px cell (`size-2.5`) plus a 3px gap. */
const COL = 13

export function GitHubActivity() {
  const data = contributions as unknown as Contributions

  const { weeks, monthLabels } = useMemo(() => {
    const source = data.weeks
    if (!source.length) return { weeks: source, monthLabels: [] as { index: number; text: string }[] }

    // One label per month. A month starts at the first week whose first day
    // falls in a later month than the previous week's. When two labels would
    // sit too close, nudge forward *within the same month* rather than
    // dropping the label — dropping it loses the end of the year.
    const labels: { index: number; text: string }[] = []
    let lastIndex = -Infinity

    for (let i = 1; i < source.length; i++) {
      const prev = source[i - 1].days[0]
      const cur = source[i].days[0]
      if (!prev || !cur) continue

      const monthOf = (d: { date: string }) => new Date(`${d.date}T00:00:00Z`).getUTCMonth()
      const month = monthOf(cur)
      if (monthOf(prev) === month) continue // same month as the week before

      // Nudge forward a column or two to keep the labels legible.
      let at = i
      while (at + 1 < source.length && at - lastIndex < 2) {
        const next = source[at + 1].days[0]
        if (!next || monthOf(next) !== month) break // ran out of this month
        at++
      }
      if (at - lastIndex < 2) continue // no room anywhere left

      labels.push({ index: at, text: MONTHS[month] })
      lastIndex = at
    }

    return { weeks: source, monthLabels: labels }
  }, [data.weeks])

  const hasData = weeks.length > 0
  const year = data.lastDate ? new Date(`${data.lastDate}T00:00:00Z`).getUTCFullYear() : null

  return (
    <Section
      id="activity"
      title="GitHub Activity"
      action={
        <a
          href={`https://github.com/${data.login}`}
          target="_blank"
          rel="noreferrer noopener me"
          className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-150 ease-out-expo hover:text-foreground"
        >
          @{data.login} →
        </a>
      }
    >
      {hasData ? (
        <div className="overflow-x-auto pb-1">
          <div className="min-w-max">
            {/* Month labels, positioned over the column each month starts in. */}
            <div className="relative mb-2 ml-9 h-4" aria-hidden>
              {monthLabels.map((label) => (
                <span
                  key={`${label.text}-${label.index}`}
                  className="absolute font-mono text-xs text-muted-foreground"
                  style={{ left: label.index * COL }}
                >
                  {label.text}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              {/* Day-of-week labels down the left edge. */}
              <div className="grid w-7 shrink-0 grid-rows-7 gap-[3px]" aria-hidden>
                {DAY_LABELS.map((label, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs leading-none text-muted-foreground"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                {weeks.flatMap((week, wi) =>
                  week.days.map((day) => (
                    <div
                      key={`${day.date}-${wi}`}
                      title={`${day.contributionCount} contribution${
                        day.contributionCount === 1 ? '' : 's'
                      } on ${day.date}`}
                      className={cn('size-2.5 rounded-[2px]', LEVELS[levelOf(day.contributionCount)])}
                    />
                  )),
                )}
              </div>
            </div>
          </div>

          {/* Count and legend. */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 font-mono text-xs">
            <p className="text-muted-foreground">
              <span className="tabular text-foreground">
                {data.totalContributions.toLocaleString('en-US')}
              </span>{' '}
              contributions
              {year ? ` in ${year}` : ''} · {formatDate(data.firstDate)} –{' '}
              {formatDate(data.lastDate)}
            </p>

            <p className="flex items-center gap-1.5 text-muted-foreground" aria-hidden>
              Less
              {LEVELS.map((level, i) => (
                <span key={i} className={cn('size-2.5 rounded-[2px]', level)} />
              ))}
              More
            </p>
          </div>
        </div>
      ) : (
        <EmptyCalendar login={data.login} />
      )}
    </Section>
  )
}

function EmptyCalendar({ login }: { login: string }) {
  return (
    <div className="font-mono text-xs leading-relaxed text-muted-foreground">
      <p>
        The contribution calendar needs a <code className="text-foreground">GITHUB_TOKEN</code>{' '}
        secret with <code className="text-foreground">read:user</code> scope in the repository,
        then a rebuild. Add it under <em>Settings → Secrets and variables → Actions</em> and push.
      </p>
      <a
        href={`https://github.com/${login}`}
        target="_blank"
        rel="noreferrer noopener me"
        className="mt-2 inline-block text-foreground underline underline-offset-4 hover:decoration-current"
      >
        View @{login} on GitHub instead →
      </a>
    </div>
  )
}
