import { reviews } from '@/content/reviews'
import type { Review } from '@/content/types'

/** Avaliações reais, mais recentes primeiro (futuro: Supabase). */
export function getReviews(): Review[] {
  return [...reviews].sort((a, b) => b.date.localeCompare(a.date))
}
