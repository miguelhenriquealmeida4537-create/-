import { Star } from 'lucide-react'
import { cn } from '@/lib/cn'

interface RatingProps {
  /** Nota a exibir (aceita decimais: 4,5 mostra meia estrela) */
  value: number
  max?: number
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Estrelas de avaliação. Para leitores de tela, um único texto: "Nota 4 de 5".
 * Estrelas em branco (marcadas) e cinza (vazias) — sem depender só de cor.
 */
export function Rating({ value, max = 5, size = 'sm', className }: RatingProps) {
  const label = `Nota ${new Intl.NumberFormat('pt-BR').format(value)} de ${max}`
  const icon = size === 'sm' ? 'size-4' : 'size-5'
  return (
    <span
      role="img"
      aria-label={label}
      className={cn('inline-flex items-center gap-0.5', className)}
    >
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i)) // 0, 0.5 ou 1
        return (
          <span key={i} className={cn('relative inline-block', icon)} aria-hidden="true">
            <Star className={cn(icon, 'text-border-strong')} strokeWidth={1.5} />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className={cn(icon, 'fill-foreground text-foreground')} strokeWidth={1.5} />
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
