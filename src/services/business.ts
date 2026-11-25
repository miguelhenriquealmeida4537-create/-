import { business } from '@/content/business'
import type { BusinessInfo } from '@/content/types'

/** Ponto único de leitura dos dados institucionais (futuro: Supabase). */
export function getBusiness(): BusinessInfo {
  return business
}
