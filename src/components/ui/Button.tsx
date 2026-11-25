import { Loader2, type LucideIcon } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base = cn(
  'group/button relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full',
  'font-display font-bold whitespace-nowrap uppercase select-none',
  'transition-[background-color,color,border-color,box-shadow,transform]',
  'duration-(--duration-base) ease-(--ease-brand)',
  // Pressionado: afunda 1px. Desabilitado: esmaecido e sem interação.
  'active:translate-y-px',
  // "Carregando" também bloqueia cliques, mas mantém a cor (não parece desabilitado).
  'aria-disabled:pointer-events-none aria-disabled:not-aria-busy:opacity-45',
  'disabled:pointer-events-none disabled:not-aria-busy:opacity-45',
)

const variants: Record<ButtonVariant, string> = {
  /** Ação principal. Uma por bloco de conteúdo — é onde o vermelho trabalha. */
  primary: cn(
    'bg-accent text-brand-white',
    'hover:bg-accent-hover hover:shadow-glow',
    'active:bg-accent-active active:shadow-none',
  ),
  /** Ação alternativa. Contorno branco que inverte no hover. */
  secondary: cn(
    'border-[1.5px] border-brand-white/85 text-foreground',
    'hover:border-brand-white hover:bg-brand-white hover:text-brand-black',
    'active:bg-brand-white/85',
  ),
  /** Ação discreta: links de apoio, "ver mais", ações terciárias. */
  ghost: cn('text-foreground', 'hover:bg-brand-white/8', 'active:bg-brand-white/12'),
}

/* Altura mínima de 44px em todos os tamanhos (alvo de toque confortável). */
const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-5 text-button',
  md: 'min-h-12 px-7 text-button',
  lg: 'min-h-14 px-9 text-button-lg',
}

const iconSizes: Record<ButtonSize, string> = {
  sm: 'size-4',
  md: 'size-[1.125rem]',
  lg: 'size-5',
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Ícone antes do texto. */
  iconLeft?: LucideIcon
  /** Ícone depois do texto — desliza levemente no hover. */
  iconRight?: LucideIcon
  loading?: boolean
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }
type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string
    disabled?: boolean
  }

export type ButtonProps = AsButton | AsLink

/**
 * Botão do design system.
 *
 * - Com `href` vira <a> (navegação); sem `href`, <button type="button"> (ação).
 * - Rótulos em Oswald 700, 19px; branco sobre o vermelho da marca: 5.2:1 (AA).
 * - Estados: hover, pressionado, foco por teclado (anel global), desabilitado
 *   e carregando (aria-busy + rótulo preservado para leitores de tela).
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    iconLeft: IconLeft,
    iconRight: IconRight,
    loading = false,
    fullWidth = false,
    className,
    children,
    ...rest
  } = props

  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
  const iconClass = cn(iconSizes[size], 'shrink-0')

  const content = (
    <>
      {loading ? (
        <Loader2 className={cn(iconClass, 'animate-spin')} aria-hidden="true" />
      ) : (
        IconLeft && <IconLeft className={iconClass} aria-hidden="true" />
      )}
      <span className="translate-y-[0.04em]">{children}</span>
      {IconRight && !loading && (
        <IconRight
          className={cn(
            iconClass,
            'transition-transform duration-(--duration-base) ease-(--ease-snappy) group-hover/button:translate-x-1',
          )}
          aria-hidden="true"
        />
      )}
    </>
  )

  if (rest.href !== undefined) {
    const { disabled, onClick, ...anchorProps } = rest as Omit<AsLink, keyof CommonProps>
    const inactive = disabled || loading
    return (
      <a
        {...anchorProps}
        className={classes}
        aria-disabled={inactive || undefined}
        aria-busy={loading || undefined}
        tabIndex={inactive ? -1 : anchorProps.tabIndex}
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          if (inactive) {
            e.preventDefault()
            return
          }
          onClick?.(e)
        }}
      >
        {content}
      </a>
    )
  }

  const { type = 'button', disabled, ...buttonProps } = rest as Omit<AsButton, keyof CommonProps>
  return (
    <button
      {...buttonProps}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  )
}
