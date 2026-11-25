import { useCallback, useSyncExternalStore } from 'react'

/**
 * true quando a página rolou além do limite (px). Ouve o scroll nativo
 * (o Lenis também o dispara), passivo e sem re-renderizar a cada pixel:
 * só muda quando o estado booleano muda.
 */
export function useScrolled(threshold = 16): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener('scroll', onChange, { passive: true })
    return () => window.removeEventListener('scroll', onChange)
  }, [])

  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  )
}
