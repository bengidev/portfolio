import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Self-hosted so the site makes no third-party font requests.
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource-variable/geist-pixel'

import { App } from '@/App'
import { CommandMenu, CommandMenuProvider } from '@/components/command-menu'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import '@/styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* `base` keeps the router in step with the GitHub Pages subpath. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CommandMenuProvider>
        <CommandMenu />
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <div className="flex-1">
            <App />
          </div>
          <SiteFooter />
        </div>
      </CommandMenuProvider>
    </BrowserRouter>
  </StrictMode>,
)
