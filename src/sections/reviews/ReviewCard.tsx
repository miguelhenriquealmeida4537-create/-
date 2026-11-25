import { ExternalLink, Quote } from 'lucide-react'
import { useId, useState, type Ref } from 'react'
import { Rating } from '@/components/ui'
import type { Review } from '@/content/types'
import { TestBadge } from '@/dev/DemoContent'
import { cn } from '@/lib/cn'
import { formatLongDateBR, REVIEW_CLAMP_CHARS } from '@/lib/reviews'

interface ReviewCardProps {
  review: Review
  isDemo: boolean
  ref?: Ref<HTMLElement>
}

/**
 * Cartão de avaliação: nota, texto original (citação), autor, data e origem.
 * Textos longos ficam recolhidos com "Ler mais" — o texto nunca é alterado.
 */
export function ReviewCard({ review, isDemo, ref }: ReviewCardProps) {
  const id = useId()
  const long = review.text.length > REVIEW_CLAMP_CHARS
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${id}-autor`}
      className="flex break-inside-avoid flex-col gap-stack-sm rounded-lg border border-border bg-surface-raised p-6 inset-shadow-highlight outline-none focus-visible:outline-2 focus-visible:outline-focus"
    >
      <div className="flex items-center justify-between gap-3">
        <Rating value={review.rating} />
        <div className="flex items-center gap-2">
          {isDemo && <TestBadge />}
          <Quote className="size-5 text-border-strong" aria-hidden="true" />
        </div>
      </div>

      <blockquote className="flex flex-col gap-2">
        <p
          id={`${id}-texto`}
          className={cn('text-body text-foreground', long && !expanded && 'line-clamp-5')}
        >
          {review.text}
        </p>
        {long && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={`${id}-texto`}
            onClick={() => setExpanded((v) => !v)}
            className="w-fit link-underline text-small font-medium text-foreground-muted hover:text-foreground"
          >
            {expanded ? 'Mostrar menos' : 'Ler mais'}
          </button>
        )}
      </blockquote>

      <footer className="mt-auto flex flex-col gap-1 border-t border-border pt-stack-sm">
        <p id={`${id}-autor`} className="font-display text-h4 font-medium">
          {review.author}
        </p>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-caption text-foreground-subtle">
          {review.date && (
            <>
              <time dateTime={review.date}>{formatLongDateBR(review.date)}</time>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span>Fonte: {review.source.name}</span>
          {review.source.url && (
            <>
              <span aria-hidden="true">·</span>
              <a
                href={review.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 link-underline text-foreground-muted hover:text-foreground"
              >
                Ver original
                <ExternalLink className="size-3" aria-hidden="true" />
                <span className="sr-only">
                  (avaliação de {review.author} em {review.source.name}, abre em nova aba)
                </span>
              </a>
            </>
          )}
        </p>
      </footer>
    </article>
  )
}
