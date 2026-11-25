import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import type { Product } from '@/content/types'
import { TestBadge } from '@/dev/DemoContent'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import { startingPrice } from '@/lib/pricing'
import { ProductImage } from '@/sections/menu/ProductImage'
import { TagChip } from '@/sections/menu/TagChip'

interface ProductCardProps {
  product: Product
  isDemo: boolean
  onOpen: (product: Product, imageEl: HTMLElement) => void
}

/**
 * Cartão do produto.
 * - Celular: linha compacta (miniatura + texto), ideal para percorrer o cardápio.
 * - Tablet/desktop: cartão vertical com foto 4:3.
 * O cartão inteiro é clicável por um botão sobreposto (um único alvo de foco).
 */
export function ProductCard({ product, isDemo, onOpen }: ProductCardProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const multipleSizes = product.prices.length > 1
  const unavailable = !product.available

  return (
    <article
      data-menu-card
      className={cn(
        'group relative flex gap-4 rounded-lg border border-border bg-surface-raised p-3 inset-shadow-highlight sm:flex-col sm:gap-0 sm:p-0',
        unavailable ? 'opacity-60' : 'interactive-lift',
      )}
    >
      <ProductImage
        ref={imageRef}
        image={product.image}
        flipId={`produto-${product.id}`}
        showLabel={false}
        className="aspect-square w-24 shrink-0 rounded-md sm:aspect-[4/3] sm:w-full sm:rounded-none sm:rounded-t-lg [&_svg]:sm:size-8"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-h4 font-medium">{product.name}</h3>
          {isDemo && <TestBadge />}
        </div>

        {product.description && (
          <p className="line-clamp-2 text-small text-foreground-muted">{product.description}</p>
        )}

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          {unavailable ? (
            <p className="text-small font-medium text-foreground-muted">Indisponível no momento</p>
          ) : (
            <p className="flex flex-col">
              {multipleSizes && (
                <span className="text-caption text-foreground-subtle">a partir de</span>
              )}
              <span className="font-display text-h4 font-semibold tabular-nums">
                {formatPrice(startingPrice(product))}
              </span>
            </p>
          )}
          {!unavailable && (
            <span
              aria-hidden="true"
              className="hidden items-center gap-1.5 text-small font-medium text-foreground-muted transition-colors group-hover:text-foreground sm:inline-flex"
            >
              Ver opções
              <ArrowRight className="size-4 transition-transform duration-(--duration-base) ease-(--ease-snappy) group-hover:translate-x-1" />
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        disabled={unavailable}
        aria-haspopup="dialog"
        aria-label={
          unavailable
            ? `${product.name} — indisponível no momento`
            : `${product.name} — ver detalhes e opções`
        }
        onClick={() => imageRef.current && onOpen(product, imageRef.current)}
        className="absolute inset-0 rounded-lg disabled:cursor-not-allowed"
      />
    </article>
  )
}
