import { business } from '@/content/business'
import type { BusinessInfo, Weekday } from '@/content/types'
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

const SCHEMA_DAY: Record<Weekday, string> = {
  mon: 'Mo',
  tue: 'Tu',
  wed: 'We',
  thu: 'Th',
  fri: 'Fr',
  sat: 'Sa',
  sun: 'Su',
}

/** Converte o modelo de conteúdo para o formato do schema.org (só campos preenchidos). */
function toSchemaBusiness(b: BusinessInfo): SiteConfig['business'] {
  return {
    telephone: b.phone ? `+${b.phone}` : undefined,
    email: b.email,
    address: b.address && {
      streetAddress: [b.address.street, b.address.number, b.address.complement]
        .filter(Boolean)
        .join(', '),
      addressLocality: b.address.city,
      addressRegion: b.address.state,
      postalCode: b.address.postalCode,
      addressCountry: 'BR',
    },
    geo: b.address?.geo,
    openingHours: b.openingHours.map(
      (r) => `${r.days.map((d) => SCHEMA_DAY[d]).join(',')} ${r.opens}-${r.closes}`,
    ),
    servesCuisine: ['Pizza'],
    sameAs: b.social.map((s) => s.url),
  }
}

export const siteConfig: SiteConfig = {
  name: business.name,
  url: env.siteUrl,
  locale: 'pt_BR',
  language: 'pt-BR',
  description: `${business.name} — ${business.slogan}.`, // TODO: descrição definitiva do cliente
  themeColor: '#080808',
  ogImage: undefined, // TODO: /og/og-default.jpg (1200×630) quando houver foto oficial
  business: toSchemaBusiness(business),
}
