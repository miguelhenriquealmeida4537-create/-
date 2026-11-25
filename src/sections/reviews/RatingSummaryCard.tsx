import { ExternalLink, ShieldCheck } from 'lucide-react'
import { Pending, Rating } from '@/components/ui'
import type { RatingSummary } from '@/content/types'
import { formatDateBR } from '@/lib/dates'
import { formatRating, formatReviewCount } from '@/lib/reviews'

/** Nota média OFICIAL de uma plataforma, com link e data da consulta. */
export function RatingSummaryCard({ summary: s }: { summary: RatingSummary }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface-raised p-6 inset-shadow-highlight">
      <p className="text-eyebrow font-semibold text-foreground-muted uppercase">{s.platform}</p>
      <p className="flex items-end gap-3">
        <span className="font-display text-display leading-none font-bold tabular-nums">
          {formatRating(s.average)}
        </span>
        <span className="flex flex-col gap-1 pb-2">
          <Rating value={s.average} max={s.scale} size="md" />
          <span className="text-small text-foreground-muted">
            de {s.scale} · {formatReviewCount(s.count)}
          </span>
        </span>
      </p>
      <p className="text-caption text-foreground-subtle">
        Dados da plataforma, consultados em {formatDateBR(s.checkedAt)}.{' '}
        <a
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 link-underline text-foreground-muted hover:text-foreground"
        >
          Conferir na fonte
          <ExternalLink className="size-3" aria-hidden="true" />
          <span className="sr-only">({s.platform}, abre em nova aba)</span>
        </a>
      </p>
    </div>
  )
}

/** Lugar da nota média enquanto não houver fonte oficial verificável. */
export function RatingSummaryPending() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-border-strong p-6">
      <p className="inline-flex items-center gap-2 text-small font-medium text-foreground-muted">
        <ShieldCheck className="size-4 text-accent-secondary" aria-hidden="true" />
        Nota média
      </p>
      <Pending label="nota média" />
      <p className="text-small text-foreground-subtle">
        Exibida apenas com fonte oficial verificável, com link e data da consulta.
      </p>
    </div>
  )
}
