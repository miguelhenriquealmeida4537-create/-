import { ArrowRight, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, type MouseEvent } from 'react'
import { Logo } from '@/components/brand/Logo'
import { mainNav } from '@/components/layout/navigation'
import { Button } from '@/components/ui'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useModalDialog } from '@/hooks/useModalDialog'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { EASE_BRAND, gsap } from '@/lib/gsap'

interface MobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
  /** Seção visível no momento (destacada na lista) */
  activeId?: string | null
}

/**
 * Menu em tela cheia para celular e tablet.
 *
 * <dialog> modal nativo (via useModalDialog): foco preso, página inerte, Esc e
 * clique no fundo fecham, o foco volta ao botão que abriu e a rolagem fica travada.
 */
export function MobileMenu({ id, open, onClose, activeId = null }: MobileMenuProps) {
  // Controle compartilhado com o detalhe do produto: showModal/close, foco,
  // rolagem travada, Esc e clique no fundo (src/hooks/useModalDialog.ts)
  const dialogRef = useModalDialog({ open, onRequestClose: onClose })
  const listRef = useRef<HTMLUListElement>(null)
  const { scrollTo } = useSmoothScroll()
  const reducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Entrada: fundo esmaece e os links sobem em sequência
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!open || reducedMotion || !dialog || !listRef.current) return
    const tl = gsap.timeline({ defaults: { ease: EASE_BRAND } })
    tl.from(dialog, { opacity: 0, duration: 0.25 }).from(
      listRef.current.children,
      { y: 28, opacity: 0, duration: 0.5, stagger: 0.06, clearProps: 'all' },
      0.05,
    )
    return () => {
      tl.progress(1).kill()
    }
  }, [open, reducedMotion, dialogRef])

  // Ao virar desktop com o menu aberto, fecha
  useEffect(() => {
    if (isDesktop && open) onClose()
  }, [isDesktop, open, onClose])

  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
    // espera o menu fechar e a rolagem destravar
    requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(href)))
  }

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-label="Menu"
      className="m-0 h-dvh max-h-none w-full max-w-none bg-surface p-0 text-foreground backdrop:bg-brand-black/80"
    >
      <div className="mx-auto flex h-full w-full max-w-site flex-col px-gutter">
        <div className="flex h-20 shrink-0 items-center justify-between">
          <Logo size={56} alt="" />
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 grid size-12 place-items-center rounded-full transition-colors hover:bg-brand-white/8"
            aria-label="Fechar menu"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Principal" className="flex flex-1 flex-col justify-center">
          <ul ref={listRef} className="flex flex-col gap-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => goTo(e, item.href)}
                  aria-current={activeId === item.href.slice(1) ? 'location' : undefined}
                  className="group flex items-center justify-between border-b border-border py-4 font-display text-h2 font-semibold uppercase aria-[current=location]:border-brand-white/60"
                >
                  {item.label}
                  <ArrowRight
                    className="size-6 text-foreground-subtle transition-transform duration-(--duration-base) group-hover:translate-x-1 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <Button
            href="#cardapio"
            fullWidth
            size="lg"
            iconRight={ArrowRight}
            onClick={(e) => goTo(e, '#cardapio')}
          >
            Ver cardápio
          </Button>
        </div>
      </div>
    </dialog>
  )
}
