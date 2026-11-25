import { ArrowRight, X } from 'lucide-react'
import { useEffect, useRef, type MouseEvent } from 'react'
import { Logo } from '@/components/brand/Logo'
import { mainNav } from '@/components/layout/navigation'
import { Button } from '@/components/ui'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { EASE_BRAND, gsap } from '@/lib/gsap'

interface MobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
}

/**
 * Menu em tela cheia para celular e tablet.
 *
 * Usa <dialog> nativo com showModal(): o navegador prende o foco dentro do menu,
 * torna o restante da página inerte, fecha com Esc e devolve o foco ao botão
 * que o abriu. A rolagem da página fica travada enquanto está aberto.
 */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const { lenis, scrollTo } = useSmoothScroll()
  const reducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Abre/fecha o <dialog> conforme o estado e trava a rolagem
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'

      if (!reducedMotion && listRef.current) {
        const tl = gsap.timeline({ defaults: { ease: EASE_BRAND } })
        tl.from(dialog, { opacity: 0, duration: 0.25 }).from(
          listRef.current.children,
          { y: 28, opacity: 0, duration: 0.5, stagger: 0.06, clearProps: 'all' },
          0.05,
        )
        return () => {
          tl.kill()
        }
      }
    }

    if (!open && dialog.open) dialog.close()
  }, [open, lenis, reducedMotion])

  // Sincroniza fechamentos feitos pelo navegador (tecla Esc)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      onClose()
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [lenis, onClose])

  // Ao virar desktop com o menu aberto, fecha
  useEffect(() => {
    if (isDesktop && open) onClose()
  }, [isDesktop, open, onClose])

  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    e.stopPropagation()
    dialogRef.current?.close()
    // espera o menu fechar e a rolagem destravar
    requestAnimationFrame(() => scrollTo(href))
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
            onClick={() => dialogRef.current?.close()}
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
                  className="group flex items-center justify-between border-b border-border py-4 font-display text-h2 font-semibold uppercase"
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
