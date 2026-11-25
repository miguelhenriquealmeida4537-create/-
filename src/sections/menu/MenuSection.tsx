import { useLayoutEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/motion'
import { Container, Editorial, Eyebrow, Heading, Pending } from '@/components/ui'
import type { Product } from '@/content/types'
import { DemoContentNotice } from '@/dev/DemoContent'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { EASE_BRAND, gsap } from '@/lib/gsap'
import { CategoryNav } from '@/sections/menu/CategoryNav'
import { MENU_PANEL_ID as PANEL_ID, tabId } from '@/sections/menu/menu-ids'
import { ProductCard } from '@/sections/menu/ProductCard'
import { useProductDetail } from '@/sections/menu/product-detail-context'
import { getMenu } from '@/services/menu'

/**
 * Seção "Nosso Cardápio": abas de categoria + grade de produtos + detalhe.
 * Sem cardápio oficial (e sem conteúdo de teste habilitado), mostra a pendência.
 */
export function MenuSection() {
  const { sections, isDemo } = getMenu()
  const [activeId, setActiveId] = useState(sections[0]?.category.id ?? '')
  const gridRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const reducedMotion = useReducedMotion()
  const { scrollTo } = useSmoothScroll()

  const active = sections.find((s) => s.category.id === activeId) ?? sections[0]

  const changeCategory = (id: string) => {
    if (id === activeId) return
    setActiveId(id)
    // Se o topo da grade já passou, volta até ele (abaixo do Header + abas)
    const grid = gridRef.current
    if (grid && grid.getBoundingClientRect().top < 140) scrollTo(grid, { offset: -72 })
  }

  // Troca de categoria: cartões entram em sequência
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (reducedMotion || !gridRef.current) return
    const tween = gsap.from(gridRef.current.querySelectorAll('[data-menu-card]'), {
      opacity: 0,
      y: 16,
      duration: 0.45,
      stagger: 0.04,
      ease: EASE_BRAND,
      clearProps: 'opacity,transform',
    })
    return () => {
      tween.progress(1).kill()
    }
  }, [activeId, reducedMotion])

  const { openProduct } = useProductDetail()
  const openFromCard = (product: Product, imageEl: HTMLElement) =>
    openProduct(product, imageEl, isDemo)

  return (
    <section id="cardapio" aria-labelledby="cardapio-titulo" className="py-section">
      <Container>
        <Reveal className="mb-stack-lg flex max-w-3xl flex-col gap-stack-sm">
          <Eyebrow>Cardápio</Eyebrow>
          <Heading level={2} id="cardapio-titulo">
            Nosso <Editorial>cardápio</Editorial>
          </Heading>
        </Reveal>

        {sections.length === 0 || !active ? (
          <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-border-strong p-8">
            <Pending label="cardápio oficial" />
            <p className="max-w-prose text-foreground-muted">
              O cardápio oficial da Casa da Pizza será publicado aqui em breve.
            </p>
          </div>
        ) : (
          <>
            {isDemo && <DemoContentNotice className="mb-stack-md" />}

            <CategoryNav
              sections={sections}
              activeId={active.category.id}
              onChange={changeCategory}
              panelId={PANEL_ID}
            />

            <div
              ref={gridRef}
              id={PANEL_ID}
              role="tabpanel"
              aria-labelledby={tabId(active.category.id)}
              tabIndex={-1}
              className="grid scroll-mt-36 gap-3 pt-stack-md outline-none sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
            >
              {active.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isDemo={isDemo}
                  onOpen={openFromCard}
                />
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  )
}
