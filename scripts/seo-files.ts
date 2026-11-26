import type { Plugin } from 'vite'

/** Rotas públicas indexáveis. Acrescente aqui quando novas páginas existirem. */
const ROUTES = ['/']

/**
 * Gera robots.txt e sitemap.xml no build.
 * A indexação só é liberada com VITE_SITE_URL definida E VITE_ALLOW_INDEXING=true
 * (lançamento). Em qualquer outro caso, robots.txt bloqueia tudo e não há sitemap —
 * previews e o protótipo nunca são indexados.
 */
export function seoFiles(siteUrl: string | undefined, allowIndexing: boolean): Plugin {
  const base = siteUrl?.trim().replace(/\/+$/, '')

  return {
    name: 'casa-da-pizza:seo-files',
    apply: 'build',
    generateBundle() {
      if (!base || !allowIndexing) {
        this.warn(
          !base
            ? 'VITE_SITE_URL não definida: robots.txt bloqueará indexação e não haverá sitemap.'
            : 'VITE_ALLOW_INDEXING diferente de "true": robots.txt bloqueará indexação.',
        )
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: 'User-agent: *\nDisallow: /\n',
        })
        return
      }

      const today = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map(
        (r) => `  <url>\n    <loc>${base}${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
      ).join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      })
    },
  }
}
