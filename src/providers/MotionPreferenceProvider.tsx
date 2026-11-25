import { useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  MotionPreferenceContext,
  REDUCED_MOTION_QUERY,
  type MotionPreference,
  type MotionPreferenceValue,
} from '@/providers/motion-preference-context'

interface MotionPreferenceProviderProps {
  children: ReactNode
  /** Preferência inicial. Padrão: seguir o sistema. */
  initialPreference?: MotionPreference
}

/**
 * Fonte única da decisão "animar ou não".
 *
 * - Segue prefers-reduced-motion do sistema e reage a mudanças em tempo real.
 * - Permite uma escolha manual (útil para um futuro botão de acessibilidade).
 * - Espelha o estado em <html data-motion="reduce|full">, para que o CSS
 *   global também respeite a escolha manual, não só a do sistema.
 */
export function MotionPreferenceProvider({
  children,
  initialPreference = 'system',
}: MotionPreferenceProviderProps) {
  const systemReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  const [preference, setPreference] = useState<MotionPreference>(initialPreference)

  const reducedMotion = preference === 'system' ? systemReducedMotion : preference === 'reduce'

  // useLayoutEffect: atributo aplicado antes da pintura, sem "piscar".
  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.motion = reducedMotion ? 'reduce' : 'full'
    return () => {
      delete root.dataset.motion
    }
  }, [reducedMotion])

  const value = useMemo<MotionPreferenceValue>(
    () => ({ reducedMotion, systemReducedMotion, preference, setPreference }),
    [reducedMotion, systemReducedMotion, preference],
  )

  return <MotionPreferenceContext value={value}>{children}</MotionPreferenceContext>
}
