/**
 * Refreshes `src/data/contributions.json` — the year-long contribution
 * calendar — from the GitHub GraphQL API.
 *
 * Unlike the profile counters in `fetch-github.mjs`, this one is
 * authenticated: the contribution calendar is not exposed by the REST API and
 * not available from an unauthenticated request. The token is read from
 * GITHUB_TOKEN and used here at build time only, so it is never present in
 * the bundle that ships to visitors.
 *
 * Required scope: `read:user`. Nothing more.
 *
 * Graceful degradation: with no token, or a failed request, the previous file
 * is left alone and the build continues. The panel then renders whatever was
 * last fetched rather than breaking the deploy.
 */
import { writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const handle = process.env.GITHUB_HANDLE ?? 'bengidev'
const token = process.env.GITHUB_TOKEN
const out = resolve('src/data/contributions.json')

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

async function keepPrevious(reason) {
  console.warn(`Contribution calendar not refreshed: ${reason}`)
  if (existsSync(out)) {
    const previous = JSON.parse(await readFile(out, 'utf8'))
    console.warn(`Keeping previous data for @${previous.login} from ${previous.fetchedAt}.`)
  } else {
    console.warn('No existing src/data/contributions.json to fall back on — the panel will stay empty.')
  }
}

if (!token) {
  await keepPrevious('GITHUB_TOKEN is not set')
} else {
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-build-script',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: handle } }),
    })

    if (!res.ok) throw new Error(`GitHub responded ${res.status} ${res.statusText}`)

    const json = await res.json()
    if (json.errors?.length) {
      throw new Error(json.errors.map((e) => e.message).join('; '))
    }

    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar?.weeks?.length) throw new Error('no contribution data returned')

    const days = calendar.weeks.flatMap((week) => week.contributionDays)

    const data = {
      login: handle,
      totalContributions: calendar.totalContributions,
      firstDate: days[0]?.date ?? null,
      lastDate: days[days.length - 1]?.date ?? null,
      weeks: calendar.weeks.map((week) => ({
        firstDay: week.firstDay,
        days: week.contributionDays,
      })),
      fetchedAt: new Date().toISOString(),
    }

    await writeFile(out, JSON.stringify(data) + '\n')
    console.log(
      `contributions.json updated — @${handle}: ${data.totalContributions} contributions ` +
        `(${data.firstDate} → ${data.lastDate})`,
    )
  } catch (error) {
    await keepPrevious(error.message)
  }
}
