import { ArrowUpRight } from 'lucide-react'

import { Section } from '@/components/section'
import { Entry, EntryList } from '@/features/portfolio/components/entry'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <EntryList>
        {projects.map((project) => (
          <Entry
            key={project.title}
            icon={
              project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${project.title}`}
                  className="pressable grid size-7 place-items-center rounded-md hover:bg-accent hover:text-foreground"
                >
                  <ArrowUpRight className="size-3.5" />
                </a>
              ) : undefined
            }
            title={
              project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-out-expo hover:decoration-current"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )
            }
            headline={project.summary}
            meta={
              <span className="flex items-center gap-2">
                {project.period}
                {project.badge && (
                  <span className="rounded border border-border px-1.5 py-px text-[10px] text-muted-foreground">
                    {project.badge}
                  </span>
                )}
              </span>
            }
            tags={project.tags}
          >
            {project.details?.map((detail, index) => (
              <p
                key={index}
                className="flex gap-2 font-mono text-xs leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden />
                <span className="min-w-0">{detail}</span>
              </p>
            ))}
          </Entry>
        ))}
      </EntryList>
    </Section>
  )
}
