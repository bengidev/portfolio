import { useEffect, useState } from 'react'

import { flipSentences, site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * The hero: avatar, name, and a line that rotates through a few phrases.
 *
 * The avatar swaps with the colour scheme — put a different image in
 * `public/avatar-light.*` and `public/avatar-dark.*` if you want that.
 */
export function ProfileHeader() {
  return (
    <div className="screen-line-bottom screen-line-bottom-border grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x">
      <figure className="relative col-span-2 p-2 sm:col-span-1 sm:col-start-2 sm:p-4">
        <ProfileMark />
        <figcaption className="pointer-events-none absolute right-2 bottom-2 text-sm/none tracking-wide text-muted-foreground/60 tabular select-none sm:right-4 sm:bottom-4">
          Fig. 1.
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
          <div className="flex -translate-x-px items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-[2rem]/none font-medium tracking-tight">
              {site.name}
            </h1>
            {site.verified && (
              <span
                className="text-link flex size-4.5 select-none items-center justify-center rounded-full text-xs font-bold text-white"
                aria-label="Verified"
                title="Verified"
              >
                ✓
              </span>
            )}
          </div>
          <FlipSentences />
        </div>
      </div>
    </div>
  )
}

/**
 * The large plate in the hero.
 *
 * Drawn as a self-contained SVG that inherits `currentColor`, so it themes
 * itself and scales to the column. Replace this with your own mark, or drop an
 * <img> in its place.
 */
function ProfileMark() {
  return (
    <div className="text-muted-foreground flex aspect-4/3 w-full items-center justify-center sm:aspect-square">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className="h-full max-h-full w-auto"
        role="img"
        aria-label="Personal mark"
      >
        {/* Hairline frame, echoing the rules that run through the page. */}
        <rect
          x="24.5"
          y="24.5"
          width="151"
          height="151"
          rx="4"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <rect
          x="40.5"
          y="40.5"
          width="119"
          height="119"
          rx="4"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeDasharray="3 4"
        />

        {/* Stacked chevrons — a simple "built, not assembled" motif. */}
        <path
          d="M66 118 100 84l34 34"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M66 140 100 106l34 34"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.45"
        />

        {/* Centre point, with tick marks radiating to the frame. */}
        <circle cx="100" cy="100" r="3.5" fill="currentColor" />
        <path
          d="M100 40v14M100 146v14M40 100h14M146 100h14"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />
      </svg>
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
        <span className="text-3xl font-medium text-muted-foreground">
          {site.name.trim().charAt(0).toUpperCase() || '·'}
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
        alt={`${site.name} portrait`}
        width={160}
        height={160}
        onError={() => setBroken(true)}
      />
      <img
        className="hidden size-full object-cover select-none dark:block"
        src={site.avatarDark}
        alt=""
        width={160}
        height={160}
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
