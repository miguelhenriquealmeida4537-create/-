import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { lenisStore } from '@/providers/lenis-store'

interface SmoothScrollProviderProps {
  children: ReactNode
}

/**
 * Rolagem suave com Lenis, sincronizada ao GSAP.
 *
 * Decisões:
 * - Um único relógio: o Lenis avança dentro do gsap.ticker (autoRaf: false),
 *   então rolagem e ScrollTrigger nunca ficam fora de sincronia.
 * - Toque nativo: syncTouch fica desligado. No celular a rolagem é 100% nativa
 *   (mais leve e com a inércia que o usuário espera); o Lenis suaviza só a
 *   roda do mouse/trackpad.
 * - Redução de movimento: o Lenis nem é criado. A página usa rolagem nativa.
 * - A instância é publicada em lenisStore (hook useLenis).
 * - Strict Mode: o efeito monta/desmonta/monta; a limpeza destrói a instância
 *   e remove o listener do ticker, então nunca existem duas instâncias.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      anchors: true, // links "#id" rolam suavemente
      stopInertiaOnNavigate: true,
    })

    const onScroll = () => ScrollTrigger.update()
    instance.on('scroll', onScroll)

    // gsap.ticker entrega o tempo em segundos; o Lenis espera milissegundos.
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    // Sem "lag smoothing": evita saltos na rolagem após a aba ficar inativa.
    gsap.ticker.lagSmoothing(0)

    lenisStore.set(instance)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33) // valores padrão do GSAP
      instance.off('scroll', onScroll)
      instance.destroy()
      lenisStore.set(null)
    }
  }, [reducedMotion])

  return children
}
