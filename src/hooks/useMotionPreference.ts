import { use } from 'react'
import { MotionPreferenceContext } from '@/providers/motion-preference-context'

/** Estado completo de preferência de movimento (inclui escolha manual). */
export function useMotionPreference() {
  const ctx = use(MotionPreferenceContext)
  if (!ctx) {
    throw new Error('useMotionPreference precisa estar dentro de <MotionPreferenceProvider>.')
  }
  return ctx
}
