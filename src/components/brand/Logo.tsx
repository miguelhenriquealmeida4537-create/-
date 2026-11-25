import type { Ref } from 'react'
import { cn } from '@/lib/cn'

/*
 * Logo oficial da Casa da Pizza — selo circular.
 *
 * Arquivos gerados por scripts/process-logo.py a partir de brand/logo-original.png:
 * recorte geométrico do exterior do círculo; interior idêntico ao original.
 * NÃO recolorir, distorcer, cortar ou sobrepor elementos ao selo.
 */
const avif = import.meta.glob<string>('/src/assets/brand/logo-selo-*.avif', {
  eager: true,
  import: 'default',
  query: '?url',
})
const webp = import.meta.glob<string>('/src/assets/brand/logo-selo-*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

const toSrcSet = (files: Record<string, string>) =>
  Object.entries(files)
    .map(([path, url]) => [Number(/-(\d+)\.\w+$/.exec(path)?.[1]), url] as const)
    .sort((a, b) => a[0] - b[0])
    .map(([w, url]) => `${url} ${w}w`)
    .join(', ')

const AVIF_SRCSET = toSrcSet(avif)
const WEBP_SRCSET = toSrcSet(webp)
const FALLBACK = Object.entries(webp).find(([p]) => p.endsWith('-256.webp'))?.[1]

interface LogoProps {
  /**
   * Diâmetro exibido em px CSS. O navegador escolhe o arquivo ideal para a tela.
   * Com `fluid`, é só o tamanho de referência e o diâmetro vem do className.
   */
  size: number
  /** Diâmetro controlado por classes responsivas (ex.: "size-36 lg:size-88"). */
  fluid?: boolean
  /** Atributo sizes quando `fluid` (ex.: "(min-width: 1024px) 352px, 144px"). */
  sizes?: string
  ref?: Ref<HTMLImageElement>
  /** Texto alternativo. Use "" quando um link ao redor já tiver rótulo. */
  alt?: string
  /** Carregamento prioritário (logo visível na primeira tela). */
  priority?: boolean
  className?: string
}

export function Logo({
  size,
  alt = 'Casa da Pizza — Da nossa casa, pra sua casa',
  priority = false,
  fluid = false,
  sizes: sizesProp,
  ref,
  className,
}: LogoProps) {
  const sizes = sizesProp ?? `${size}px`
  return (
    <picture>
      <source type="image/avif" srcSet={AVIF_SRCSET} sizes={sizes} />
      <source type="image/webp" srcSet={WEBP_SRCSET} sizes={sizes} />
      <img
        ref={ref}
        src={FALLBACK}
        alt={alt}
        width={size}
        height={size}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        className={cn('block aspect-square select-none', className)}
        style={fluid ? undefined : { width: size, height: size }}
      />
    </picture>
  )
}
