import { Separator } from '@/components/panel'
import { About } from '@/features/portfolio/sections/about'
import { Education } from '@/features/portfolio/sections/education'
import { Experiences } from '@/features/portfolio/sections/experiences'
import { GitHubPanel } from '@/features/portfolio/sections/github'
import { Overview } from '@/features/portfolio/sections/overview'
import { ProfileHeader } from '@/features/portfolio/sections/profile-header'
import { Projects } from '@/features/portfolio/sections/projects'
import { Recognition } from '@/features/portfolio/sections/recognition'
import { SocialLinks } from '@/features/portfolio/sections/social-links'
import { TechStack } from '@/features/portfolio/sections/tech-stack'

/**
 * The home page is one narrow column of stacked panels separated by hatched
 * gutters. To add, remove, or reorder a section, edit this list — nothing else
 * needs to change.
 */
export function Home() {
  return (
    <main className="mx-auto max-w-3xl">
      <ProfileHeader />
      <Separator />

      <SocialLinks />
      <Overview />
      <GitHubPanel />
      <Separator />

      <About />
      <Separator />

      <TechStack />
      <Separator />

      <Experiences />
      <Separator />

      <Education />
      <Separator />

      <Projects />
      <Separator />

      <Recognition />
    </main>
  )
}
