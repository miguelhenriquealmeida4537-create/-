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

/** Faixa que identifica a tela como demonstração técnica (fixa a partir do tablet). */
export function DemoBanner() {
  const { reducedMotion, systemReducedMotion, preference, setPreference } = useMotionPreference()
  const { isSmooth } = useSmoothScroll()

  return (
    <aside
      aria-label="Aviso de demonstração técnica"
      className="relative z-50 border-b border-brand-red/40 bg-brand-black/90 backdrop-blur-md md:sticky md:top-0"
    >
      <div className="container-site flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 text-fluid-sm">
          <FlaskConical className="size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            <strong className="font-semibold tracking-wide text-accent uppercase">
              Demonstração técnica
            </strong>{' '}
            <span className="text-foreground-muted">
              · Etapa 3 · não é a página oficial da Casa da Pizza
            </span>
          </span>
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-fluid-sm">
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
                className="cursor-pointer rounded-full px-3 py-1.5 text-fluid-sm has-checked:bg-brand-white has-checked:text-brand-black has-focus-visible:outline-2 has-focus-visible:outline-focus"
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
      <ScrollProgress />
    </aside>
  )
}
