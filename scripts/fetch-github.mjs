/**
 * Refreshes `src/data/github.json` from the public GitHub REST API.
 *
 * Run before building so the stats are baked in — a static site cannot rely on
 * a live call from the visitor's browser without exposing a rate-limited,
 * third-party request on every page load.
 *
 * The exact contribution *calendar* is not available here: it needs an
 * authenticated GraphQL call. This fetches stable profile counters instead,
 * which need no token.
 *
 * Unauthenticated GitHub allows 60 requests/hour per IP. This runs once per
 * build, so that is plenty. If the request fails the previous file is left
 * untouched and the build continues.
 */
import { writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const handle = process.env.GITHUB_HANDLE ?? 'bengidev'
const out = resolve('src/data/github.json')
const endpoint = `https://api.github.com/users/${encodeURIComponent(handle)}`

try {
  const res = await fetch(endpoint, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-build-script',
    },
  })

  if (!res.ok) throw new Error(`GitHub responded ${res.status} ${res.statusText}`)

  const user = await res.json()

  const data = {
    login: user.login,
    name: user.name,
    bio: user.bio,
    location: user.location,
    blog: user.blog || null,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    fetchedAt: new Date().toISOString(),
  }

  await writeFile(out, JSON.stringify(data, null, 2) + '\n')
  console.log(
    `github.json updated — @${data.login}: ${data.publicRepos} repos, ${data.followers} followers`,
  )
} catch (error) {
  if (existsSync(out)) {
    const previous = JSON.parse(await readFile(out, 'utf8'))
    console.warn(`Could not refresh GitHub stats (${error.message}).`)
    console.warn(`Keeping previous data for @${previous.login} from ${previous.fetchedAt}.`)
  } else {
    console.error(`Could not fetch GitHub stats: ${error.message}`)
    console.error('No existing src/data/github.json to fall back on.')
    process.exit(1)
  }
}
