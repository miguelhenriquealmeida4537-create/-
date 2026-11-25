import { Menu } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Logo } from '@/components/brand/Logo'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { mainNav } from '@/components/layout/navigation'
import { Button, Container } from '@/components/ui'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'

const MENU_ID = 'menu-principal'

/**
 * Cabeçalho fixo.
 * - No topo: transparente, selo em 56px.
 * - Após rolar: fundo grafite translúcido com desfoque, mais baixo, selo em 44px.
 * - Abaixo de 1024px: navegação vai para o menu em tela cheia.
 */
export function Header() {
  const scrolled = useScrolled(24)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header
        data-scrolled={scrolled || undefined}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b border-transparent',
          'transition-[background-color,border-color,backdrop-filter] duration-(--duration-slow) ease-(--ease-brand)',
          'data-scrolled:border-border data-scrolled:bg-surface/85 data-scrolled:backdrop-blur-md',
        )}
      >
        <Container
          className={cn(
            'flex items-center justify-between gap-6',
            'transition-[height] duration-(--duration-slow) ease-(--ease-brand)',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          <a
            href="#topo"
            aria-label="Casa da Pizza — voltar ao início"
            className="-ml-1 shrink-0 rounded-full"
          >
            <Logo
              size={56}
              alt=""
              priority
              className={cn(
                'origin-left transition-transform duration-(--duration-slow) ease-(--ease-brand)',
                scrolled && 'scale-[0.7857]', // 56px → 44px
              )}
            />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-small font-medium tracking-[0.08em] text-foreground-muted uppercase transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* O wrapper controla a visibilidade (display do Button é inline-flex) */}
            <div className="hidden sm:block">
              <Button href="#cardapio" size="sm">
                Ver cardápio
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              className="-mr-2 grid size-12 place-items-center rounded-full transition-colors hover:bg-brand-white/8 lg:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
              <span className="sr-only">Abrir menu</span>
            </button>
          </div>
        </Container>
      </header>
      {/* Fora do <header>: o backdrop-filter dele não deve afetar o menu */}
      <MobileMenu id={MENU_ID} open={menuOpen} onClose={closeMenu} />
    </>
  )
}
