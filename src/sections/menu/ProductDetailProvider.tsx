import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Product } from '@/content/types'
import { ProductDetail } from '@/sections/menu/ProductDetail'
import { ProductDetailContext } from '@/sections/menu/product-detail-context'

interface OpenState {
  product: Product
  isDemo: boolean
  flipId: string
  /** false = fechando/fechado (mantém o último produto e flipId para a animação de saída) */
  open: boolean
}

/**
 * Um único detalhe de produto (<dialog>) para a página inteira.
 * Qualquer seção abre o mesmo detalhe — mesma lógica de opções e preço,
 * mesma transição Flip a partir do cartão que foi tocado.
 */
export function ProductDetailProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OpenState | null>(null)
  const originRef = useRef<HTMLElement | null>(null)

  const openProduct = useCallback(
    (product: Product, origin: HTMLElement | null, isDemo: boolean) => {
      originRef.current = origin
      // A foto do detalhe usa o mesmo data-flip-id do cartão de origem
      const flipId = origin?.dataset.flipId ?? `detalhe-${product.id}`
      setState({ product, isDemo, flipId, open: true })
    },
    [],
  )

  const closeProduct = useCallback(() => setState((s) => (s ? { ...s, open: false } : s)), [])
  const value = useMemo(() => ({ openProduct }), [openProduct])

  return (
    <ProductDetailContext value={value}>
      {children}
      <ProductDetail
        product={state?.open ? state.product : null}
        isDemo={state?.isDemo ?? false}
        flipId={state?.flipId ?? ''}
        originRef={originRef}
        onClosed={closeProduct}
      />
    </ProductDetailContext>
  )
}
