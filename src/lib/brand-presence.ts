import { useSyncExternalStore } from 'react'

/**
 * Indica se o selo da marca está em destaque na tela (ex.: no Hero).
 * O Header usa isso para não repetir a logo enquanto o selo grande está visível.
 * Sem nenhuma seção registrando, o valor é false e o Header mostra a logo.
 */
let featuredVisible = false
const listeners = new Set<() => void>()

export function setFeaturedLogoVisible(visible: boolean) {
  if (visible === featuredVisible) return
  featuredVisible = visible
  listeners.forEach((notify) => notify())
}

export function useFeaturedLogoVisible(): boolean {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => {
        listeners.delete(l)
      }
    },
    () => featuredVisible,
    () => false,
  )
}
