/**
 * TEMPORÁRIO — tela de verificação da Etapa 2.
 * Mostra tokens de cor, escala tipográfica e breakpoint ativo.
 * Não contém conteúdo comercial. Remover quando as seções reais existirem.
 */
const swatches = [
  { name: 'brand-black', hex: '#080808', className: 'bg-brand-black ring-1 ring-border' },
  { name: 'brand-white', hex: '#FFFFFF', className: 'bg-brand-white' },
  { name: 'brand-red', hex: '#ED1C2E', className: 'bg-brand-red' },
  { name: 'brand-gray', hex: '#333333', className: 'bg-brand-gray' },
  { name: 'brand-green', hex: '#72933A', className: 'bg-brand-green' },
]

const typeScale = [
  {
    token: 'fluid-display',
    className: 'text-fluid-display leading-[1.05] font-bold tracking-tight',
  },
  { token: 'fluid-2xl', className: 'text-fluid-2xl leading-tight font-bold' },
  { token: 'fluid-xl', className: 'text-fluid-xl font-semibold' },
  { token: 'fluid-lg', className: 'text-fluid-lg' },
  { token: 'fluid-base', className: 'text-fluid-base' },
  { token: 'fluid-sm', className: 'text-fluid-sm text-foreground-muted' },
]

function BreakpointBadge() {
  return (
    <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 text-fluid-sm">
      <span className="size-2 rounded-full bg-brand-green" aria-hidden="true" />
      <span>
        Breakpoint ativo:{' '}
        <strong className="font-semibold">
          <span className="sm:hidden">celular (&lt; 640px)</span>
          <span className="hidden sm:inline md:hidden">sm · celular grande</span>
          <span className="hidden md:inline lg:hidden">md · tablet</span>
          <span className="hidden lg:inline xl:hidden">lg · tablet horizontal</span>
          <span className="hidden xl:inline 2xl:hidden">xl · desktop</span>
          <span className="hidden 2xl:inline">2xl · desktop amplo</span>
        </strong>
      </span>
    </p>
  )
}

export function FoundationPreview() {
  return (
    <div className="container-site py-section">
      <header className="mb-16 flex flex-col gap-6">
        <p className="text-fluid-sm font-semibold tracking-[0.2em] text-accent uppercase">
          Etapa 2 · Fundação
        </p>
        <h1 className="text-fluid-display font-bold tracking-tight">
          Casa da <span className="text-accent">Pizza</span>
        </h1>
        <p className="max-w-prose text-fluid-lg text-foreground-muted">
          Tela temporária para validar tokens, tipografia fluida e responsividade. Nenhum conteúdo
          comercial é exibido nesta etapa.
        </p>
        <BreakpointBadge />
      </header>

      <section aria-labelledby="paleta" className="mb-16">
        <h2 id="paleta" className="mb-6 text-fluid-xl font-semibold">
          Paleta
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map((s) => (
            <li key={s.name} className="flex flex-col gap-3">
              <div className={`aspect-square rounded-2xl ${s.className}`} aria-hidden="true" />
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-fluid-sm text-foreground-muted">{s.hex}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tipografia">
        <h2 id="tipografia" className="mb-6 text-fluid-xl font-semibold">
          Escala tipográfica fluida
        </h2>
        <ul className="flex flex-col gap-4 border-t border-border pt-6">
          {typeScale.map((t) => (
            <li
              key={t.token}
              className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8"
            >
              <code className="w-40 shrink-0 text-fluid-sm text-foreground-muted">{t.token}</code>
              <span className={t.className}>Forno, massa e fermentação</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
