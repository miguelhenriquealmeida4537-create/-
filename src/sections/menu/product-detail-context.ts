import { createContext, use } from 'react'
import type { Product } from '@/content/types'

export interface ProductDetailApi {
  /**
   * Abre o detalhe do produto.
   * @param origin elemento com data-flip-id (foto do cartão) para a transição Flip; null = sem Flip
   * @param isDemo conteúdo de teste (exibe os avisos)
   */
  openProduct: (product: Product, origin: HTMLElement | null, isDemo: boolean) => void
}

export const ProductDetailContext = createContext<ProductDetailApi | null>(null)

/** Acesso ao detalhe do produto compartilhado (cardápio, destaques, combos). */
export function useProductDetail(): ProductDetailApi {
  const ctx = use(ProductDetailContext)
  if (!ctx) throw new Error('useProductDetail precisa estar dentro de <ProductDetailProvider>.')
  return ctx
}
