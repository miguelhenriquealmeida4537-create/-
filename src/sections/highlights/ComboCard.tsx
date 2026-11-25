import { ArrowUpRight, Users } from 'lucide-react'
import { TestBadge } from '@/dev/DemoContent'
import { formatPrice } from '@/lib/format'
import { useProductDetail } from '@/sections/menu/product-detail-context'
import { ProductImage } from '@/sections/menu/ProductImage'
import type { HighlightsData } from '@/services/menu'

type ComboWithItems = HighlightsData['combos'][number]

interface ComboCardProps {
  combo: ComboWithItems
  isDemo: boolean
}

/**
 * Combo: foto ao lado da composição (quantidade × item).
 * Itens vinculados a produtos do cardápio abrem o detalhe daquele produto.
 */
export function ComboCard({ combo, isDemo }: ComboCardProps) {
  const { openProduct } = useProductDetail()

  return (
    <article className="grid h-full overflow-hidden rounded-xl border border-border bg-surface-raised inset-shadow-highlight sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <ProductImage
        image={combo.image}
        flipId={`combo-${combo.id}`}
        label="Foto do combo"
        className="aspect-[16/9] sm:aspect-auto sm:h-full sm:min-h-64 [&_svg]:size-8"
      />

      <div className="flex flex-col gap-stack-sm p-5 sm:p-6">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-eyebrow font-semibold text-foreground-muted uppercase">
              Combo
            </span>
            {isDemo && <TestBadge />}
          </div>
          <h4 className="font-display text-h3 font-semibold">{combo.name}</h4>
          {combo.description && (
            <p className="text-small text-foreground-muted">{combo.description}</p>
          )}
        </header>

        <div>
          <p className="mb-2 text-caption font-semibold tracking-wider text-foreground-subtle uppercase">
            Inclui
          </p>
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {combo.resolvedItems.map((item, i) => (
              <li key={`${item.label}-${i}`} className="flex items-center gap-3 py-2.5">
                <span className="grid min-w-9 place-items-center rounded-xs border border-border-strong px-1.5 py-0.5 font-display text-small font-semibold tabular-nums">
                  {item.quantity}×
                </span>
                {item.product ? (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => item.product && openProduct(item.product, null, isDemo)}
                    className="group/item inline-flex flex-1 items-center justify-between gap-2 text-left text-small transition-colors hover:text-foreground"
                  >
                    <span className="link-underline">{item.label}</span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-foreground-subtle transition-colors group-hover/item:text-foreground"
                      aria-hidden="true"
                    />
                    <span className="sr-only">— ver detalhes do produto</span>
                  </button>
                ) : (
                  <span className="flex-1 text-small">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          {combo.serves ? (
            <p className="inline-flex items-center gap-2 text-small text-foreground-muted">
              <Users className="size-4 text-accent-secondary" aria-hidden="true" />
              {combo.serves}
            </p>
          ) : (
            <span />
          )}
          <p className="font-display text-h2 leading-none font-semibold tabular-nums">
            {formatPrice(combo.price.amountCents)}
          </p>
        </footer>
      </div>
    </article>
  )
}
