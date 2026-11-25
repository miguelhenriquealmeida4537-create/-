import { combos, promotions } from '@/content/highlights'
import { categories, products } from '@/content/menu'
import type { Category, Combo, Product, Promotion } from '@/content/types'

/** Leitura do cardápio (futuro: Supabase). Componentes não importam content/ direto. */

export interface MenuSection {
  category: Category
  products: Product[]
}

export function getMenu(): MenuSection[] {
  return [...categories]
    .sort((a, b) => a.order - b.order)
    .map((category) => ({
      category,
      products: products.filter((p) => p.categoryId === category.id),
    }))
    .filter((s) => s.products.length > 0)
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller && p.available)
}

export function getCombos(): Combo[] {
  return combos.filter((c) => c.available)
}

/** Promoções vigentes na data (inclusive nas pontas), no fuso de Brasília. */
export function getActivePromotions(now = new Date()): Promotion[] {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(now)
  return promotions.filter((p) => p.validFrom <= today && today <= p.validUntil)
}
