import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, useGSAP } from '@/lib/gsap'

interface ParallaxProps {
  children: ReactNode
  className?: string
  /**
   * Deslocamento máximo em px para cada lado durante a passagem pela tela.
   * Positivo: o conteúdo "fica para trás"; negativo: "vem à frente".
   */
  distance?: number
  /** Fator aplicado abaixo de 768px (celular). 0 desliga no celular. */
  mobileFactor?: number
}

/**
 * Parallax vinculado à rolagem.
 *
 * - O elemento externo é o gatilho; só o interno se move (transform).
 * - Distância recalculada no resize (invalidateOnRefresh) e reduzida no celular.
 * - Com redução de movimento: nada se move.
 */
export function Parallax({
  children,
  className,
  distance = 80,
  mobileFactor = 0.5,
}: ParallaxProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const outer = outerRef.current
      const inner = innerRef.current
      if (!outer || !inner || reducedMotion) return

      const amount = () => distance * (window.innerWidth < 768 ? mobileFactor : 1)
      if (amount() === 0) return

      gsap.fromTo(
        inner,
        { y: () => -amount() },
        {
          y: () => amount(),
          ease: 'none',
          scrollTrigger: {
            trigger: outer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
    },
    {
      scope: outerRef,
      dependencies: [reducedMotion, distance, mobileFactor],
      revertOnUpdate: true,
    },
  )

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
