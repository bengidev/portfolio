import { Section } from '@/components/section'
import { about } from '@/data/about'

/**
 * Renders `*asterisked*` spans as bold. Keeps the copy in `src/data` as
 * plain strings rather than markup, so the data file stays portable.
 */
function withEmphasis(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, index) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
      <strong key={index} className="font-semibold text-foreground">
        {part.slice(1, -1)}
      </strong>
    ) : (
      part
    ),
  )
}

export function About() {
  return (
    <Section id="about" title="About">
      <ul className="space-y-3">
        {about.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 font-mono text-sm leading-relaxed text-balance text-foreground"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
            <span className="min-w-0">{withEmphasis(item)}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
