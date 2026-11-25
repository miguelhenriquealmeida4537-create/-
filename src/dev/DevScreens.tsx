import type { ReactNode } from 'react'
import { IdentityDemo } from '@/dev/IdentityDemo'
import { MotionDemo } from '@/dev/MotionDemo'

/**
 * TEMPORÁRIO — telas de verificação acessadas pela URL.
 *   /?demo=identidade   → identidade visual e design system (Etapa 4)
 *   /?demo=movimento    → fundação de movimento (Etapa 3)
 * Sem parâmetro, o App exibe a página oficial em construção.
 */
export function getDemoScreen(): ReactNode | null {
  const demo = new URLSearchParams(window.location.search).get('demo')
  if (demo === 'identidade') return <IdentityDemo />
  if (demo === 'movimento') return <MotionDemo />
  return null
}
