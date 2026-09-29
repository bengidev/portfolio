import { AnimatePresence, motion } from 'motion/react'
import { Quote } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/panel'
import { testimonials } from '@/data/testimonials'

/** Auto-advancing quote carousel. Pauses on hover and on reduced motion. */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || testimonials.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [paused])

  if (testimonials.length === 0) return null
  const current = testimonials[index]

  return (
    <Panel
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <PanelHeader>
        <PanelTitle>Kind words</PanelTitle>
        <div className="ml-auto flex items-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.author}
              type="button"
              aria-label={`Show testimonial from ${item.author}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-4 bg-foreground' : 'w-1.5 bg-border hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
      </PanelHeader>

      <PanelContent className="min-h-28">
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.author + index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Quote className="size-4 text-border" aria-hidden />
            <blockquote className="mt-2 text-base text-balance text-muted-foreground">
              {current.quote}
            </blockquote>
            <figcaption className="mt-3 flex items-center gap-2 text-sm">
              {current.avatar && (
                <img
                  src={current.avatar}
                  alt=""
                  className="size-6 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <span className="font-medium">{current.author}</span>
              {current.role && <span className="text-muted-foreground">{current.role}</span>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </PanelContent>
    </Panel>
  )
}
