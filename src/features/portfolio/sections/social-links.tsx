import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Panel } from '@/components/panel'
import { SocialIcon } from '@/components/social-icon'
import { followTarget, socialLinks } from '@/data/site'

/**
 * Horizontal row of social links. Each icon tracks the pointer and drifts
 * slightly away from it, so the row reacts to the cursor.
 */
export function SocialLinks() {
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>({})

  function handleMove(key: string) {
    return (event: React.PointerEvent<HTMLAnchorElement>) => {
      const el = refs.current[key]
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)
      setPos((prev) => ({ ...prev, [key]: { x: x * 0.3, y: y * 0.3 } }))
    }
  }

  function handleLeave(key: string) {
    setPos((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const primary = socialLinks.find((link) => link.key === followTarget)

  return (
    <Panel className="p-4">
      <ul className="flex items-center gap-4">
        {socialLinks.map((link) => (
          <li key={link.key}>
            <motion.a
              ref={(el) => {
                refs.current[link.key] = el
              }}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener me"
              aria-label={link.label}
              title={link.handle ? `${link.label} — ${link.handle}` : link.label}
              className="text-muted-foreground hover:text-foreground block transition-colors"
              animate={{ x: pos[link.key]?.x ?? 0, y: pos[link.key]?.y ?? 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              onPointerMove={handleMove(link.key)}
              onPointerLeave={() => handleLeave(link.key)}
            >
              <SocialIcon name={link.key} className="size-5" />
            </motion.a>
          </li>
        ))}

        {primary && (
          <li className="ml-auto">
            <Link
              to="/follow"
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              follow me
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </li>
        )}
      </ul>
    </Panel>
  )
}
