import type { ReactNode } from 'react'
import { MotionPreferenceProvider } from '@/providers/MotionPreferenceProvider'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'

/** Ordem importa: a rolagem suave depende da preferência de movimento. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionPreferenceProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionPreferenceProvider>
  )
}
