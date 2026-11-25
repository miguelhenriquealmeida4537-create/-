import { SectionPlaceholder } from '@/dev/SectionPlaceholder'
import { HighlightsSection } from '@/sections/highlights/HighlightsSection'
import { Hero } from '@/sections/hero/Hero'
import { MenuSection } from '@/sections/menu/MenuSection'
import { ProductDetailProvider } from '@/sections/menu/ProductDetailProvider'

/**
 * Seções da página inicial, na ordem final.
 * Cada espaço reservado será substituído pela seção real na sub-etapa indicada.
 */
export function HomeSections() {
  return (
    <ProductDetailProvider>
      <Hero />
      <MenuSection />
      <HighlightsSection />
      <SectionPlaceholder
        id="avaliacoes"
        title="Avaliações de clientes"
        stage="Etapa 5.5"
        description="Avaliações reais com fonte e data. Aguardando definição da origem das avaliações."
      />
    </ProductDetailProvider>
  )
}
