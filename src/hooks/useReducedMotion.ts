import { use } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  MotionPreferenceContext,
  REDUCED_MOTION_QUERY,
} from '@/providers/motion-preference-context'

/**
 * true quando as animações devem ser reduzidas.
 *
 * Dentro do MotionPreferenceProvider, respeita também a escolha manual.
 * Fora dele, cai para a preferência do sistema — o componente nunca quebra.
 */
export function useReducedMotion(): boolean {
  const ctx = use(MotionPreferenceContext)
  const system = useMediaQuery(REDUCED_MOTION_QUERY)
  return ctx ? ctx.reducedMotion : system
}
