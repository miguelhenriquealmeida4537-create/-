import { useSyncExternalStore } from 'react'

/**
 * Data/hora atual SOMENTE no navegador (atualizada a cada `intervalMs`).
 * Na pré-renderização e durante a hidratação retorna null — assim nada que
 * dependa de "agora" (validade de promoções, "Aberto agora") fica congelado
 * na data do build nem causa divergência de hidratação.
 */
export function useClientNow(intervalMs = 60_000): Date | null {
  const bucket = useSyncExternalStore(
    (onChange) => {
      const id = window.setInterval(onChange, intervalMs)
      return () => window.clearInterval(id)
    },
    () => Math.floor(Date.now() / intervalMs),
    () => null,
  )
  return bucket === null ? null : new Date(bucket * intervalMs)
}
