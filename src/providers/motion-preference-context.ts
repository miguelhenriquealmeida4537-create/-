import { createContext } from 'react'

export type MotionPreference = 'system' | 'reduce' | 'full'

export interface MotionPreferenceValue {
  /** true quando as animações devem ser reduzidas (sistema ou escolha manual). */
  reducedMotion: boolean
  /** Preferência do sistema operacional, sem considerar a escolha manual. */
  systemReducedMotion: boolean
  /** 'system' segue o sistema; 'reduce' e 'full' forçam um modo. */
  preference: MotionPreference
  setPreference: (preference: MotionPreference) => void
}

export const MotionPreferenceContext = createContext<MotionPreferenceValue | null>(null)

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
