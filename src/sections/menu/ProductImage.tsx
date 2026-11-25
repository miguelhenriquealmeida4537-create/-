import { ImageOff } from 'lucide-react'
import type { Ref } from 'react'
import type { ImageAsset } from '@/content/types'
import { cn } from '@/lib/cn'

interface ProductImageProps {
  image?: ImageAsset
  /** Liga o cartão ao detalhe na transição Flip */
  flipId: string
  /** Mostra o texto "Foto do produto" no espaço reservado (não cabe em miniaturas) */
  showLabel?: boolean
  priority?: boolean
  className?: string
  ref?: Ref<HTMLDivElement>
}

/**
 * Foto do produto ou ESPAÇO RESERVADO identificado (nunca imagem gerada por IA).
 */
export function ProductImage({
  image,
  flipId,
  showLabel = true,
  priority = false,
  className,
  ref,
}: ProductImageProps) {
  return (
    <div
      ref={ref}
      data-flip-id={flipId}
      className={cn('relative overflow-hidden bg-surface-overlay', className)}
    >
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label="Espaço reservado para a foto do produto"
          className="flex size-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.04)_0_1px,transparent_1px_12px)] text-foreground-subtle"
        >
          <ImageOff className="size-6" aria-hidden="true" />
          {showLabel && <span className="text-caption">Foto do produto</span>}
        </div>
      )}
    </div>
  )
}
