/** Datas "de calendário" (AAAA-MM-DD) no fuso da pizzaria. Funções puras. */

export const BUSINESS_TZ = 'America/Sao_Paulo'

/** Data de hoje no fuso informado, no formato ISO "AAAA-MM-DD". */
export function todayISO(now: Date = new Date(), timeZone = BUSINESS_TZ): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone }).format(now)
}

const toUTCDay = (iso: string) => {
  const [y = 0, m = 1, d = 1] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d) / 86_400_000
}

/** Dias inteiros de `fromISO` até `toISO` (negativo se já passou). */
export function daysBetween(fromISO: string, toISO: string): number {
  return Math.round(toUTCDay(toISO) - toUTCDay(fromISO))
}

/** "2026-12-05" → "05/12/2026" (ou "05/12" com short). */
export function formatDateBR(iso: string, short = false): string {
  const [y, m, d] = iso.split('-')
  return short ? `${d}/${m}` : `${d}/${m}/${y}`
}

/** Vigente hoje? Inclusive no primeiro e no último dia. */
export function isWithin(fromISO: string, untilISO: string, today: string): boolean {
  return fromISO <= today && today <= untilISO
}

/**
 * Rótulo de validade para promoções vigentes.
 * "Termina hoje" · "Termina amanhã" · "Termina em N dias" (até 7) · "Válida até DD/MM".
 */
export function validityLabel(untilISO: string, today: string): string {
  const left = daysBetween(today, untilISO)
  if (left <= 0) return 'Termina hoje'
  if (left === 1) return 'Termina amanhã'
  if (left <= 7) return `Termina em ${left} dias`
  return `Válida até ${formatDateBR(untilISO, true)}`
}
