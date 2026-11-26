import type { SiteConfig } from '@/seo/site.config'

type JsonLd = Record<string, unknown>

/** Remove chaves vazias para não publicar dados incompletos no schema. */
function compact<T extends JsonLd>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0)),
  ) as T
}

/** Dados estruturados schema.org/Restaurant — somente com campos preenchidos. */
export function buildRestaurantJsonLd(config: SiteConfig): JsonLd {
  const { business: b } = config

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': config.url ? `${config.url}/#restaurante` : undefined,
    name: config.name,
    url: config.url,
    logo: config.logo && config.url ? `${config.url}${config.logo}` : undefined,
    hasMenu: config.url ? `${config.url}/#cardapio` : undefined,
    description: config.description,
    image: config.ogImage && config.url ? `${config.url}${config.ogImage}` : undefined,
    telephone: b.telephone,
    email: b.email,
    address: b.address ? { '@type': 'PostalAddress', ...b.address } : undefined,
    geo: b.geo ? { '@type': 'GeoCoordinates', ...b.geo } : undefined,
    openingHours: b.openingHours,
    servesCuisine: b.servesCuisine,
    priceRange: b.priceRange,
    sameAs: b.sameAs,
  })
}
