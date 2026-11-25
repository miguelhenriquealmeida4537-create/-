import { env } from '@/lib/env'

/**
 * Fonte única dos dados institucionais do site.
 * Usada pelas meta tags, Open Graph, JSON-LD, sitemap e manifest.
 *
 * IMPORTANTE: preencher somente com informações reais fornecidas pela Casa da Pizza.
 * Campos opcionais vazios são omitidos automaticamente do SEO.
 */
export interface SiteConfig {
  name: string
  url: string | undefined
  locale: string
  language: string
  description: string
  themeColor: string
  ogImage?: string
  business: {
    telephone?: string
    email?: string
    address?: {
      streetAddress: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
    geo?: { latitude: number; longitude: number }
    openingHours?: string[]
    servesCuisine?: string[]
    priceRange?: string
    sameAs?: string[]
  }
}

export const siteConfig: SiteConfig = {
  name: 'Casa da Pizza',
  url: env.siteUrl,
  locale: 'pt_BR',
  language: 'pt-BR',
  description: 'Site oficial da Casa da Pizza.', // TODO: descrição definitiva fornecida pelo cliente
  themeColor: '#080808',
  ogImage: undefined, // TODO: /og/og-default.jpg (1200×630) quando a arte existir
  business: {},
}
