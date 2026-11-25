import { IdentityDemo } from '@/dev/IdentityDemo'
import { MotionDemo } from '@/dev/MotionDemo'

/**
 * TEMPORÁRIO — seleciona a tela de verificação pela URL.
 *   /                   → identidade visual e design system (Etapa 4)
 *   /?demo=movimento    → fundação de movimento (Etapa 3)
 */
export function DevScreens() {
  const demo = new URLSearchParams(window.location.search).get('demo')
  return demo === 'movimento' ? <MotionDemo /> : <IdentityDemo />
}
