import { buildRestaurantJsonLd } from '@/seo/jsonld'
import { Seo } from '@/seo/Seo'
import { siteConfig } from '@/seo/site.config'

/**
 * Meta tags da página inicial. Renderizadas NO BUILD (scripts/prerender.mjs)
 * direto no <head> do HTML — buscadores e redes sociais leem sem executar JS.
 */
export function HeadTags() {
  return <Seo noindex={!siteConfig.allowIndexing} jsonLd={buildRestaurantJsonLd(siteConfig)} />
}
