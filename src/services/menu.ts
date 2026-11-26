import { combos, promotions } from '@/content/highlights'
import { categories, products } from '@/content/menu'
import type { Category, Combo, Product, Promotion } from '@/content/types'
import { buildDemoMenu } from '@/dev/demo-menu'
import { isWithin, todayISO } from '@/lib/dates'

/** Leitura do cardápio e dos destaques (futuro: Supabase). Componentes não importam content/. */

export interface MenuSection {
  category: Category
  products: Product[]
}

export interface MenuData {
  sections: MenuSection[]
  /** true = dados de TESTE (src/dev/demo-menu.ts); a interface deve sinalizar. */
  isDemo: boolean
}

/*
 * __SHOW_DEMO_CONTENT__ é uma constante de build (vite.config.ts): sem a flag,
 * a condição vira `false` e os dados de teste ficam FORA do bundle de produção.
 * Os dados de teste só entram se o cardápio oficial estiver vazio.
 */
const useDemo = __SHOW_DEMO_CONTENT__ && products.length === 0

const source = useDemo ? buildDemoMenu() : { categories, products, combos, promotions }

export function getMenu(): MenuData {
  return {
    isDemo: useDemo,
    sections: [...source.categories]
      .sort((a, b) => a.order - b.order)
      .map((category) => ({
        category,
        products: source.products.filter((p) => p.categoryId === category.id),
      }))
      .filter((s) => s.products.length > 0),
  }
}

export function getProductById(id: Product['id']): Product | undefined {
  return source.products.find((p) => p.id === id)
}

/** Um item de combo já resolvido para o produto do cardápio, quando houver vínculo. */
export interface ComboItemResolved {
  label: string
  quantity: number
  product?: Product
}

export interface HighlightsData {
  bestSellers: Product[]
  combos: (Combo & { resolvedItems: ComboItemResolved[] })[]
  /** Somente promoções vigentes hoje (fuso de Brasília) */
  promotions: Promotion[]
  today: string
  isDemo: boolean
}

/**
 * Destaques: mais vendidos (marcados no cardápio), combos disponíveis e
 * promoções vigentes. Promoções vencidas ou futuras nunca são retornadas;
 * com `now` null (build), nenhuma promoção é retornada — a validade é sempre
 * decidida no navegador, na data real do visitante.
 */
export function getHighlights(now: Date | null): HighlightsData {
  // Sem "agora" (pré-renderização/hidratação), promoções não são decididas
  const today = now ? todayISO(now) : ''
  return {
    isDemo: useDemo,
    today,
    bestSellers: source.products.filter((p) => p.bestSeller && p.available),
    combos: source.combos
      .filter((c) => c.available)
      .map((c) => ({
        ...c,
        resolvedItems: c.items.map((item) => ({
          label: item.label,
          quantity: item.quantity,
          product: item.productId ? getProductById(item.productId) : undefined,
        })),
      })),
    promotions: (now ? source.promotions : [])
      .filter((p) => isWithin(p.validFrom, p.validUntil, today))
      .sort((a, b) => a.validUntil.localeCompare(b.validUntil)),
  }
}

/** Promoções vigentes (atalho mantido por compatibilidade). */
export function getActivePromotions(now: Date): Promotion[] {
  return getHighlights(now).promotions
}
