import { GraduationCap } from 'lucide-react'

import { Section } from '@/components/section'
import { Entry, EntryList } from '@/features/portfolio/components/entry'
import { education } from '@/data/education'

export function Education() {
  return (
    <Section id="education" title="Education">
      <EntryList>
        {education.map((entry) => (
          <Entry
            key={`${entry.school}-${entry.period}`}
            icon={<GraduationCap className="size-3.5" />}
            title={
              entry.href ? (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
                >
                  {entry.school}
                </a>
              ) : (
                entry.school
              )
            }
            headline={entry.degree ?? 'Student'}
            meta={entry.period}
            tags={entry.tags}
          />
        ))}
      </EntryList>
    </Section>
  )
}
