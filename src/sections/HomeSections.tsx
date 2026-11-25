import { HighlightsSection } from '@/sections/highlights/HighlightsSection'
import { Hero } from '@/sections/hero/Hero'
import { MenuSection } from '@/sections/menu/MenuSection'
import { ProductDetailProvider } from '@/sections/menu/ProductDetailProvider'
import { ReviewsSection } from '@/sections/reviews/ReviewsSection'

/**
 * Seções da página inicial, na ordem final.
 */
export function HomeSections() {
  return (
    <ProductDetailProvider>
      <Hero />
      <MenuSection />
      <HighlightsSection />
      <ReviewsSection />
    </ProductDetailProvider>
  )
}
