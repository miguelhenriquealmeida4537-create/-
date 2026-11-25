import { CalendarClock, Tag } from 'lucide-react'
import { Parallax } from '@/components/motion'
import { Editorial } from '@/components/ui'
import type { Promotion } from '@/content/types'
import { TestBadge } from '@/dev/DemoContent'
import { cn } from '@/lib/cn'
import { daysBetween, formatDateBR, validityLabel } from '@/lib/dates'
import { formatPrice } from '@/lib/format'
import { ProductImage } from '@/sections/menu/ProductImage'

interface PromotionCardProps {
  promotion: Promotion
  today: string
  isDemo: boolean
  /** Versão grande (primeira promoção): com foto e parallax discreto no desktop */
  featured?: boolean
}

/**
 * Promoção — identidade própria com o vermelho como destaque estratégico:
 * selo "Promoção", filete superior e brilho sutil. Nunca fundo vermelho inteiro.
 * Condições e validade sempre visíveis.
 */
export function PromotionCard({
  promotion: p,
  today,
  isDemo,
  featured = false,
}: PromotionCardProps) {
  const endsSoon = daysBetween(today, p.validUntil) <= 1

  return (
    <article
      className={cn(
        'relative isolate grid h-full overflow-hidden rounded-xl border border-accent/35 bg-surface-raised',
        'bg-[radial-gradient(120%_90%_at_0%_0%,rgb(219_1_2/0.14),transparent_60%)]',
        'before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1 before:bg-accent',
        featured && 'lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]',
      )}
    >
      <div className="flex flex-col gap-stack-sm p-5 pt-7 sm:p-8 sm:pt-9">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-caption font-bold tracking-wider text-brand-white uppercase">
            <Tag className="size-3.5" aria-hidden="true" />
            Promoção
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-medium',
              endsSoon
                ? 'border-brand-white/70 text-foreground'
                : 'border-border-strong text-foreground-muted',
            )}
          >
            <CalendarClock className="size-3.5" aria-hidden="true" />
            {validityLabel(p.validUntil, today)}
          </span>
          {isDemo && <TestBadge />}
        </div>

        <h4 className={cn('font-display font-bold uppercase', featured ? 'text-h2' : 'text-h3')}>
          {p.title}
        </h4>

        {p.highlight && (
          <Editorial as="p" variant="block" tone="accent" className={featured ? '' : 'text-h4'}>
            {p.highlight}
          </Editorial>
        )}

        {p.description && <p className="text-foreground-muted">{p.description}</p>}

        {p.price && (
          <p className="flex items-baseline gap-2">
            <span className="text-small text-foreground-muted">por</span>
            <span className="font-display text-h2 leading-none font-semibold tabular-nums">
              {formatPrice(p.price.amountCents)}
            </span>
          </p>
        )}

        <div className="mt-auto border-t border-border pt-stack-sm text-caption text-foreground-subtle">
          <p>
            <span className="font-semibold text-foreground-muted">Validade: </span>
            {formatDateBR(p.validFrom)} a {formatDateBR(p.validUntil)}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-foreground-muted">Condições: </span>
            {p.terms}
          </p>
        </div>
      </div>

      {featured && (
        <div className="relative min-h-56 overflow-hidden lg:min-h-full">
          <Parallax
            distance={36}
            mobileFactor={0}
            className="absolute inset-x-0 -inset-y-10 [&>div]:h-full"
          >
            <ProductImage
              image={p.image}
              flipId={`promo-${p.id}`}
              label="Foto da promoção"
              className="size-full [&_svg]:size-9"
            />
          </Parallax>
        </div>
      )}
    </article>
  )
}
