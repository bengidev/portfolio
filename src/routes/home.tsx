import { Separator } from '@/components/panel'
import { About } from '@/features/portfolio/sections/about'
import { Education } from '@/features/portfolio/sections/education'
import { Experiences } from '@/features/portfolio/sections/experiences'
import { GitHubContributions } from '@/features/portfolio/sections/github-contributions'
import { Overview } from '@/features/portfolio/sections/overview'
import { ProfileHeader } from '@/features/portfolio/sections/profile-header'
import { Projects } from '@/features/portfolio/sections/projects'
import { Recognition } from '@/features/portfolio/sections/recognition'
import { SocialLinks } from '@/features/portfolio/sections/social-links'
import { Blog, Blocks, Components } from '@/features/portfolio/sections/showcase'
import { Sponsors } from '@/features/portfolio/sections/sponsors'
import { SponsorsCarousel } from '@/features/portfolio/sections/sponsors-carousel'
import { TechStack } from '@/features/portfolio/sections/tech-stack'
import { Testimonials } from '@/features/portfolio/sections/testimonials'

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
      <GitHubContributions />
      <Separator />

      <About />
      <SponsorsCarousel />
      <Testimonials />
      <Separator />

      <Components />
      <Separator />

      <Blocks />
      <Separator />

      <Blog />
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
      <Separator />

      <Sponsors />
    </main>
  )
}
