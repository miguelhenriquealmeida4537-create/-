/**
 * TEMPORÁRIO — demonstração técnica da Etapa 3 (movimento e acessibilidade).
 * Não é a página oficial e não contém informação comercial.
 * Remover quando as seções reais existirem.
 */
import { ArrowDown, ArrowUp, Eye, Gauge, Keyboard, MousePointerClick } from 'lucide-react'
import type { ReactNode } from 'react'
import { Parallax, Reveal, SplitText } from '@/components/motion'
import { DemoBanner } from '@/dev/DemoBanner'
import pizzaUrl from '@/dev/assets/pizza-ilustrativa.svg'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const principles = [
  {
    icon: Gauge,
    title: 'Leve no celular',
    text: 'Só transform e opacity. Toque usa rolagem nativa; parallax reduzido pela metade.',
  },
  {
    icon: Eye,
    title: 'Respeita o usuário',
    text: 'Com redução de movimento, Lenis é desligado e o conteúdo aparece sem animação.',
  },
  {
    icon: Keyboard,
    title: 'Acessível ao teclado',
    text: 'Elementos ainda não revelados continuam focáveis e legíveis por leitores de tela.',
  },
  {
    icon: MousePointerClick,
    title: 'Sem vazamentos',
    text: 'useGSAP reverte animações e ScrollTriggers ao desmontar, inclusive no Strict Mode.',
  },
]

function DemoSection({ id, label, children }: { id?: string; label: string; children: ReactNode }) {
  return (
    <section id={id} aria-label={label} className="border-t border-border py-section">
      <div className="container-site">{children}</div>
    </section>
  )
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-fluid-sm tracking-wider text-accent-secondary">{children}</p>
  )
}

export function MotionDemo() {
  const { scrollTo } = useSmoothScroll()

  return (
    <>
      <DemoBanner />

      {/* 1. SplitText ao montar */}
      <section id="topo" aria-label="Título animado" className="py-section">
        <div className="container-site">
          <Tag>&lt;SplitText as=&quot;h1&quot; /&gt;</Tag>
          <SplitText
            as="h1"
            className="max-w-5xl text-fluid-display leading-[1.05] font-bold tracking-tight"
          >
            Fundação de movimento e acessibilidade
          </SplitText>
          <Reveal delay={0.4} className="mt-8 flex flex-col gap-6">
            <p className="max-w-prose text-fluid-lg text-foreground-muted">
              Página de teste dos componentes de animação. Role para ver cada um em ação, ou troque
              a preferência de movimento na faixa superior.
            </p>
            <button
              type="button"
              onClick={() => scrollTo('#parallax')}
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-brand-red px-6 font-semibold text-brand-white transition-colors hover:bg-brand-red/85"
            >
              Ir para o parallax
              <ArrowDown className="size-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* 2. Reveal com stagger */}
      <DemoSection label="Demonstração de Reveal">
        <Tag>&lt;Reveal stagger={'{0.1}'} /&gt;</Tag>
        <Reveal as="ul" stagger={0.1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-raised p-6"
            >
              <Icon className="size-6 text-accent" aria-hidden="true" />
              <h2 className="text-fluid-lg font-semibold">{title}</h2>
              <p className="text-fluid-sm text-foreground-muted">{text}</p>
            </li>
          ))}
        </Reveal>
      </DemoSection>

      {/* 3. Parallax */}
      <DemoSection id="parallax" label="Demonstração de Parallax">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <Tag>&lt;Parallax distance={'{80}'} /&gt;</Tag>
            <h2 className="mb-4 text-fluid-2xl leading-tight font-bold">
              A ilustração se move mais devagar que a página.
            </h2>
            <p className="max-w-prose text-foreground-muted">
              O deslocamento é vinculado à rolagem (scrub) e cai pela metade abaixo de 768px. Com
              redução de movimento, a imagem fica parada.
            </p>
          </Reveal>
          <figure className="flex flex-col items-center gap-4">
            <Parallax distance={80} className="w-full max-w-md">
              <img
                src={pizzaUrl}
                alt="Ilustração de uma pizza com pepperoni e manjericão"
                width={480}
                height={480}
                loading="lazy"
                decoding="async"
                className="h-auto w-full drop-shadow-2xl"
              />
            </Parallax>
            <figcaption className="text-fluid-sm text-foreground-muted">
              Ilustração demonstrativa — não representa produto real.
            </figcaption>
          </figure>
        </div>
      </DemoSection>

      {/* 4. SplitText ao rolar */}
      <DemoSection label="Demonstração de SplitText ao rolar">
        <Tag>&lt;SplitText type=&quot;lines&quot; onScroll /&gt;</Tag>
        <SplitText
          as="h2"
          type="lines"
          onScroll
          className="max-w-4xl text-fluid-2xl leading-tight font-bold"
        >
          Este parágrafo é dividido em linhas e cada linha sobe de dentro de uma máscara quando
          entra na tela. Se a largura mudar, a divisão é refeita automaticamente.
        </SplitText>
      </DemoSection>

      {/* 5. Rolagem suave */}
      <DemoSection label="Demonstração de rolagem suave">
        <Reveal className="flex flex-col gap-6">
          <Tag>Lenis + gsap.ticker</Tag>
          <h2 className="text-fluid-2xl leading-tight font-bold">Rolagem suave</h2>
          <p className="max-w-prose text-foreground-muted">
            No desktop, a roda do mouse é suavizada pelo Lenis, sincronizado ao mesmo relógio do
            GSAP — a barra vermelha no topo acompanha sem atraso. No celular, o toque continua
            nativo. Links âncora e rolagem programática usam a mesma suavização.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-white px-6 font-semibold text-brand-black transition-colors hover:bg-brand-white/85"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
              Voltar ao topo (programático)
            </button>
            <a
              href="#parallax"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-6 font-semibold transition-colors hover:border-brand-white"
            >
              Link âncora para o parallax
            </a>
          </div>
        </Reveal>
        <div className="mt-section grid gap-4" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-24 rounded-2xl border border-dashed border-border" />
          ))}
        </div>
        <p className="mt-8 text-fluid-sm text-foreground-muted">
          Fim da demonstração ·{' '}
          <a href="?demo=fundacao" className="underline underline-offset-4">
            ver tela da Etapa 2
          </a>
        </p>
      </DemoSection>
    </>
  )
}
