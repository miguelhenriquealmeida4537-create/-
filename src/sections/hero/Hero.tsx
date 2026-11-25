import { ArrowRight, MapPin } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Logo } from '@/components/brand/Logo'
import { OpeningStatus } from '@/components/layout/OpeningStatus'
import { Button, Container, Editorial, Pending } from '@/components/ui'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'
import { setFeaturedLogoVisible } from '@/lib/brand-presence'
import { EASE_BRAND, gsap, useGSAP } from '@/lib/gsap'
import { HeroMedia } from '@/sections/hero/HeroMedia'
import { getBusiness } from '@/services/business'
import { getHeroImage } from '@/services/media'

/**
 * Hero — abertura da página.
 *
 * Entrada cinematográfica (uma vez, ao carregar):
 *   fundo aproxima suavemente → selo surge → título sobe linha a linha de dentro
 *   de uma máscara → ações e detalhes aparecem.
 * Parallax discreto ao rolar: o fundo desce mais devagar que a página; no
 * desktop o conteúdo sobe levemente e esmaece. No celular, só o fundo se move.
 * Com redução de movimento: tudo visível e estático desde o início.
 */
export function Hero() {
  const business = getBusiness()
  const photo = getHeroImage()
  const mapsUrl = business.address?.mapsUrl
  const rootRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const reducedMotion = useReducedMotion()

  // Informa ao Header se o selo grande está visível (evita logo duplicada)
  useEffect(() => {
    const el = logoRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setFeaturedLogoVisible(entry?.isIntersecting ?? false),
      { rootMargin: '-64px 0px 0px 0px' }, // abaixo da altura do Header
    )
    io.observe(el)
    return () => {
      io.disconnect()
      setFeaturedLogoVisible(false)
    }
  }, [])

  useGSAP(
    () => {
      if (reducedMotion) return
      const q = gsap.utils.selector(rootRef)

      gsap
        .timeline({ defaults: { ease: EASE_BRAND } })
        .from(
          q('[data-hero-media]'),
          { scale: 1.1, opacity: 0, duration: 1.8, ease: 'power2.out' },
          0,
        )
        .from(q('[data-hero-logo]'), { scale: 0.9, opacity: 0, duration: 1.1 }, 0.2)
        .from(q('[data-hero-line]'), { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.4)
        .from(
          q('[data-hero-fade]'),
          { y: 16, opacity: 0, duration: 0.8, stagger: 0.08, clearProps: 'transform,opacity' },
          0.85,
        )

      const mm = gsap.matchMedia()
      // Uma condição para cada faixa: o matchMedia só executa quando alguma é verdadeira
      mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767.98px)' }, (ctx) => {
        const desktop = Boolean(ctx.conditions?.desktop)
        const scroll = {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
        gsap.to(q('[data-hero-media-inner]'), {
          yPercent: desktop ? 12 : 6,
          ease: 'none',
          scrollTrigger: scroll,
        })
        if (desktop) {
          gsap.to(q('[data-hero-content]'), {
            y: -56,
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: scroll,
          })
        }
      })
      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  return (
    <section
      ref={rootRef}
      id="topo"
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-svh overflow-hidden"
    >
      <HeroMedia photo={photo} />

      {/* Véus de legibilidade: de baixo no celular, da esquerda no desktop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-surface via-surface/70 to-surface/30 lg:bg-linear-to-r lg:via-surface/60 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-surface to-transparent"
      />

      <Container
        data-hero-content
        className={cn(
          'relative flex min-h-svh flex-col justify-end pt-28 sm:pb-28 lg:justify-center lg:py-32',
          // sem foto, reserva espaço para a etiqueta do espaço reservado no celular
          photo ? 'pb-24' : 'pb-36',
        )}
      >
        <div className="grid items-center gap-stack-lg lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div data-hero-logo className="lg:order-2">
            <Logo
              ref={logoRef}
              size={352}
              fluid
              priority
              sizes="(min-width: 1280px) 352px, (min-width: 1024px) 288px, (min-width: 640px) 176px, 136px"
              className="size-34 drop-shadow-[0_24px_48px_rgb(0_0_0/0.6)] sm:size-44 lg:size-72 xl:size-88"
            />
          </div>

          <div className="flex flex-col gap-stack-lg lg:order-1">
            <h1
              id="hero-titulo"
              className="font-display text-[clamp(3rem,1.5rem+6.2vw,7.25rem)] leading-[0.95] font-bold uppercase"
            >
              <span className="block overflow-hidden pb-[0.04em]">
                <span data-hero-line className="block">
                  Da nossa casa,
                </span>
              </span>{' '}
              <span className="block overflow-hidden pb-[0.14em]">
                <span data-hero-line className="block">
                  <Editorial className="leading-[1.05]">pra sua casa</Editorial>
                </span>
              </span>
            </h1>

            <div data-hero-fade className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#cardapio" size="lg" iconRight={ArrowRight}>
                Ver cardápio
              </Button>
              {mapsUrl ? (
                <Button
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  iconLeft={MapPin}
                >
                  Como chegar
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  iconLeft={MapPin}
                  disabled
                  aria-describedby="hero-localizacao-pendente"
                >
                  Como chegar
                </Button>
              )}
            </div>

            {!mapsUrl && (
              <p
                data-hero-fade
                id="hero-localizacao-pendente"
                className="-mt-3 flex flex-wrap items-center gap-2 text-small text-foreground-muted"
              >
                <Pending label="localização" /> Endereço e rota em confirmação.
              </p>
            )}

            <div data-hero-fade className="empty:hidden">
              <OpeningStatus business={business} />
            </div>
          </div>
        </div>
      </Container>

      {/* Indicação de rolagem (tablet e desktop) */}
      <a
        href="#cardapio"
        data-hero-fade
        aria-label="Ir para o cardápio"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-caption tracking-[0.2em] text-foreground-subtle uppercase transition-colors hover:text-foreground sm:flex"
      >
        Role
        <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-border-strong">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-foreground" />
        </span>
      </a>
    </section>
  )
}
