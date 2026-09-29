import { useEffect, useState } from 'react'

import { BtrdMark } from '@/features/portfolio/sections/wordmark'
import { flipSentences, site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * The hero: portrait, the BTRD wordmark, the full name beneath it, and a line
 * that rotates through a few phrases.
 *
 * The portrait is a single file serving both themes — see the note on
 * `avatarDark` in `src/data/site.ts`.
 */
export function ProfileHeader() {
  return (
    <div className="screen-line-bottom screen-line-bottom-border grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x">
      <figure className="relative col-span-2 flex items-center justify-center p-6 sm:col-span-1 sm:col-start-2 sm:p-10">
        {/* `size-full` + the SVG's own preserveAspectRatio keeps the wordmark
            inside the plate at any width, instead of overflowing it. */}
        <BtrdMark className="max-h-64 w-full sm:max-h-80" />
        <figcaption className="pointer-events-none absolute right-2 bottom-2 text-sm/none tracking-wide text-muted-foreground/60 tabular select-none sm:right-4 sm:bottom-4">
          @{site.handle}
        </figcaption>
      </figure>

      <div className="flex flex-col sm:row-span-2 sm:row-start-1">
        <div className="screen-line-top mt-auto shrink-0 border-r border-line">
          <div className="mx-0.5 my-0.75 flex outline-none">
            <Avatar />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="z-1 mt-auto border-t border-line">
          {/* Wordmark. `BTRD` carries the display weight; the full name sits
              beneath it as a subordinate line so both are legible. */}
          <div className="px-4 pt-3 pb-2">
            <h1 className="font-heading text-[2.25rem]/none font-semibold tracking-[-0.02em]">
              {site.displayName}
            </h1>
            <p className="mt-1 text-sm tracking-tight text-muted-foreground">{site.name}</p>
          </div>
          <FlipSentences />
        </div>
      </div>
    </div>
  )
}

/**
 * The circular portrait. Falls back to a monogram tile if no image has been
 * dropped into `public/` yet, so a fresh clone never shows a broken image.
 */
function Avatar({ className }: { className?: string }) {
  const [broken, setBroken] = useState(false)

  const frame = cn(
    'relative size-30 overflow-hidden rounded-full min-[24rem]:size-32 sm:size-40',
    className,
  )

  if (broken) {
    return (
      <div className={cn(frame, 'flex items-center justify-center bg-muted select-none')}>
        <span className="text-2xl font-semibold tracking-tight text-muted-foreground">
          {site.displayName}
        </span>
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] inset-ring-1 inset-ring-foreground/30 dark:inset-ring-foreground/10" />
      </div>
    )
  }

  return (
    <div className={frame}>
      <img
        className="block size-full object-cover select-none dark:hidden"
        src={site.avatarLight}
        alt={`${site.name}, portrait`}
        width={512}
        height={512}
        onError={() => setBroken(true)}
      />
      <img
        className="hidden size-full object-cover select-none dark:block dark:invert"
        src={site.avatarDark}
        alt=""
        width={512}
        height={512}
        onError={() => setBroken(true)}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] inset-ring-1 inset-ring-foreground/30 dark:inset-ring-foreground/10" />
    </div>
  )
}

/** Cycles `flipSentences` on an interval, sliding each line vertically. */
function FlipSentences() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (flipSentences.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % flipSentences.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [])

  if (flipSentences.length === 0) return null

  return (
    <div className="relative h-9 overflow-hidden border-t border-line py-1 pl-4 sm:h-9">
      {flipSentences.map((sentence, i) => (
        <p
          key={sentence}
          className={cn(
            'flex items-center text-sm text-muted-foreground transition-all duration-500',
            i === index
              ? 'relative translate-y-0 opacity-100'
              : 'absolute inset-0 translate-y-2 pl-4 opacity-0',
          )}
          aria-hidden={i !== index}
        >
          {sentence}
        </p>
      ))}
    </div>
  )
}
