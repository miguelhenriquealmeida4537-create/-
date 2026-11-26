/**
 * Pré-renderização da página inicial (último passo de `npm run build`).
 *
 * 1. Importa o bundle SSR (dist-ssr/entry-server.js), gerado com a MESMA
 *    configuração do Vite (flags e constantes de build incluídas).
 * 2. Injeta o HTML da aplicação em <div id="root"> e as meta tags no <head>.
 * 3. Remove o bundle SSR (não vai para produção).
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const htmlPath = `${root}dist/index.html`
const ssrDir = `${root}dist-ssr`

const { render } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href)
const { appHtml, headHtml } = render()

let html = await readFile(htmlPath, 'utf8')
const seoBlock = /<!-- seo:start[\s\S]*?<!-- seo:end -->/
if (!seoBlock.test(html) || !html.includes('<div id="root"><!--app--></div>')) {
  throw new Error('prerender: marcadores <!-- seo:start/end --> ou <!--app--> não encontrados')
}
html = html
  .replace(seoBlock, headHtml)
  .replace(
    '<div id="root"><!--app--></div>',
    `<div id="root" data-prerendered="true">${appHtml}</div>`,
  )
await writeFile(htmlPath, html)
await rm(ssrDir, { recursive: true, force: true })

console.log(
  `prerender: index.html gerado (${(appHtml.length / 1024).toFixed(1)} KB de HTML, ${(headHtml.match(/<meta/g) ?? []).length} meta tags)`,
)
