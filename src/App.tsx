import { SkipLink } from '@/components/layout/SkipLink'
import { FoundationPreview } from '@/dev/FoundationPreview'
import { buildRestaurantJsonLd } from '@/seo/jsonld'
import { Seo } from '@/seo/Seo'
import { siteConfig } from '@/seo/site.config'

export default function App() {
  return (
    <>
      <Seo jsonLd={buildRestaurantJsonLd(siteConfig)} />
      <SkipLink />
      {/* Header entra aqui (Etapa 5) */}
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {/* Temporário: tela de verificação da fundação. Será substituída pelas seções. */}
        <FoundationPreview />
      </main>
      {/* Footer entra aqui (Etapa 5) */}
    </>
  )
}
