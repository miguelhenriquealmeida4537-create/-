import { SkipLink } from '@/components/layout/SkipLink'
import { DevScreens } from '@/dev/DevScreens'
import { AppProviders } from '@/providers/AppProviders'
import { buildRestaurantJsonLd } from '@/seo/jsonld'
import { Seo } from '@/seo/Seo'
import { siteConfig } from '@/seo/site.config'

export default function App() {
  return (
    <AppProviders>
      {/* noindex enquanto só existirem telas de demonstração */}
      <Seo noindex jsonLd={buildRestaurantJsonLd(siteConfig)} />
      <SkipLink />
      {/* Header entra aqui (Etapa 5) */}
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {/* Temporário: telas de verificação. Serão substituídas pelas seções. */}
        <DevScreens />
      </main>
      {/* Footer entra aqui (Etapa 5) */}
    </AppProviders>
  )
}
