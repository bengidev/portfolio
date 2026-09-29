import { useEffect, useState } from 'react'

/**
 * Current wall-clock time in an IANA timezone, as HH:MM.
 *
 * Returns an em dash until the first tick so the markup never flashes an
 * empty string during hydration. Ticks once a minute rather than every second
 * to avoid re-rendering the whole overview strip for no visible change.
 */
export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState('—')

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date())

    setTime(format())

    // Align to the next minute boundary, then tick every minute.
    let timeout: number
    const schedule = () => {
      const now = Date.now()
      const delay = 60_000 - (now % 60_000)
      timeout = window.setTimeout(() => {
        setTime(format())
        schedule()
      }, delay)
    }

    schedule()
    return () => window.clearTimeout(timeout)
  }, [timeZone])

  return time
}
