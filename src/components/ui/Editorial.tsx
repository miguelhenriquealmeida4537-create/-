import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EditorialProps {
  children: ReactNode
  /** 'inline': herda o tamanho do texto ao redor. 'block': tamanho editorial próprio. */
  variant?: 'inline' | 'block'
  tone?: 'default' | 'accent' | 'secondary' | 'muted'
  as?: 'span' | 'p' | 'em' | 'blockquote'
  className?: string
}

const tones = {
  default: 'text-foreground',
  accent: 'text-accent',
  secondary: 'text-accent-secondary',
  muted: 'text-foreground-muted',
}

/**
 * Destaque editorial em Playfair Display itálico.
 * Uso pontual: uma palavra num título, uma citação, uma assinatura.
 * Não usar em parágrafos longos nem em elementos de interface.
 */
export function Editorial({
  children,
  variant = 'inline',
  tone = 'default',
  as: Tag = 'span',
  className,
}: EditorialProps) {
  return (
    <Tag
      className={cn(
        'font-editorial font-normal tracking-normal normal-case italic',
        variant === 'block' && 'text-editorial',
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
