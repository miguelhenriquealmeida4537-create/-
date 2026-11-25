import { ImageOff } from 'lucide-react'
import type { ImageAsset } from '@/content/types'

interface HeroMediaProps {
  photo?: ImageAsset
}

/**
 * Camada de fundo do Hero.
 *
 * - Com foto: imagem em tela cheia (object-cover), carregamento prioritário.
 * - Sem foto: ESPAÇO RESERVADO explícito — textura neutra, moldura tracejada e
 *   etiqueta com os requisitos. Nada que se pareça com uma fotografia real.
 *
 * A camada interna é 32% mais alta que o Hero para o parallax nunca mostrar bordas.
 */
export function HeroMedia({ photo }: HeroMediaProps) {
  return (
    <>
      <div
        data-hero-media
        aria-hidden={!photo || undefined}
        className="absolute inset-0 -z-20 overflow-hidden"
      >
        <div
          data-hero-media-inner
          className="absolute inset-x-0 -top-[16%] h-[132%] will-change-transform"
        >
          {photo ? (
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="100vw"
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full bg-surface-raised bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.035)_0_1px,transparent_1px_16px)]" />
          )}
        </div>
      </div>

      {!photo && (
        <>
          {/* Moldura tracejada: delimita a área reservada para a foto */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 -z-10 rounded-xl border border-dashed border-border-strong sm:inset-5"
          />
          <p className="absolute bottom-6 left-gutter z-10 flex max-w-[16rem] items-start gap-2.5 rounded-sm border border-dashed border-border-strong bg-surface/80 px-3 py-2 text-caption text-foreground-muted sm:top-28 sm:right-gutter sm:bottom-auto sm:left-auto sm:max-w-none">
            <ImageOff className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              <strong className="block font-semibold text-foreground">
                Espaço reservado · fotografia oficial
              </strong>
              Horizontal · mín. 2400 × 1350 px
            </span>
          </p>
        </>
      )}
    </>
  )
}
