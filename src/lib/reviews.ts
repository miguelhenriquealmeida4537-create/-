import type { Review } from '@/content/types'

/** Funções puras de apresentação de avaliações (nenhum cálculo de média). */

/** Mais recentes primeiro; avaliações sem data vão para o fim, na ordem original. */
export function sortReviews(list: Review[]): Review[] {
  return list
    .map((r, i) => ({ r, i }))
    .sort((a, b) => {
      if (a.r.date && b.r.date) return b.r.date.localeCompare(a.r.date) || a.i - b.i
      if (a.r.date) return -1
      if (b.r.date) return 1
      return a.i - b.i
    })
    .map(({ r }) => r)
}

/** 4.8 → "4,8" (uma casa decimal, como as plataformas exibem). */
export function formatRating(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)
}

/** 312 → "312 avaliações"; 1 → "1 avaliação"; 1520 → "1.520 avaliações". */
export function formatReviewCount(count: number): string {
  return `${new Intl.NumberFormat('pt-BR').format(count)} ${count === 1 ? 'avaliação' : 'avaliações'}`
}

/** "2026-03-14" → "14 de março de 2026". */
export function formatLongDateBR(iso: string): string {
  const [y = 0, m = 1, d = 1] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, d)))
}

/** Textos acima deste tamanho ganham "Ler mais" (o texto nunca é alterado). */
export const REVIEW_CLAMP_CHARS = 280
