import { ArrowRight, Flame } from 'lucide-react'
import { useRef } from 'react'
import type { Product } from '@/content/types'
import { TestBadge } from '@/dev/DemoContent'
import { formatPrice } from '@/lib/format'
import { startingPrice } from '@/lib/pricing'
import { useProductDetail } from '@/sections/menu/product-detail-context'
import { ProductImage } from '@/sections/menu/ProductImage'

interface BestSellerCardProps {
  product: Product
  isDemo: boolean
}

/**
 * Cartão de destaque de um produto marcado como "mais vendido".
 * Usa o mesmo detalhe, opções e preço do cardápio (sem lógica duplicada).
 */
export function BestSellerCard({ product, isDemo }: BestSellerCardProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const { openProduct } = useProductDetail()
  const multipleSizes = product.prices.length > 1

  return (
    <article className="group relative flex h-full interactive-lift flex-col rounded-xl border border-border bg-surface-raised inset-shadow-highlight">
      <div className="relative">
        <ProductImage
          ref={imageRef}
          image={product.image}
          flipId={`destaque-${product.id}`}
          className="aspect-[4/5] w-full rounded-t-xl sm:aspect-[4/3] [&_svg]:size-9 [&>*]:transition-transform [&>*]:duration-(--duration-slow) [&>*]:ease-(--ease-brand) group-hover:[&>*]:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-brand-black/80 px-3 py-1.5 text-caption font-semibold tracking-wider text-foreground uppercase backdrop-blur">
          <Flame className="size-3.5 text-accent" aria-hidden="true" />
          Mais vendido
        </span>
        {isDemo && <TestBadge className="absolute top-3 right-3 bg-surface/85" />}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-surface-raised to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5 pt-3">
        <h4 className="font-display text-h3 font-semibold">{product.name}</h4>
        {product.description && (
          <p className="line-clamp-2 text-small text-foreground-muted">{product.description}</p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <p className="flex flex-col">
            {multipleSizes && (
              <span className="text-caption text-foreground-subtle">a partir de</span>
            )}
            <span className="font-display text-h3 font-semibold tabular-nums">
              {formatPrice(startingPrice(product))}
            </span>
          </p>
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-small font-medium text-foreground-muted transition-colors group-hover:text-foreground"
          >
            Ver opções
            <ArrowRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-snappy) group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`${product.name} — mais vendido, ver detalhes e opções`}
        onClick={() => openProduct(product, imageRef.current, isDemo)}
        className="absolute inset-0 rounded-xl"
      />
    </article>
  )
}
