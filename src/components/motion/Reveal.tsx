import { useRef, type ElementType, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_BRAND, gsap, useGSAP } from '@/lib/gsap'

interface RevealProps {
  children: ReactNode
  /** Elemento HTML renderizado. Padrão: div. */
  as?: ElementType
  className?: string
  /** Deslocamento vertical inicial, em px. */
  y?: number
  delay?: number
  duration?: number
  /** Se definido, anima cada filho direto em sequência (intervalo em segundos). */
  stagger?: number
  /** Ponto de disparo do ScrollTrigger. */
  start?: string
}

/**
 * Faz o conteúdo surgir (fade + leve subida) quando entra na tela.
 *
 * - Anima apenas opacity e transform (aceleradas pela GPU).
 * - Usa opacity, não visibility: elementos ainda não revelados continuam
 *   focáveis pelo teclado; ao receber foco, o navegador rola até eles e
 *   o ScrollTrigger os revela.
 * - Dispara uma única vez (once) e o ScrollTrigger se descarta em seguida.
 * - Com redução de movimento: nenhuma animação, conteúdo visível de imediato.
 */
export function Reveal({
  children,
  as: Component = 'div',
  className,
  y = 24,
  delay = 0,
  duration = 0.8,
  stagger,
  start = 'top 85%',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reducedMotion) return

      const targets = stagger !== undefined ? Array.from(el.children) : el

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger,
        ease: EASE_BRAND,
        clearProps: 'transform,opacity', // devolve o elemento ao CSS original no fim
        scrollTrigger: { trigger: el, start, once: true },
      })
    },
    {
      scope: ref,
      dependencies: [reducedMotion, y, delay, duration, stagger, start],
      revertOnUpdate: true,
    },
  )

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}
