import type { BusinessInfo } from '@/content/types'
import { useClientNow } from '@/hooks/useClientNow'
import { cn } from '@/lib/cn'
import { isOpenAt } from '@/lib/opening-hours'

/**
 * "Aberto agora" / "Fechado agora", calculado no fuso da pizzaria e
 * atualizado a cada minuto, apenas no navegador. Sem horários, não exibe nada.
 */
export function OpeningStatus({ business }: { business: BusinessInfo }) {
  const now = useClientNow()
  if (!now) return null // calculado só no navegador (nunca na data do build)

  const open = isOpenAt(business.openingHours, now, business.timeZone)
  if (open === null) return null

  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-small font-medium',
        open
          ? 'border-accent-secondary/50 text-foreground'
          : 'border-border-strong text-foreground-muted',
      )}
    >
      <span
        aria-hidden="true"
        className={cn('size-2 rounded-full', open ? 'bg-accent-secondary' : 'bg-foreground-subtle')}
      />
      {open ? 'Aberto agora' : 'Fechado agora'}
    </p>
  )
}
