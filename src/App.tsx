import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/layout/SkipLink'
import { getDemoScreen } from '@/dev/DevScreens'
import { AppProviders } from '@/providers/AppProviders'
import { HomeSections } from '@/sections/HomeSections'
import { buildRestaurantJsonLd } from '@/seo/jsonld'
import { Seo } from '@/seo/Seo'
import { siteConfig } from '@/seo/site.config'

const demo = getDemoScreen()

export default function App() {
  return (
    <AppProviders>
      {/* noindex até o lançamento (Etapa 5.6) */}
      <Seo noindex jsonLd={buildRestaurantJsonLd(siteConfig)} />
      <SkipLink />
      {demo ? (
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {demo}
        </main>
      ) : (
        <>
          <Header />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            <HomeSections />
          </main>
          <Footer />
        </>
      )}
    </AppProviders>
  )
}
