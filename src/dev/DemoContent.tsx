import { FlaskConical } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * TEMPORÁRIO — sinalização de conteúdo de teste (src/dev/demo-menu.ts).
 * Some junto com os dados de teste quando o cardápio oficial for cadastrado.
 */
export function DemoContentNotice({ className }: { className?: string }) {
  return (
    <p
      role="note"
      className={cn(
        'flex items-start gap-3 rounded-md border border-dashed border-border-strong bg-surface-raised px-4 py-3 text-small text-foreground-muted',
        className,
      )}
    >
      <FlaskConical className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden="true" />
      <span>
        <strong className="font-semibold text-foreground">Conteúdo de teste.</strong> Produtos,
        fotos, opções e preços abaixo são apenas demonstrativos e não fazem parte do cardápio da
        Casa da Pizza.
      </span>
    </p>
  )
}

export function TestBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-xs border border-dashed border-border-strong px-1.5 py-0.5 text-caption font-semibold tracking-wider text-foreground-muted uppercase',
        className,
      )}
    >
      Teste
    </span>
  )
}
