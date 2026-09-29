import { Eye, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

import github from '@/data/github.json'
import { flipSentences, site } from '@/data/site'
import { useLocalTime } from '@/hooks/use-local-time'

/**
 * Cycles through a list of lines, re-triggering a CSS animation on each
 * change by swapping the React `key`. Returns the current line.
 */
function useFlipText(lines: string[], interval = 2800) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (lines.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % lines.length)
    }, interval)
    return () => window.clearInterval(timer)
  }, [lines.length, interval])

  return lines[index] ?? ''
}

/** The GitHub numbers shown at the top-right of the profile row. */
const profileStats = [
  { icon: Eye, value: github.publicRepos, label: 'public repositories' },
  { icon: Star, value: github.followers, label: 'followers' },
]

export function Profile() {
  const time = useLocalTime(site.timezone)
  const flip = useFlipText([...flipSentences])

  return (
    <div className="edge-frame screen-line-after flex flex-col gap-4 p-4 sm:flex-row sm:gap-0 sm:p-5">
      {/* Portrait. Takes a third of the width on small screens so the
          name and role still get a full line each. */}
      <div className="w-[38%] shrink-0 sm:size-32">
        <div className="aspect-square w-full rounded-xl border border-border p-1 transition duration-300 hover:brightness-90">
          <img
            src={site.avatarLight}
            alt={`${site.name}'s portrait`}
            className="size-full rounded-lg object-cover dark:invert"
            width={512}
            height={512}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 sm:pl-4">
        <div className="flex items-center justify-between gap-2">
          <a
            href={`https://github.com/${site.handle}`}
            target="_blank"
            rel="noreferrer noopener me"
            className="truncate font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            @{site.handle}
          </a>

          <dl className="flex shrink-0 items-center gap-3">
            {profileStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <dt className="sr-only">{label}</dt>
                <dd className="tabular flex items-center gap-1">
                  <Icon className="size-3.5" aria-hidden />
                  {value.toLocaleString('en-US')}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <h1 className="font-pixel text-xl leading-none sm:text-3xl">{site.name}</h1>

        {/* The rotating line. Height is fixed to its longest entry so the
            row below does not jump when the text changes. */}
        <p className="min-h-5 font-mono text-sm leading-snug text-balance text-muted-foreground">
          <span key={flip} className="inline-block animate-flip-in whitespace-pre-wrap">
            {flip}
          </span>
        </p>

        <p className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" aria-hidden />
          <span className="tabular">{time}</span>
          <span className="text-muted-foreground/60">· {site.location}</span>
        </p>
      </div>
    </div>
  )
}
