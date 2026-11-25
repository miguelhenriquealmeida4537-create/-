import { useCallback, useSyncExternalStore } from 'react'

/**
 * Acompanha uma media query CSS. Usa useSyncExternalStore, que é seguro
 * para renderização concorrente e para o Strict Mode do React.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  )
}
