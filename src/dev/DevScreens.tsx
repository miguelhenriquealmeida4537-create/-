import { FoundationPreview } from '@/dev/FoundationPreview'
import { MotionDemo } from '@/dev/MotionDemo'

/**
 * TEMPORÁRIO — seleciona a tela de verificação pela URL.
 *   /                 → demonstração de movimento (Etapa 3)
 *   /?demo=fundacao   → tokens e tipografia (Etapa 2)
 */
export function DevScreens() {
  const demo = new URLSearchParams(window.location.search).get('demo')
  return demo === 'fundacao' ? <FoundationPreview /> : <MotionDemo />
}
