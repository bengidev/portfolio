# Portfolio

A single-column personal portfolio: React 19 + Vite + Tailwind CSS v4, built as a
static bundle and published to GitHub Pages.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173/portfolio/
```

| Script                  | What it does                                          |
| ----------------------- | ----------------------------------------------------- |
| `npm run dev`           | Dev server                                            |
| `npm run build`         | Type-check, bundle to `dist/`, write the SPA fallback  |
| `npm run preview`       | Serve the production build locally                     |
| `npm run check-types`   | `tsc` only                                             |
| `npm run lint`          | oxlint                                                |
| `npm run screenshot`    | Capture light/dark screenshots and fail on console errors |

## Editing content

**Everything you are likely to change lives in `src/data/`.** No component needs
to be touched to update copy, links, jobs, or projects.

| File                     | Drives                                    |
| ------------------------ | ----------------------------------------- |
| `src/data/site.ts`       | Name, avatar, tagline, social links, hero |
| `src/data/about.ts`      | About bullets and the overview strip      |
| `src/data/stack.ts`      | The stack panel                           |
| `src/data/experience.ts` | The experience panel                      |
| `src/data/education.ts`  | The education panel                       |
| `src/data/projects.ts`   | The projects panel                        |
| `src/data/recognition.ts`| Awards and certifications                 |
| `src/data/testimonials.ts` | The quote carousel                      |
| `src/data/sponsors.ts`   | Sponsor tiers and the marquee             |
| `src/data/showcase.ts`   | Components, blocks, and blog cards        |

### Avatars

Drop `avatar-light.*` and `avatar-dark.*` into `public/`. The hero picks
whichever matches the active colour scheme, and falls back to a monogram tile if
neither file is present.

### The hero mark

`ProfileMark` in `src/features/portfolio/sections/profile-header.tsx` is a
self-contained SVG. Swap it for your own mark, or replace it with an `<img>`.

### Adding, removing, or reordering sections

The home page is a plain list of components in `src/routes/home.tsx` — edit that
array of elements to change the section order. `Separator` is the hatched gutter
between panels.

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes on every
push to `master` (or `main`).

**One-time setup** — in the repo: *Settings → Pages → Build and deployment →
Source: **GitHub Actions***.

### Base path

GitHub serves project repos from `https://<user>.github.io/<repo>/`, so assets
must be rooted at `/<repo>/`. The default lives in `vite.config.ts`:

```ts
const DEFAULT_BASE = '/portfolio/' // matches this repo's name
```

Override it per-run without editing the file:

```bash
VITE_BASE_PATH=/ npm run build      # user/org site: bengidev.github.io
```

If you rename the repo, update `DEFAULT_BASE` to match.

### Deep links

GitHub Pages has no rewrite rules, so a direct hit on `/portfolio/blog` would
normally 404. `scripts/postbuild.mjs` copies the built `index.html` to
`404.html`, which Pages serves for unmatched paths; the router then renders the
right route. This works because Vite emits absolute asset URLs under `base`.

Verified against `/`, `/blog`, `/components/:slug`, and unknown paths.

### Custom domain

Add a `CNAME` file containing your domain to `public/`, then point the apex DNS
at GitHub's Pages servers. For a custom domain the site is served from the root,
so also set `VITE_BASE_PATH=/` in the workflow's build step.

## Stack

- React 19, Vite 8, TypeScript
- Tailwind CSS v4 (`@theme inline` tokens in `src/styles/globals.css`)
- React Router 7 (`BrowserRouter` with `basename={import.meta.env.BASE_URL}`)
- Motion for the testimonial carousel and social-link drift
- Self-hosted Geist / Geist Mono via Fontsource — no third-party font requests

## Design system

`src/styles/globals.css` defines a monochrome OKLCH token set for light and dark.
The page is one `max-w-3xl` column, and the rules that frame it are drawn by
`screen-line-top` / `screen-line-bottom` utilities — each is a pseudo-element
200vw wide pulled back 100vw, so a narrow column still produces full-bleed
hairlines.
