import { useRef, type KeyboardEvent } from 'react'
import type { MenuSection } from '@/services/menu'
import { cn } from '@/lib/cn'
import { tabId } from '@/sections/menu/menu-ids'

interface CategoryNavProps {
  sections: MenuSection[]
  activeId: string
  onChange: (id: string) => void
  panelId: string
}

/**
 * Abas de categorias (padrão WAI-ARIA Tabs, ativação automática).
 * Teclado: ← → navegam, Home/End vão às pontas; só a aba ativa entra no Tab.
 * Fica fixa abaixo do Header enquanto o cardápio está na tela; no celular, rola na horizontal.
 */
export function CategoryNav({ sections, activeId, onChange, panelId }: CategoryNavProps) {
  const listRef = useRef<HTMLDivElement>(null)

  const focusTab = (index: number) => {
    const n = sections.length
    const target = sections[(index + n) % n]
    if (!target) return
    onChange(target.category.id)
    const el = listRef.current?.querySelector<HTMLButtonElement>(`#${tabId(target.category.id)}`)
    el?.focus()
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const map: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: sections.length - 1,
    }
    const next = map[e.key]
    if (next === undefined) return
    e.preventDefault()
    focusTab(next)
  }

  return (
    <div className="sticky top-16 z-30 -mx-gutter border-b border-border bg-surface/90 px-gutter backdrop-blur-md">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Categorias do cardápio"
        className="-mx-1 flex snap-x [scrollbar-width:none] gap-2 overflow-x-auto px-1 py-3 [&::-webkit-scrollbar]:hidden"
      >
        {sections.map(({ category, products }, i) => {
          const selected = category.id === activeId
          return (
            <button
              key={category.id}
              id={tabId(category.id)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(category.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-5 text-small font-medium whitespace-nowrap transition-colors duration-(--duration-fast)',
                selected
                  ? 'border-brand-white bg-brand-white text-brand-black'
                  : 'border-border-strong text-foreground-muted hover:border-brand-white/70 hover:text-foreground',
              )}
            >
              {category.name}
              <span
                className={cn(
                  'text-caption tabular-nums',
                  selected ? 'text-brand-black/60' : 'text-foreground-subtle',
                )}
              >
                {products.length}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
