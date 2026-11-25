import { CircleDashed } from 'lucide-react'
import { cn } from '@/lib/cn'

interface PendingProps {
  /** O que está pendente, lido por leitores de tela. Ex.: "telefone". */
  label: string
  className?: string
}

/**
 * Marca uma informação comercial ainda não confirmada pela Casa da Pizza.
 * Visual propositalmente neutro (tracejado), para nunca parecer um dado real.
 */
export function Pending({ label, className }: PendingProps) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-2 rounded-xs border border-dashed border-border-strong px-2.5 py-1 text-small text-foreground-subtle',
        className,
      )}
    >
      <CircleDashed className="size-3.5 shrink-0" aria-hidden="true" />A confirmar
      <span className="sr-only">: {label}</span>
    </span>
  )
}
