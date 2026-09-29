import { Briefcase } from 'lucide-react'

import { Section } from '@/components/section'
import { Entry, EntryList } from '@/features/portfolio/components/entry'
import { experiences } from '@/data/experience'

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <EntryList>
        {experiences.map((experience) => (
          <Entry
            key={`${experience.company}-${experience.period}`}
            icon={<Briefcase className="size-3.5" />}
            title={
              experience.href ? (
                <a
                  href={experience.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-out-expo hover:decoration-current"
                >
                  {experience.company}
                </a>
              ) : (
                experience.company
              )
            }
            headline={experience.role}
            meta={
              <>
                {experience.location}
                {experience.locationType ? ` · ${experience.locationType}` : ''} ·{' '}
                {experience.period}
              </>
            }
            tags={experience.tags}
          >
            {experience.highlights.map((highlight, index) => (
              <p key={index} className="flex gap-2 font-mono text-xs leading-relaxed text-muted-foreground">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden />
                <span className="min-w-0">{highlight}</span>
              </p>
            ))}
          </Entry>
        ))}
      </EntryList>
    </Section>
  )
}
