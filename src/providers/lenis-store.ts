import type Lenis from 'lenis'
import { useSyncExternalStore } from 'react'

/**
 * Store mínimo da instância ativa do Lenis.
 *
 * O Lenis é um objeto externo ao React; publicá-lo por um store
 * (em vez de setState dentro do efeito) evita renderizações em cascata
 * e é seguro no Strict Mode e em renderização concorrente.
 */
let current: Lenis | null = null
const listeners = new Set<() => void>()

export const lenisStore = {
  get: () => current,
  set(instance: Lenis | null) {
    current = instance
    listeners.forEach((notify) => notify())
  },
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

/** Instância ativa do Lenis, ou null quando a rolagem nativa está em uso. */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(lenisStore.subscribe, lenisStore.get, () => null)
}
