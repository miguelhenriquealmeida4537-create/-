import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4'
export type HeadingTone = 'default' | 'muted' | 'accent' | 'inverse'

const sizeClasses: Record<HeadingSize, string> = {
  display: 'text-display font-bold',
  h1: 'text-h1 font-bold',
  h2: 'text-h2 font-semibold',
  h3: 'text-h3 font-semibold',
  h4: 'text-h4 font-medium',
}

const toneClasses: Record<HeadingTone, string> = {
  default: 'text-foreground',
  muted: 'text-foreground-muted',
  accent: 'text-accent',
  inverse: 'text-foreground-inverse',
}

/** Tamanho visual padrão para cada nível semântico. */
const defaultSize: Record<HeadingLevel, HeadingSize> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h4',
  6: 'h4',
}

interface HeadingProps {
  /** Nível semântico (h1–h6): define a estrutura do documento. */
  level: HeadingLevel
  /** Tamanho visual: independe do nível, para manter a hierarquia correta. */
  size?: HeadingSize
  tone?: HeadingTone
  /** Maiúsculas. Padrão: sim em display/h1/h2, não em h3/h4. */
  uppercase?: boolean
  id?: string
  className?: string
  children: ReactNode
}

/**
 * Título do design system (Oswald).
 *
 * Separa semântica de aparência: um <h2> pode ter tamanho "display" num hero
 * sem quebrar a ordem de títulos lida por leitores de tela e buscadores.
 */
export function Heading({
  level,
  size,
  tone = 'default',
  uppercase,
  id,
  className,
  children,
}: HeadingProps) {
  const Tag = `h${level}` as const
  const resolvedSize = size ?? defaultSize[level]
  const caps = uppercase ?? ['display', 'h1', 'h2'].includes(resolvedSize)

  return (
    <Tag
      id={id}
      className={cn(
        'font-display text-balance',
        sizeClasses[resolvedSize],
        toneClasses[tone],
        caps && 'uppercase',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
