import type { Plugin } from 'vite'

/**
 * Injeta <link rel="preload"> para as fontes críticas (acima da dobra)
 * no index.html do build. Os nomes finais têm hash, então são lidos do bundle.
 * Playfair não é pré-carregada: é usada só em detalhes editoriais.
 */
const CRITICAL_FONTS = [/inter-latin-wght-normal-.*\.woff2$/, /oswald-latin-wght-normal-.*\.woff2$/]

export function fontPreload(): Plugin {
  return {
    name: 'casa-da-pizza:font-preload',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return
        return Object.keys(ctx.bundle)
          .filter((file) => CRITICAL_FONTS.some((re) => re.test(file)))
          .map((file) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              href: `/${file}`,
              as: 'font',
              type: 'font/woff2',
              crossorigin: '',
            },
            injectTo: 'head' as const,
          }))
      },
    },
  }
}
