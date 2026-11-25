import { ChevronDown } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/motion'
import { Button, Container, Editorial, Eyebrow, Heading, Pending } from '@/components/ui'
import { DemoContentNotice } from '@/dev/DemoContent'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_BRAND, gsap } from '@/lib/gsap'
import { RatingSummaryCard, RatingSummaryPending } from '@/sections/reviews/RatingSummaryCard'
import { ReviewCard } from '@/sections/reviews/ReviewCard'
import { getReviews } from '@/services/reviews'

/** Quantas avaliações aparecem antes de "Mostrar mais" (celular / telas maiores). */
const PAGE_MOBILE = 4
const PAGE_DESKTOP = 6

/**
 * Avaliações de clientes. Sem carrossel automático: lista em colunas e
 * "Mostrar mais" manual. Nota média só com resumo oficial cadastrado.
 */
export function ReviewsSection() {
  const { reviews, summaries, isDemo } = getReviews()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const page = isDesktop ? PAGE_DESKTOP : PAGE_MOBILE
  const [extra, setExtra] = useState(0)
  /** Índice da primeira avaliação revelada pelo último "Mostrar mais" */
  const [newStart, setNewStart] = useState<number | null>(null)
  const visibleCount = Math.min(reviews.length, page + extra)
  const remaining = reviews.length - visibleCount
  const firstNewRef = useRef<HTMLElement>(null)
  const listWrapRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const showMore = () => {
    setNewStart(visibleCount)
    setExtra((n) => n + page)
  }

  // Após "Mostrar mais": foco na primeira avaliação nova + entrada discreta das novas
  useLayoutEffect(() => {
    if (newStart === null) return
    firstNewRef.current?.focus()
    if (reducedMotion || !listWrapRef.current) return
    const added = Array.from(listWrapRef.current.querySelectorAll('li')).slice(newStart)
    const tween = gsap.from(added, {
      opacity: 0,
      y: 16,
      duration: 0.5,
      stagger: 0.06,
      ease: EASE_BRAND,
      clearProps: 'opacity,transform',
    })
    return () => {
      tween.progress(1).kill()
    }
  }, [newStart, reducedMotion])

  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-titulo" className="py-section">
      <Container className="flex flex-col gap-stack-xl">
        <div className="grid gap-stack-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end">
          <Reveal className="flex flex-col gap-stack-sm">
            <Eyebrow>Avaliações</Eyebrow>
            <Heading level={2} id="avaliacoes-titulo">
              Avaliações <Editorial>de clientes</Editorial>
            </Heading>
            {isDemo && <DemoContentNotice subject="reviews" className="mt-stack-sm" />}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            {summaries.length > 0 ? (
              summaries.map((s) => <RatingSummaryCard key={s.platform} summary={s} />)
            ) : (
              <RatingSummaryPending />
            )}
          </Reveal>
        </div>

        {reviews.length === 0 ? (
          <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-border-strong p-8">
            <Pending label="avaliações de clientes" />
            <p className="max-w-prose text-foreground-muted">
              Avaliações verificadas de clientes serão publicadas aqui, com identificação
              autorizada, nota, data e link para a publicação original.
            </p>
          </div>
        ) : (
          <div ref={listWrapRef} className="flex flex-col items-center gap-stack-lg">
            <Reveal
              as="ul"
              stagger={0.07}
              className="w-full columns-1 gap-5 md:columns-2 xl:columns-3 [&>li]:mb-5 [&>li]:break-inside-avoid"
            >
              {reviews.slice(0, visibleCount).map((review, i) => (
                <li key={review.id}>
                  <ReviewCard
                    review={review}
                    isDemo={isDemo}
                    ref={i === newStart ? firstNewRef : undefined}
                  />
                </li>
              ))}
            </Reveal>

            {remaining > 0 && (
              <Button variant="secondary" iconRight={ChevronDown} onClick={showMore}>
                Mostrar mais avaliações ({remaining})
              </Button>
            )}
            <p className="sr-only" aria-live="polite">
              {newStart !== null && `${visibleCount} de ${reviews.length} avaliações exibidas.`}
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
