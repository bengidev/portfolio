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
      className="pressable relative grid size-8 place-items-center rounded-md text-muted-foreground hover:text-foreground"
    >
      <Sun
        className={`size-4 transition-[transform,opacity] duration-200 ease-out-expo motion-reduce:transition-none ${
          isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
        aria-hidden
      />
      <Moon
        className={`absolute size-4 transition-[transform,opacity] duration-200 ease-out-expo motion-reduce:transition-none ${
          isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
        }`}
        aria-hidden
      />
    </button>
  )
}
