import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion'
import { Container, Editorial, Eyebrow, Heading, Pending } from '@/components/ui'
import { DemoContentNotice } from '@/dev/DemoContent'
import { BestSellerCard } from '@/sections/highlights/BestSellerCard'
import { ComboCard } from '@/sections/highlights/ComboCard'
import { PromotionCard } from '@/sections/highlights/PromotionCard'
import { getHighlights } from '@/services/menu'

function Block({
  id,
  title,
  count,
  hint,
  children,
}: {
  id: string
  title: string
  count: number
  hint?: string
  children: ReactNode
}) {
  return (
    <div role="group" aria-labelledby={id} className="flex flex-col gap-stack-md">
      <Reveal className="flex items-end justify-between gap-4 border-b border-border pb-3">
        <h3 id={id} className="flex items-baseline gap-3 font-display text-h3 font-semibold">
          {title}
          <span className="text-small font-normal text-foreground-subtle tabular-nums">
            {count}
          </span>
        </h3>
        {hint && <p className="text-caption text-foreground-subtle sm:hidden">{hint}</p>}
      </Reveal>
      {children}
    </div>
  )
}

/**
 * Destaques da casa: mais vendidos, combos e promoções vigentes.
 * Cada bloco só aparece se houver dados; sem nenhum, a seção mostra a pendência.
 */
export function HighlightsSection() {
  const { bestSellers, combos, promotions, today, isDemo } = getHighlights()
  const empty = bestSellers.length + combos.length + promotions.length === 0
  const [featuredPromo, ...otherPromos] = promotions

  return (
    <section id="destaques" aria-labelledby="destaques-titulo" className="py-section">
      <Container className="flex flex-col gap-stack-xl">
        <Reveal className="flex max-w-3xl flex-col gap-stack-sm">
          <Eyebrow>Destaques</Eyebrow>
          <Heading level={2} id="destaques-titulo">
            Destaques <Editorial>da casa</Editorial>
          </Heading>
          {isDemo && <DemoContentNotice className="mt-stack-sm" />}
        </Reveal>

        {empty && (
          <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-border-strong p-8">
            <Pending label="mais vendidos, combos e promoções" />
            <p className="max-w-prose text-foreground-muted">
              Mais vendidos, combos e promoções da Casa da Pizza serão publicados aqui em breve.
            </p>
          </div>
        )}

        {bestSellers.length > 0 && (
          <Block
            id="mais-vendidos"
            title="Mais vendidos"
            count={bestSellers.length}
            hint="Deslize →"
          >
            {/* Celular: carrossel com encaixe. Desktop: grade. */}
            <Reveal
              as="ul"
              stagger={0.08}
              className="-mx-gutter flex snap-x snap-mandatory scroll-px-gutter [scrollbar-width:none] gap-4 overflow-x-auto px-gutter pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:mx-0 lg:grid-cols-3 lg:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {bestSellers.map((product) => (
                <li key={product.id} className="w-[80%] shrink-0 snap-start sm:w-auto">
                  <BestSellerCard product={product} isDemo={isDemo} />
                </li>
              ))}
            </Reveal>
          </Block>
        )}

        {combos.length > 0 && (
          <Block id="combos" title="Combos" count={combos.length}>
            <Reveal as="ul" stagger={0.1} className="grid gap-5 xl:grid-cols-2">
              {combos.map((combo) => (
                <li key={combo.id}>
                  <ComboCard combo={combo} isDemo={isDemo} />
                </li>
              ))}
            </Reveal>
          </Block>
        )}

        {featuredPromo && (
          <Block id="promocoes" title="Promoções" count={promotions.length}>
            <Reveal>
              <PromotionCard promotion={featuredPromo} today={today} isDemo={isDemo} featured />
            </Reveal>
            {otherPromos.length > 0 && (
              <Reveal as="ul" stagger={0.1} className="grid gap-5 md:grid-cols-2">
                {otherPromos.map((promo) => (
                  <li key={promo.id}>
                    <PromotionCard promotion={promo} today={today} isDemo={isDemo} />
                  </li>
                ))}
              </Reveal>
            )}
          </Block>
        )}
      </Container>
    </section>
  )
}
