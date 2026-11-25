import { combos, promotions } from '@/content/highlights'
import { categories, products } from '@/content/menu'
import type { Category, Combo, Product, Promotion } from '@/content/types'
import { buildDemoMenu } from '@/dev/demo-menu'

/** Leitura do cardápio (futuro: Supabase). Componentes não importam content/ direto. */

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
 */
const useDemo = __SHOW_DEMO_CONTENT__ && products.length === 0

const source = useDemo ? buildDemoMenu() : { categories, products }
const sourceCategories = source.categories
const sourceProducts = source.products

export function getMenu(): MenuData {
  return {
    isDemo: useDemo,
    sections: [...sourceCategories]
      .sort((a, b) => a.order - b.order)
      .map((category) => ({
        category,
        products: sourceProducts.filter((p) => p.categoryId === category.id),
      }))
      .filter((s) => s.products.length > 0),
  }
}

/** Mais vendidos: apenas do cardápio OFICIAL (nunca de dados de teste). */
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
