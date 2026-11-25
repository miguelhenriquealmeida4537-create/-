import { useCallback } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/providers/lenis-store'

type ScrollTarget = string | HTMLElement | number

interface ScrollToOptions {
  /** Ajuste extra em px. O espaço do cabeçalho já vem de scroll-padding-top. */
  offset?: number
}

/**
 * Rolagem programática que funciona com ou sem Lenis.
 * Com redução de movimento, o salto é imediato.
 * Alvos em elementos respeitam scroll-padding-top (definido em globals.css).
 */
export function useSmoothScroll() {
  const lenis = useLenis()
  const reducedMotion = useReducedMotion()

  const scrollTo = useCallback(
    (target: ScrollTarget, { offset = 0 }: ScrollToOptions = {}) => {
      if (lenis) {
        lenis.scrollTo(target, { offset })
        return
      }

      const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth'
      if (typeof target === 'number') {
        window.scrollTo({ top: target + offset, behavior })
        return
      }
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (!el) return
      if (offset === 0) {
        // scrollIntoView respeita scroll-padding-top, como o Lenis.
        el.scrollIntoView({ behavior, block: 'start' })
        return
      }
      const top = el.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior })
    },
    [lenis, reducedMotion],
  )

  return { lenis, isSmooth: lenis !== null, scrollTo }
}
