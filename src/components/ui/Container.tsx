import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ContainerSize = 'narrow' | 'default' | 'wide' | 'full'

const sizes: Record<ContainerSize, string> = {
  narrow: 'max-w-narrow', //  720px — textos longos
  default: 'max-w-site', // 1280px — padrão do site
  wide: 'max-w-wide', //    1536px — vitrines e galerias
  full: 'max-w-none', //    sem limite (mantém a margem lateral)
}

type ContainerProps<T extends ElementType> = {
  as?: T
  size?: ContainerSize
  /** Remove a margem lateral (ex.: carrosséis que vão até a borda). */
  bleed?: boolean
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

/**
 * Centraliza o conteúdo com largura máxima e margem lateral fluida
 * (--spacing-gutter: 20px no celular → 48px no desktop).
 */
export function Container<T extends ElementType = 'div'>({
  as,
  size = 'default',
  bleed = false,
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Component: ElementType = as ?? 'div'
  return (
    <Component
      className={cn('mx-auto w-full', sizes[size], !bleed && 'px-gutter', className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
