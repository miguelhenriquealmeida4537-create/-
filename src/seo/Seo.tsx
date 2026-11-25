import { siteConfig } from '@/seo/site.config'

interface SeoProps {
  /** Título da página. Sem título, usa apenas o nome do site. */
  title?: string
  description?: string
  /** Caminho da página, ex.: "/" ou "/cardapio" */
  path?: string
  image?: string
  noindex?: boolean
  /** Objeto(s) JSON-LD adicionais */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Meta tags por página. O React 19 move <title>, <meta> e <link>
 * automaticamente para o <head>, sem biblioteca extra.
 */
export function Seo({
  title,
  description = siteConfig.description,
  path = '/',
  image = siteConfig.ogImage,
  noindex = false,
  jsonLd,
}: SeoProps) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const canonical = siteConfig.url ? `${siteConfig.url}${path}` : undefined
  const imageUrl = image && siteConfig.url ? `${siteConfig.url}${image}` : undefined

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {jsonLd && (
        <script
          type="application/ld+json"
          // JSON gerado internamente a partir de site.config.ts
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}
