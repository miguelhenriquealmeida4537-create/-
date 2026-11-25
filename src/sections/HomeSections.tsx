import { SectionPlaceholder } from '@/dev/SectionPlaceholder'
import { Hero } from '@/sections/hero/Hero'
import { MenuSection } from '@/sections/menu/MenuSection'

/**
 * Seções da página inicial, na ordem final.
 * Cada espaço reservado será substituído pela seção real na sub-etapa indicada.
 */
export function HomeSections() {
  return (
    <>
      <Hero />
      <MenuSection />
      <SectionPlaceholder
        id="destaques"
        title="Mais vendidos, combos e promoções"
        stage="Etapa 5.4"
        description="Destaques definidos pela Casa da Pizza, com validade nas promoções. Aguardando dados."
      />
      <SectionPlaceholder
        id="avaliacoes"
        title="Avaliações de clientes"
        stage="Etapa 5.5"
        description="Avaliações reais com fonte e data. Aguardando definição da origem das avaliações."
      />
    </>
  )
}
