import { ArrowUp, ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { Logo } from '@/components/brand/Logo'
import { OpeningStatus } from '@/components/layout/OpeningStatus'
import { Container, Pending } from '@/components/ui'
import type { SocialNetwork } from '@/content/types'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { formatPhoneBR, telHref, whatsappHref } from '@/lib/format'
import { hoursByDay } from '@/lib/opening-hours'
import { getBusiness } from '@/services/business'

const NETWORK_LABEL: Record<SocialNetwork, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
}

const FONT_LICENSES = [
  { name: 'Oswald', file: 'oswald-OFL.txt' },
  { name: 'Inter', file: 'inter-OFL.txt' },
  { name: 'Playfair Display', file: 'playfair-display-OFL.txt' },
]

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-stack-sm">
      <h3 className="font-sans text-eyebrow font-semibold text-foreground-muted uppercase">
        {title}
      </h3>
      <div className="flex flex-col gap-2 text-body">{children}</div>
    </div>
  )
}

function ExternalA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-1.5 link-underline"
    >
      {children}
      <ExternalLink className="size-3.5 text-foreground-subtle" aria-hidden="true" />
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  )
}

/**
 * Rodapé com informações institucionais.
 * Toda informação comercial vem de content/business.ts; o que não foi
 * confirmado aparece como "A confirmar" — nunca um valor inventado.
 */
export function Footer() {
  const b = getBusiness()
  const { scrollTo } = useSmoothScroll()
  const year = new Date().getFullYear()
  const hasHours = b.openingHours.length > 0

  return (
    <footer
      id="contato"
      aria-labelledby="rodape-titulo"
      className="border-t border-border bg-surface"
    >
      <h2 id="rodape-titulo" className="sr-only">
        Informações e contato da {b.name}
      </h2>

      <Container className="grid gap-stack-xl py-section-sm lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-20">
        {/* Marca */}
        <div className="flex flex-col items-start gap-stack-md">
          <Logo size={120} />
          <OpeningStatus business={b} />
        </div>

        <div className="grid gap-stack-lg sm:grid-cols-2 xl:grid-cols-4">
          <Column title="Endereço">
            {b.address ? (
              <>
                <address className="text-foreground-muted not-italic">
                  {b.address.street}, {b.address.number}
                  {b.address.complement && ` — ${b.address.complement}`}
                  <br />
                  {b.address.district && `${b.address.district} · `}
                  {b.address.city}/{b.address.state}
                  <br />
                  CEP {b.address.postalCode}
                </address>
                {b.address.mapsUrl && <ExternalA href={b.address.mapsUrl}>Como chegar</ExternalA>}
              </>
            ) : (
              <Pending label="endereço" />
            )}
          </Column>

          <Column title="Horários">
            {hasHours ? (
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-small">
                {hoursByDay(b.openingHours).map((d) => (
                  <div key={d.day} className="contents">
                    <dt className="text-foreground-muted">{d.label}</dt>
                    <dd className="text-foreground tabular-nums">
                      {d.intervals.length ? d.intervals.join(' · ') : 'Fechado'}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <Pending label="horários de funcionamento" />
            )}
          </Column>

          <Column title="Contato">
            {b.phone ? (
              <a href={telHref(b.phone)} className="w-fit link-underline">
                {formatPhoneBR(b.phone)}
              </a>
            ) : (
              <span className="flex flex-wrap items-center gap-2 text-small text-foreground-muted">
                Telefone <Pending label="telefone" />
              </span>
            )}
            {b.whatsapp ? (
              <ExternalA href={whatsappHref(b.whatsapp)}>
                WhatsApp {formatPhoneBR(b.whatsapp)}
              </ExternalA>
            ) : (
              <span className="flex flex-wrap items-center gap-2 text-small text-foreground-muted">
                WhatsApp <Pending label="WhatsApp" />
              </span>
            )}
            {b.email && (
              <a href={`mailto:${b.email}`} className="w-fit link-underline">
                {b.email}
              </a>
            )}
          </Column>

          <Column title="Redes sociais">
            {b.social.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {b.social.map((s) => (
                  <li key={s.network}>
                    <ExternalA href={s.url}>
                      {NETWORK_LABEL[s.network]}
                      {s.handle && <span className="text-foreground-muted"> {s.handle}</span>}
                    </ExternalA>
                  </li>
                ))}
              </ul>
            ) : (
              <Pending label="redes sociais" />
            )}
            {b.deliveryApps.length > 0 && (
              <ul className="mt-2 flex flex-col gap-2">
                {b.deliveryApps.map((app) => (
                  <li key={app.url}>
                    <ExternalA href={app.url}>{app.name}</ExternalA>
                  </li>
                ))}
              </ul>
            )}
          </Column>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col-reverse gap-4 py-6 text-small text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {year} {b.name}. Fontes{' '}
            {FONT_LICENSES.map((f, i) => (
              <span key={f.file}>
                <a href={`/licenses/${f.file}`} className="link-underline">
                  {f.name}
                </a>
                {i < FONT_LICENSES.length - 1 ? ', ' : ''}
              </span>
            ))}{' '}
            sob SIL Open Font License 1.1.
          </p>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="inline-flex w-fit items-center gap-2 link-underline text-foreground-muted hover:text-foreground"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Voltar ao topo
          </button>
        </Container>
      </div>
    </footer>
  )
}
