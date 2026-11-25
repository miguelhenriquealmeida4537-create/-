import type { Plugin } from 'vite'

/** Rotas públicas indexáveis. Acrescente aqui quando novas páginas existirem. */
const ROUTES = ['/']

/**
 * Gera robots.txt e sitemap.xml no build a partir de VITE_SITE_URL.
 * Sem URL definida, publica um robots.txt que bloqueia indexação
 * (evita que um preview sem domínio seja indexado).
 */
export function seoFiles(siteUrl: string | undefined): Plugin {
  const base = siteUrl?.trim().replace(/\/+$/, '')

  return {
    name: 'casa-da-pizza:seo-files',
    apply: 'build',
    generateBundle() {
      if (!base) {
        this.warn(
          'VITE_SITE_URL não definida: robots.txt bloqueará indexação e não haverá sitemap.',
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
