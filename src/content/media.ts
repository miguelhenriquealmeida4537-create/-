import type { ImageAsset } from '@/content/types'

/**
 * Fotografia do Hero — PENDENTE (aguardando foto oficial da Casa da Pizza).
 *
 * Requisitos para a foto:
 *  - real (não gerada por IA), sem texto ou marca d'água;
 *  - horizontal, mínimo 2400 × 1350 px (16:9), idealmente 3200 px de largura;
 *  - assunto principal à DIREITA: no desktop o título ocupa a metade esquerda;
 *  - margem de respiro nas bordas (o enquadramento corta até ~15% no celular).
 *
 * Exemplo de preenchimento (quando a foto existir):
 *   import heroSrc from '@/assets/photos/hero.jpg'
 *   export const heroImage = { src: heroSrc, alt: 'Descrição real da foto', width: 3200, height: 1800 }
 */
export const heroImage: ImageAsset | undefined = undefined
