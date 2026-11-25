import { ratingSummaries, reviews } from '@/content/reviews'
import type { RatingSummary, Review } from '@/content/types'
import { buildDemoReviews } from '@/dev/demo-reviews'
import { sortReviews } from '@/lib/reviews'

export interface ReviewsData {
  reviews: Review[]
  /** Somente médias OFICIAIS cadastradas (nunca calculadas, nunca de teste) */
  summaries: RatingSummary[]
  /** true = avaliações de TESTE (src/dev/demo-reviews.ts) */
  isDemo: boolean
}

/* Constante de build: sem a flag, as avaliações de teste ficam fora do bundle. */
const useDemo = __SHOW_DEMO_CONTENT__ && reviews.length === 0

/** Avaliações verificadas, mais recentes primeiro (futuro: Supabase). */
export function getReviews(): ReviewsData {
  return {
    isDemo: useDemo,
    reviews: sortReviews(useDemo ? buildDemoReviews() : reviews),
    summaries: ratingSummaries,
  }
}
