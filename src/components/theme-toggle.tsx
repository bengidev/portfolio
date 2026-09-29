import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/lib/theme'

/** Light/dark switch. State is shared via the `useTheme` hook. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="text-muted-foreground hover:text-foreground relative grid size-8 place-items-center rounded-md transition-colors"
    >
      <Sun
        className={`size-4 transition-all duration-300 ${
          isDark ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'
        }`}
        aria-hidden
      />
      <Moon
        className={`absolute size-4 transition-all duration-300 ${
          isDark ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
        }`}
        aria-hidden
      />
    </button>
  )
}
