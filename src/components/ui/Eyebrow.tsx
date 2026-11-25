import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EyebrowProps {
  children: ReactNode
  /** Cor do marcador à esquerda. */
  marker?: 'accent' | 'secondary' | 'none'
  as?: 'p' | 'span'
  className?: string
}

const markerClasses = {
  accent: 'bg-accent',
  secondary: 'bg-accent-secondary',
}

/** Rótulo curto acima de títulos (Inter, maiúsculas espaçadas). */
export function Eyebrow({ children, marker = 'accent', as: Tag = 'p', className }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center gap-3 text-eyebrow font-semibold text-foreground-muted uppercase',
        className,
      )}
    >
      {marker !== 'none' && (
        <span aria-hidden="true" className={cn('h-px w-8', markerClasses[marker])} />
      )}
      {children}
    </Tag>
  )
}
