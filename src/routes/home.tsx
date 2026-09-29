import { DotField, HatchDivider } from '@/components/section'
import { About } from '@/features/portfolio/sections/about'
import { Connect } from '@/features/portfolio/sections/connect'
import { Education } from '@/features/portfolio/sections/education'
import { Experience } from '@/features/portfolio/sections/experience'
import { GitHubActivity } from '@/features/portfolio/sections/github'
import { Profile } from '@/features/portfolio/sections/profile'
import { Projects } from '@/features/portfolio/sections/projects'
import { Stack } from '@/features/portfolio/sections/stack'

/**
 * The whole site is this one page.
 *
 * Sections are full-bleed bands separated by hairlines, with a diagonal
 * hatch between the major groups. To add, remove, or reorder one, edit this
 * list and add a matching entry to `src/data/sections.ts` so the command
 * palette and the header's "More" menu stay in step.
 */
export function Home() {
  return (
    <main className="max-w-screen overflow-x-hidden px-2">
      <div className="mx-auto max-w-3xl">
        {/* Banner of printed dots, closing the top of the composition. */}
        <div className="screen-line-before screen-line-after edge-frame overflow-hidden p-5">
          <DotField className="h-[70px] w-full sm:h-[110px]" />
        </div>

        <Profile />
        <HatchDivider />

        <About />
        <HatchDivider />

        <Connect />
        <GitHubActivity />
        <HatchDivider />

        <Experience />
        <Education />
        <HatchDivider />

        <Stack />
        <Projects />
        <HatchDivider />
      </div>
    </main>
  )
}
