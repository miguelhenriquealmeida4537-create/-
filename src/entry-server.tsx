/**
 * Entrada de PRÉ-RENDERIZAÇÃO (build). Gera o HTML inicial da página e as meta
 * tags do <head>; no navegador, src/main.tsx "hidrata" esse HTML (hydrateRoot).
 * Usado apenas por scripts/prerender.mjs.
 */
import { StrictMode } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import App from '@/App'
import { HeadTags } from '@/seo/HeadTags'

export function render(): { appHtml: string; headHtml: string } {
  return {
    appHtml: renderToString(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
    headHtml: renderToStaticMarkup(<HeadTags />),
  }
}
