/**
 * TEMPORÁRIO — demonstração da identidade visual e do design system (Etapa 4).
 * Não é a página oficial e não contém produtos, preços ou informações comerciais.
 * Remover quando as seções reais existirem.
 */
import { ArrowRight, ArrowUpRight, Check, Plus, ShoppingBag, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion'
import { Button, Container, Editorial, Eyebrow, Heading } from '@/components/ui'
import type { ContainerSize } from '@/components/ui'
import { DemoBanner } from '@/dev/DemoBanner'
import { cn } from '@/lib/cn'

/* -------------------------------------------------------------------------- */
/* Dados da demonstração (somente tokens do design system)                     */
/* -------------------------------------------------------------------------- */

const palette = [
  {
    name: 'Preto',
    token: 'brand-black',
    hex: '#080808',
    role: 'Base de toda a interface',
    swatch: 'bg-brand-black ring-1 ring-inset ring-border',
    text: 'text-brand-white',
  },
  {
    name: 'Branco',
    token: 'brand-white',
    hex: '#FFFFFF',
    role: 'Texto e blocos claros pontuais',
    swatch: 'bg-brand-white',
    text: 'text-brand-black',
  },
  {
    name: 'Vermelho',
    token: 'brand-red',
    hex: '#ED1C2E',
    role: 'Ação principal e destaques — com moderação',
    swatch: 'bg-brand-red',
    text: 'text-brand-white',
  },
  {
    name: 'Cinza',
    token: 'brand-gray',
    hex: '#333333',
    role: 'Superfícies de apoio',
    swatch: 'bg-brand-gray',
    text: 'text-brand-white',
  },
  {
    name: 'Verde',
    token: 'brand-green',
    hex: '#72933A',
    role: 'Detalhes frescos e selos',
    swatch: 'bg-brand-green',
    text: 'text-brand-black',
  },
]

const proportion = [
  { label: 'Preto', pct: 60, className: 'bg-brand-black ring-1 ring-inset ring-border' },
  { label: 'Branco', pct: 25, className: 'bg-brand-white' },
  { label: 'Cinza', pct: 8, className: 'bg-brand-gray' },
  { label: 'Vermelho', pct: 5, className: 'bg-brand-red' },
  { label: 'Verde', pct: 2, className: 'bg-brand-green' },
]

type Verdict = 'aa' | 'large' | 'avoid'
const contrast: { fg: string; bg: string; ratio: string; verdict: Verdict; sample: string }[] = [
  {
    fg: 'Branco',
    bg: 'Preto',
    ratio: '20.0',
    verdict: 'aa',
    sample: 'bg-brand-black text-brand-white',
  },
  {
    fg: 'Vermelho',
    bg: 'Preto',
    ratio: '4.58',
    verdict: 'aa',
    sample: 'bg-brand-black text-brand-red',
  },
  {
    fg: 'Verde',
    bg: 'Preto',
    ratio: '5.67',
    verdict: 'aa',
    sample: 'bg-brand-black text-brand-green',
  },
  {
    fg: 'Branco',
    bg: 'Cinza',
    ratio: '12.6',
    verdict: 'aa',
    sample: 'bg-brand-gray text-brand-white',
  },
  {
    fg: 'Branco',
    bg: 'Vermelho',
    ratio: '4.37',
    verdict: 'large',
    sample: 'bg-brand-red text-brand-white',
  },
  {
    fg: 'Branco',
    bg: 'Verde',
    ratio: '3.53',
    verdict: 'large',
    sample: 'bg-brand-green text-brand-white',
  },
  {
    fg: 'Vermelho',
    bg: 'Cinza',
    ratio: '2.89',
    verdict: 'avoid',
    sample: 'bg-brand-gray text-brand-red',
  },
]

const verdictLabel: Record<Verdict, { text: string; className: string }> = {
  aa: { text: 'AA · qualquer texto', className: 'text-accent-secondary' },
  large: { text: 'Só texto grande/ícones', className: 'text-foreground-muted' },
  avoid: { text: 'Evitar', className: 'text-accent' },
}

const fonts = [
  {
    family: 'Oswald',
    className: 'font-display font-semibold',
    role: 'Títulos e chamadas',
    detail: 'Variável 200–700 · ~28 KB · pré-carregada',
  },
  {
    family: 'Inter',
    className: 'font-sans font-medium',
    role: 'Textos, descrições e interface',
    detail: 'Variável 100–900 · ~48 KB · pré-carregada',
  },
  {
    family: 'Playfair Display',
    className: 'font-editorial italic',
    role: 'Detalhes editoriais',
    detail: 'Itálico 400–900 · ~39 KB · sob demanda',
  },
]

const typeScale: { token: string; range: string; node: ReactNode }[] = [
  {
    token: 'text-display',
    range: '52 → 136px',
    node: <p className="font-display text-display font-bold uppercase">Casa da Pizza</p>,
  },
  {
    token: 'text-h1',
    range: '40 → 88px',
    node: <p className="font-display text-h1 font-bold uppercase">Título principal</p>,
  },
  {
    token: 'text-h2',
    range: '32 → 60px',
    node: <p className="font-display text-h2 font-semibold uppercase">Título de seção</p>,
  },
  {
    token: 'text-h3',
    range: '24 → 36px',
    node: <p className="font-display text-h3 font-semibold">Subtítulo de bloco</p>,
  },
  {
    token: 'text-h4',
    range: '20 → 24px',
    node: <p className="font-display text-h4 font-medium">Título de cartão</p>,
  },
  {
    token: 'text-editorial',
    range: '24 → 44px',
    node: (
      <Editorial as="p" variant="block">
        Um detalhe editorial, usado com moderação.
      </Editorial>
    ),
  },
  {
    token: 'text-lead',
    range: '18 → 22px',
    node: (
      <p className="text-lead text-foreground-muted">
        Texto de abertura: apresenta a seção em uma ou duas frases.
      </p>
    ),
  },
  {
    token: 'text-body',
    range: '16 → 17px',
    node: (
      <p className="max-w-prose text-body text-foreground-muted">
        Texto corrido para descrições e conteúdo. Altura de linha generosa e largura limitada a
        cerca de 65 caracteres para leitura confortável no celular e no desktop.
      </p>
    ),
  },
  {
    token: 'text-small',
    range: '14px',
    node: (
      <p className="text-small text-foreground-muted">Texto de apoio e rótulos de interface.</p>
    ),
  },
  {
    token: 'text-caption',
    range: '12px',
    node: <p className="text-caption text-foreground-subtle">Legendas e metadados.</p>,
  },
  {
    token: 'text-eyebrow',
    range: '13px',
    node: <Eyebrow>Rótulo de seção</Eyebrow>,
  },
]

const containers: { size: ContainerSize; label: string }[] = [
  { size: 'narrow', label: 'narrow · 720px — textos longos' },
  { size: 'default', label: 'default · 1280px — padrão' },
  { size: 'wide', label: 'wide · 1536px — vitrines' },
]

const radii = [
  { token: 'rounded-xs', px: '4px', className: 'rounded-xs' },
  { token: 'rounded-sm', px: '8px', className: 'rounded-sm' },
  { token: 'rounded-md', px: '14px', className: 'rounded-md' },
  { token: 'rounded-lg', px: '20px', className: 'rounded-lg' },
  { token: 'rounded-xl', px: '32px', className: 'rounded-xl' },
  { token: 'rounded-full', px: 'pílula', className: 'rounded-full' },
]

const shadows = [
  { token: 'shadow-sm', use: 'Separação mínima', className: 'shadow-sm' },
  { token: 'shadow-md', use: 'Cartões em repouso', className: 'shadow-md' },
  { token: 'shadow-lg', use: 'Cartões em hover', className: 'shadow-lg' },
  { token: 'shadow-glow', use: 'Só no hover do botão primário', className: 'shadow-glow' },
]

const spacing = [
  { token: 'stack-xs', px: '8px', w: 'w-2' },
  { token: 'stack-sm', px: '16px', w: 'w-4' },
  { token: 'stack-md', px: '24px', w: 'w-6' },
  { token: 'stack-lg', px: '40px', w: 'w-10' },
  { token: 'stack-xl', px: '64px', w: 'w-16' },
  { token: 'gutter', px: '20 → 48px', w: 'w-gutter' },
  { token: 'section', px: '80 → 160px', w: 'w-section' },
]

/* -------------------------------------------------------------------------- */
/* Estrutura                                                                  */
/* -------------------------------------------------------------------------- */

function DSSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string
  eyebrow: string
  title: ReactNode
  description?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="border-t border-border py-section">
      <Container>
        <Reveal className="mb-stack-xl flex max-w-3xl flex-col gap-stack-sm">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading level={2} id={`${id}-titulo`}>
            {title}
          </Heading>
          {description && <p className="text-lead text-foreground-muted">{description}</p>}
        </Reveal>
        {children}
      </Container>
    </section>
  )
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-stack-sm font-mono text-caption text-foreground-subtle">{children}</p>
}

/* -------------------------------------------------------------------------- */

export function IdentityDemo() {
  return (
    <>
      <DemoBanner stage="Etapa 4 · Identidade visual" />

      {/* ------------------------------ Abertura ------------------------------ */}
      <section aria-labelledby="ds-titulo" className="relative overflow-hidden py-section">
        <Container className="flex flex-col gap-stack-lg">
          <Eyebrow>Design System · v1</Eyebrow>
          <div className="flex flex-col gap-stack-sm">
            <Heading level={1} size="display" id="ds-titulo">
              Casa da <span className="text-accent">Pizza</span>
            </Heading>
            <Editorial as="p" variant="block" tone="muted">
              Modern Pizzeria, Premium Casual.
            </Editorial>
          </div>
          <p className="max-w-2xl text-lead text-foreground-muted">
            Guia vivo da identidade visual: cores, tipografia, componentes e interações que vão
            construir o site. Esta página é apenas uma referência técnica.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#paleta" iconRight={ArrowRight}>
              Ver paleta
            </Button>
            <Button href="#tipografia" variant="secondary">
              Tipografia
            </Button>
            <Button href="#botoes" variant="ghost">
              Componentes
            </Button>
          </div>
        </Container>
      </section>

      {/* ------------------------------- Paleta ------------------------------- */}
      <DSSection
        id="paleta"
        eyebrow="01 · Cor"
        title="Paleta oficial"
        description="O preto sustenta a interface. O vermelho aparece só onde existe uma ação ou um destaque que merece atenção."
      >
        <Reveal
          as="ul"
          stagger={0.06}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
        >
          {palette.map((c) => (
            <li
              key={c.token}
              className={cn(
                'flex aspect-[3/4] flex-col justify-between rounded-lg p-5 sm:aspect-[4/5]',
                c.swatch,
                c.text,
              )}
            >
              <span className="font-display text-h4 font-semibold uppercase">{c.name}</span>
              <span className="flex flex-col gap-1">
                <span className="font-mono text-small">{c.hex}</span>
                <span className="text-caption opacity-80">{c.role}</span>
              </span>
            </li>
          ))}
        </Reveal>

        <div className="mt-stack-xl grid gap-stack-xl lg:grid-cols-2">
          <Reveal>
            <Heading level={3} className="mb-stack-sm">
              Proporção de uso
            </Heading>
            <p className="mb-stack-md text-foreground-muted">
              Referência para composições de página. O vermelho não passa de 5% da área visível.
            </p>
            <div
              className="flex h-14 overflow-hidden rounded-md"
              role="img"
              aria-label="Preto 60%, branco 25%, cinza 8%, vermelho 5%, verde 2%"
            >
              {proportion.map((p) => (
                <div key={p.label} className={p.className} style={{ width: `${p.pct}%` }} />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-small text-foreground-muted">
              {proportion.map((p) => (
                <li key={p.label}>
                  {p.label} <span className="text-foreground">{p.pct}%</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <Heading level={3} className="mb-stack-sm">
              Contraste (WCAG)
            </Heading>
            <ul className="divide-y divide-border rounded-lg border border-border">
              {contrast.map((c) => (
                <li key={c.fg + c.bg} className="flex items-center gap-4 px-4 py-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid size-10 shrink-0 place-items-center rounded-sm font-display font-semibold ring-1 ring-border ring-inset',
                      c.sample,
                    )}
                  >
                    Aa
                  </span>
                  <span className="flex-1 text-small">
                    {c.fg} sobre {c.bg.toLowerCase()}
                  </span>
                  <span className="font-mono text-small tabular-nums">{c.ratio}:1</span>
                  <span
                    className={cn(
                      'hidden w-40 text-right text-caption sm:block',
                      verdictLabel[c.verdict].className,
                    )}
                  >
                    {verdictLabel[c.verdict].text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </DSSection>

      {/* ----------------------------- Tipografia ----------------------------- */}
      <DSSection
        id="tipografia"
        eyebrow="02 · Tipografia"
        title={
          <>
            Três vozes, <Editorial tone="accent">um tom</Editorial>
          </>
        }
        description="Oswald dá impacto, Inter dá clareza e Playfair Display entra apenas nos detalhes. Todas com licença SIL Open Font License 1.1, hospedadas no próprio site."
      >
        <Reveal as="ul" stagger={0.08} className="grid gap-4 md:grid-cols-3">
          {fonts.map((f) => (
            <li
              key={f.family}
              className="flex flex-col gap-stack-md rounded-lg border border-border bg-surface-raised p-6 inset-shadow-highlight"
            >
              <span aria-hidden="true" className={cn('text-[5rem] leading-none', f.className)}>
                Aa
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-display text-h4 font-medium">{f.family}</p>
                <p className="text-foreground-muted">{f.role}</p>
                <p className="text-caption text-foreground-subtle">{f.detail}</p>
              </div>
            </li>
          ))}
        </Reveal>

        <div className="mt-stack-xl">
          <Heading level={3} className="mb-stack-md">
            Escala tipográfica
          </Heading>
          <ul className="divide-y divide-border border-y border-border">
            {typeScale.map((t) => (
              <li
                key={t.token}
                className="grid gap-2 py-6 md:grid-cols-[12rem_1fr] md:items-baseline md:gap-8"
              >
                <span className="flex gap-3 font-mono text-caption text-foreground-subtle md:flex-col md:gap-1">
                  <span className="text-foreground-muted">{t.token}</span>
                  <span>{t.range}</span>
                </span>
                <div className="min-w-0 break-words">{t.node}</div>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-stack-xl rounded-xl border border-border bg-surface-raised p-6 sm:p-10 lg:p-14">
          <Label>Composição · Eyebrow + Heading + Editorial + texto + botões</Label>
          <div className="flex max-w-3xl flex-col gap-stack-md">
            <Eyebrow marker="secondary">Exemplo de hierarquia</Eyebrow>
            <Heading level={3} size="h1" uppercase>
              Título forte, <Editorial tone="accent">detalhe</Editorial> delicado
            </Heading>
            <p className="text-lead text-foreground-muted">
              Um bloco montado só com componentes do design system. O conteúdo real da marca entra
              nas próximas etapas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button iconRight={ArrowRight}>Ação principal</Button>
              <Button variant="secondary">Alternativa</Button>
            </div>
          </div>
        </Reveal>
      </DSSection>

      {/* ------------------------------- Botões ------------------------------- */}
      <DSSection
        id="botoes"
        eyebrow="03 · Componentes"
        title="Botões e estados"
        description="Passe o mouse, pressione ou navegue com a tecla Tab. Todos os tamanhos têm no mínimo 44px de altura."
      >
        <div className="flex flex-col gap-stack-xl">
          {(
            [
              ['primary', 'Primária', 'Uma por bloco. É onde o vermelho trabalha.'],
              ['secondary', 'Secundária', 'Alternativa à ação principal.'],
              ['ghost', 'Discreta', 'Ações de apoio e navegação leve.'],
            ] as const
          ).map(([variant, name, hint]) => (
            <Reveal key={variant} className="grid gap-stack-md lg:grid-cols-[14rem_1fr]">
              <div>
                <Heading level={3} size="h4">
                  {name}
                </Heading>
                <p className="text-small text-foreground-muted">{hint}</p>
              </div>
              <div className="flex flex-col gap-stack-md">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant={variant} size="sm">
                    Pequeno
                  </Button>
                  <Button variant={variant}>Médio</Button>
                  <Button variant={variant} size="lg">
                    Grande
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant={variant} iconRight={ArrowRight}>
                    Com ícone
                  </Button>
                  <Button variant={variant} iconLeft={Plus}>
                    Ícone à esquerda
                  </Button>
                  <Button variant={variant} loading>
                    Carregando
                  </Button>
                  <Button variant={variant} disabled>
                    Desabilitado
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal className="grid gap-stack-md lg:grid-cols-[14rem_1fr]">
            <div>
              <Heading level={3} size="h4">
                Largura total
              </Heading>
              <p className="text-small text-foreground-muted">
                Para o celular e rodapés de cartões.
              </p>
            </div>
            <div className="max-w-sm">
              <Button fullWidth iconLeft={ShoppingBag}>
                Botão de largura total
              </Button>
            </div>
          </Reveal>

          <Reveal className="rounded-lg border border-border p-6">
            <Label>Quando usar cada variante</Label>
            <ul className="grid gap-4 text-small text-foreground-muted md:grid-cols-2">
              <li className="flex gap-3">
                <Check className="size-5 shrink-0 text-accent-secondary" aria-hidden="true" />
                Uma primária por bloco; secundária e discreta ao lado dela.
              </li>
              <li className="flex gap-3">
                <Check className="size-5 shrink-0 text-accent-secondary" aria-hidden="true" />
                Com <code>href</code> vira link; sem, é botão de ação.
              </li>
              <li className="flex gap-3">
                <X className="size-5 shrink-0 text-accent" aria-hidden="true" />
                Nunca duas primárias lado a lado.
              </li>
              <li className="flex gap-3">
                <X className="size-5 shrink-0 text-accent" aria-hidden="true" />
                Não usar botão vermelho sobre fundo vermelho ou cinza.
              </li>
            </ul>
          </Reveal>
        </div>
      </DSSection>

      {/* ----------------------------- Containers ----------------------------- */}
      <section
        id="containers"
        aria-labelledby="containers-titulo"
        className="border-t border-border py-section"
      >
        <Container>
          <Reveal className="mb-stack-xl flex max-w-3xl flex-col gap-stack-sm">
            <Eyebrow>04 · Layout</Eyebrow>
            <Heading level={2} id="containers-titulo">
              Containers
            </Heading>
            <p className="text-lead text-foreground-muted">
              Três larguras máximas com a mesma margem lateral fluida: 20px no celular, 48px no
              desktop. Redimensione a janela para ver o comportamento.
            </p>
          </Reveal>
        </Container>
        <div className="flex flex-col gap-4">
          {containers.map((c) => (
            <Container key={c.size} size={c.size}>
              <div className="flex h-16 items-center rounded-md border border-dashed border-border-strong bg-surface-raised px-4 text-small text-foreground-muted">
                <span className="font-mono">{c.label}</span>
              </div>
            </Container>
          ))}
        </div>
      </section>

      {/* ----------------------- Bordas, sombras, espaço ---------------------- */}
      <DSSection id="fundamentos" eyebrow="05 · Fundamentos" title="Raios, sombras e espaçamentos">
        <div className="flex flex-col gap-stack-xl">
          <div>
            <Heading level={3} className="mb-stack-md">
              Raios
            </Heading>
            <ul className="grid grid-cols-3 gap-4 md:grid-cols-6">
              {radii.map((r) => (
                <li key={r.token} className="flex flex-col gap-2">
                  <div
                    className={cn(
                      'aspect-square border border-border-strong bg-surface-raised',
                      r.className,
                    )}
                  />
                  <span className="font-mono text-caption text-foreground-muted">{r.token}</span>
                  <span className="text-caption text-foreground-subtle">{r.px}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading level={3} className="mb-stack-md">
              Sombras
            </Heading>
            <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {shadows.map((s) => (
                <li key={s.token} className="flex flex-col gap-3">
                  <div
                    className={cn(
                      'h-28 rounded-lg border border-border bg-surface-overlay',
                      s.className,
                    )}
                  />
                  <span className="font-mono text-caption text-foreground-muted">{s.token}</span>
                  <span className="text-caption text-foreground-subtle">{s.use}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading level={3} className="mb-stack-md">
              Espaçamentos
            </Heading>
            <ul className="flex flex-col gap-3">
              {spacing.map((s) => (
                <li key={s.token} className="flex items-center gap-4">
                  <span className="w-24 shrink-0 font-mono text-caption text-foreground-muted">
                    {s.token}
                  </span>
                  <span className={cn('h-4 shrink-0 rounded-xs bg-accent-secondary', s.w)} />
                  <span className="text-caption text-foreground-subtle">{s.px}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DSSection>

      {/* ----------------------------- Interações ----------------------------- */}
      <DSSection
        id="interacoes"
        eyebrow="06 · Interação"
        title="Estados e microanimações"
        description="Movimentos curtos (150–250ms) que confirmam a ação. Com redução de movimento, só a cor muda — nada se desloca."
      >
        <Reveal as="ul" stagger={0.08} className="grid gap-4 md:grid-cols-3">
          {[
            ['Cartão interativo', 'Eleva 4px, ganha borda mais clara e sombra.'],
            ['Foco por teclado', 'Anel branco de 2px com 3px de respiro em todo controle.'],
            ['Pressionado', 'Botões afundam 1px; o vermelho escurece em dois níveis.'],
          ].map(([title, text]) => (
            <li key={title}>
              <a
                href="#interacoes"
                className="group flex h-full interactive-lift flex-col gap-stack-md rounded-lg border border-border bg-surface-raised p-6 inset-shadow-highlight"
              >
                <ArrowUpRight
                  className="size-6 text-foreground-subtle transition-colors duration-(--duration-base) group-hover:text-accent"
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-2">
                  <span className="font-display text-h4 font-medium">{title}</span>
                  <span className="text-small text-foreground-muted">{text}</span>
                </span>
              </a>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-stack-xl grid gap-stack-lg md:grid-cols-2">
          <div className="rounded-lg border border-border p-6">
            <Label>Link de texto · link-underline</Label>
            <p className="text-lead">
              Um texto com um{' '}
              <a href="#interacoes" className="link-underline text-foreground">
                link que sublinha da esquerda
              </a>{' '}
              ao passar o mouse ou receber foco.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6">
            <Label>Estados do vermelho</Label>
            <ul className="flex gap-3">
              {[
                ['Repouso', 'bg-accent', '#ED1C2E'],
                ['Hover', 'bg-accent-hover', '#D41526'],
                ['Pressionado', 'bg-accent-active', '#B8101F'],
              ].map(([label, bg, hex]) => (
                <li key={label} className="flex flex-1 flex-col gap-2">
                  <span className={cn('h-12 rounded-sm', bg)} />
                  <span className="text-caption text-foreground-muted">{label}</span>
                  <span className="font-mono text-caption text-foreground-subtle">{hex}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </DSSection>

      <footer className="border-t border-border py-stack-xl">
        <Container className="text-small text-foreground-subtle">
          Demonstração técnica · fontes sob SIL Open Font License 1.1 ·{' '}
          <a href="/licenses/oswald-OFL.txt" className="link-underline">
            Oswald
          </a>
          ,{' '}
          <a href="/licenses/inter-OFL.txt" className="link-underline">
            Inter
          </a>
          ,{' '}
          <a href="/licenses/playfair-display-OFL.txt" className="link-underline">
            Playfair Display
          </a>
        </Container>
      </footer>
    </>
  )
}
