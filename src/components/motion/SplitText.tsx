import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_BRAND, gsap, SplitText as GSAPSplitText, useGSAP } from '@/lib/gsap'

type SplitType = 'words' | 'chars' | 'lines'

interface SplitTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  /** Unidade animada. 'words' é o padrão — leve e legível no celular. */
  type?: SplitType
  stagger?: number
  delay?: number
  duration?: number
  /** true: anima ao entrar na tela. false: anima ao montar. */
  onScroll?: boolean
}

/**
 * Título com entrada animada por palavra, letra ou linha (plugin oficial SplitText).
 *
 * - aria: 'auto' — leitores de tela leem o texto inteiro, não os pedaços.
 * - mask — cada pedaço sobe de dentro de uma "máscara", sem invadir o layout.
 * - autoSplit — refaz a divisão se a fonte carregar depois ou a largura mudar,
 *   mantendo o progresso da animação.
 * - Com redução de movimento: o texto não é dividido nem animado.
 * - Desmontagem: a divisão é revertida e o HTML original volta intacto.
 */
export function SplitText({
  children,
  as: Tag = 'h2',
  className,
  type = 'words',
  stagger,
  delay = 0,
  duration = 0.9,
  onScroll = false,
}: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reducedMotion) return

      const defaultStagger = { words: 0.06, chars: 0.02, lines: 0.12 }[type]

      const split = GSAPSplitText.create(el, {
        // Em 'chars', divide palavras também, para não quebrar uma palavra no meio da linha.
        type: type === 'chars' ? 'words,chars' : type,
        mask: type,
        aria: 'auto',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self[type], {
            yPercent: 110,
            opacity: 0,
            duration,
            delay,
            stagger: stagger ?? defaultStagger,
            ease: EASE_BRAND,
            scrollTrigger: onScroll ? { trigger: el, start: 'top 85%', once: true } : undefined,
          })
        },
      })

      return () => split.revert()
    },
    {
      scope: ref,
      dependencies: [reducedMotion, children, type, stagger, delay, duration, onScroll],
      revertOnUpdate: true,
    },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
