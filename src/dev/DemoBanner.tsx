import { FlaskConical } from 'lucide-react'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import type { MotionPreference } from '@/providers/motion-preference-context'
import { ScrollProgress } from '@/dev/ScrollProgress'

const options: { value: MotionPreference; label: string }[] = [
  { value: 'system', label: 'Sistema' },
  { value: 'reduce', label: 'Reduzido' },
  { value: 'full', label: 'Completo' },
]

const screens = [
  { href: '/', label: 'Página oficial (em construção)', demo: null },
  { href: '/?demo=identidade', label: 'Identidade (Etapa 4)', demo: 'identidade' },
  { href: '/?demo=movimento', label: 'Movimento (Etapa 3)', demo: 'movimento' },
]

interface DemoBannerProps {
  /** Ex.: "Etapa 4 · Identidade visual" */
  stage: string
}

/** Faixa que identifica a tela como demonstração técnica (fixa a partir do tablet). */
export function DemoBanner({ stage }: DemoBannerProps) {
  const { reducedMotion, systemReducedMotion, preference, setPreference } = useMotionPreference()
  const { isSmooth } = useSmoothScroll()

  return (
    <aside
      aria-label="Aviso de demonstração técnica"
      className="relative z-50 border-b border-brand-red/40 bg-brand-black/90 backdrop-blur-md md:sticky md:top-0"
    >
      <div className="mx-auto flex w-full max-w-site flex-col gap-3 px-gutter py-3 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 text-small">
          <FlaskConical className="size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            <strong className="font-semibold tracking-wide text-foreground uppercase">
              Demonstração técnica
            </strong>{' '}
            <span className="text-foreground-muted">
              · {stage} · não é a página oficial da Casa da Pizza
            </span>
          </span>
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-small">
          <p className="text-foreground-muted" aria-live="polite">
            Rolagem:{' '}
            <strong className="font-semibold text-foreground">
              {isSmooth ? 'Lenis' : 'nativa'}
            </strong>
            {' · '}Movimento:{' '}
            <strong className="font-semibold text-foreground">
              {reducedMotion ? 'reduzido' : 'completo'}
            </strong>
            <span className="sr-only">
              {' '}
              (preferência do sistema: {systemReducedMotion ? 'reduzir' : 'sem restrição'})
            </span>
          </p>

          <fieldset className="flex rounded-full border border-border p-0.5">
            <legend className="sr-only">Preferência de movimento</legend>
            {options.map((o) => (
              <label
                key={o.value}
                className="cursor-pointer rounded-full px-3 py-1.5 text-small has-checked:bg-brand-white has-checked:text-brand-black has-focus-visible:outline-2 has-focus-visible:outline-focus"
              >
                <input
                  type="radio"
                  name="motion-preference"
                  value={o.value}
                  checked={preference === o.value}
                  onChange={() => setPreference(o.value)}
                  className="sr-only"
                />
                {o.label}
              </label>
            ))}
          </fieldset>
        </div>
      </div>
      <nav aria-label="Telas de demonstração" className="border-t border-border">
        <ul className="mx-auto flex w-full max-w-site gap-5 overflow-x-auto px-gutter py-2 text-small">
          {screens.map((sc) => {
            const current = new URLSearchParams(window.location.search).get('demo') === sc.demo
            return (
              <li key={sc.href} className="shrink-0">
                <a
                  href={sc.href}
                  aria-current={current ? 'page' : undefined}
                  className="link-underline text-foreground-subtle aria-[current=page]:text-foreground"
                >
                  {sc.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
      <ScrollProgress />
    </aside>
  )
}
