import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/layout/SkipLink'
import { AppProviders } from '@/providers/AppProviders'
import { HomeSections } from '@/sections/HomeSections'

/** Página única. As meta tags do <head> são geradas no build (src/seo/HeadTags.tsx). */
export default function App() {
  return (
    <AppProviders>
      <SkipLink />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <HomeSections />
      </main>
      <Footer />
    </AppProviders>
  )
}
