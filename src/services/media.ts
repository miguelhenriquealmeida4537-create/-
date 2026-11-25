import { heroImage } from '@/content/media'
import type { ImageAsset } from '@/content/types'

/** Fotografia do Hero, ou undefined enquanto a foto oficial não existir. */
export function getHeroImage(): ImageAsset | undefined {
  return heroImage
}
