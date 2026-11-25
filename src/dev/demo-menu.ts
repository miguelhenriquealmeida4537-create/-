/**
 * ⚠️ CONTEÚDO DE TESTE — NÃO É O CARDÁPIO DA CASA DA PIZZA.
 *
 * Dados estritamente demonstrativos para validar layout, opções e cálculo de preço.
 * Nomes, descrições e valores são propositalmente genéricos e NÃO representam
 * produtos ou preços reais. Só são exibidos quando:
 *   1) o cardápio oficial (src/content/menu.ts) está vazio, E
 *   2) VITE_SHOW_DEMO_CONTENT=true ou o projeto roda em modo de desenvolvimento.
 * Remover este arquivo quando o cardápio oficial for cadastrado.
 */
import type { Category, Combo, OptionGroup, PriceOption, Product, Promotion } from '@/content/types'
import { todayISO } from '@/lib/dates'

const DESC = 'Texto de exemplo para validar o layout. Não é um produto real.'

const sizes = (base: number): PriceOption[] => [
  { id: 'p', label: 'Pequena (teste)', detail: 'Tamanho de exemplo', amountCents: base },
  { id: 'm', label: 'Média (teste)', detail: 'Tamanho de exemplo', amountCents: base + 1000 },
  { id: 'g', label: 'Grande (teste)', detail: 'Tamanho de exemplo', amountCents: base + 2000 },
]

const crust: OptionGroup = {
  id: 'borda',
  label: 'Borda',
  type: 'single',
  required: true,
  choices: [
    { id: 'sem-borda', label: 'Sem borda', priceDeltaCents: 0 },
    {
      id: 'borda-teste-a',
      label: 'Borda de teste A',
      priceDeltaCents: 500,
      priceDeltaBySize: { p: 500, m: 700, g: 900 },
    },
    { id: 'borda-teste-b', label: 'Borda de teste B', priceDeltaCents: 800 },
  ],
}

const extras: OptionGroup = {
  id: 'adicionais',
  label: 'Adicionais',
  type: 'multiple',
  required: false,
  max: 3,
  choices: [
    { id: 'adicional-1', label: 'Adicional de teste 1', priceDeltaCents: 300 },
    { id: 'adicional-2', label: 'Adicional de teste 2', priceDeltaCents: 400 },
    { id: 'adicional-3', label: 'Adicional de teste 3', priceDeltaCents: 500 },
    { id: 'adicional-4', label: 'Adicional de teste 4', priceDeltaCents: 600 },
  ],
}

const categories: Category[] = [
  { id: 'teste-salgadas', name: 'Salgadas (teste)', order: 1 },
  { id: 'teste-doces', name: 'Doces (teste)', order: 2 },
  { id: 'teste-bebidas', name: 'Bebidas (teste)', order: 3 },
]

const pizza = (n: number, categoryId: string, base: number, extra?: Partial<Product>): Product => ({
  id: `pizza-teste-${categoryId}-${n}`,
  categoryId,
  name: `Pizza de teste ${n}`,
  description: DESC,
  ingredients: ['Ingrediente de exemplo', 'Ingrediente de exemplo', 'Ingrediente de exemplo'],
  prices: sizes(base),
  optionGroups: [crust, extras],
  available: true,
  ...extra,
})

/**
 * Monta os dados de teste sob demanda. Ser uma função (e não constantes no topo do
 * módulo) permite ao build eliminar este arquivo inteiro quando o conteúdo de
 * teste está desligado.
 */
export interface DemoMenu {
  categories: Category[]
  products: Product[]
  combos: Combo[]
  promotions: Promotion[]
}

/** Data ISO deslocada N dias a partir de hoje (as promoções de teste "andam" com o calendário). */
const shiftDays = (today: string, n: number) => {
  const d = new Date(`${today}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

export function buildDemoMenu(now: Date = new Date()): DemoMenu {
  const products: Product[] = [
    pizza(1, 'teste-salgadas', 3000, { bestSeller: true }),
    pizza(2, 'teste-salgadas', 3200, { tags: ['vegetariano'] }),
    pizza(3, 'teste-salgadas', 3400, { bestSeller: true }),
    pizza(4, 'teste-salgadas', 3600, { tags: ['picante'] }),
    pizza(5, 'teste-salgadas', 3800),
    pizza(6, 'teste-salgadas', 4000, { available: false }),
    pizza(1, 'teste-doces', 3000, { optionGroups: [extras], bestSeller: true }),
    pizza(2, 'teste-doces', 3200, { optionGroups: [extras] }),
    {
      id: 'bebida-teste-1',
      categoryId: 'teste-bebidas',
      name: 'Bebida de teste 1',
      description: DESC,
      prices: [{ amountCents: 1000 }],
      available: true,
    },
    {
      id: 'bebida-teste-2',
      categoryId: 'teste-bebidas',
      name: 'Bebida de teste 2',
      description: DESC,
      prices: [
        { id: 'lata', label: 'Lata (teste)', amountCents: 800 },
        { id: 'garrafa', label: 'Garrafa (teste)', amountCents: 1400 },
      ],
      available: true,
    },
  ]
  const today = todayISO(now)

  const combos: Combo[] = [
    {
      id: 'combo-teste-1',
      name: 'Combo de teste 1',
      description: 'Composição de exemplo para validar o layout. Não é um combo real.',
      items: [
        {
          productId: 'pizza-teste-teste-salgadas-1',
          label: 'Pizza de teste 1 (grande)',
          quantity: 1,
        },
        { productId: 'bebida-teste-2', label: 'Bebida de teste 2 (garrafa)', quantity: 1 },
      ],
      price: { amountCents: 6000 },
      serves: 'Serve 2 a 3 pessoas (exemplo)',
      available: true,
    },
    {
      id: 'combo-teste-2',
      name: 'Combo de teste 2',
      description: 'Composição de exemplo para validar o layout. Não é um combo real.',
      items: [
        {
          productId: 'pizza-teste-teste-salgadas-3',
          label: 'Pizza de teste 3 (grande)',
          quantity: 2,
        },
        {
          productId: 'pizza-teste-teste-doces-1',
          label: 'Pizza de teste 1 doce (média)',
          quantity: 1,
        },
        { productId: 'bebida-teste-1', label: 'Bebida de teste 1', quantity: 2 },
      ],
      price: { amountCents: 14000 },
      serves: 'Serve 5 a 6 pessoas (exemplo)',
      available: true,
    },
  ]

  const terms = 'Condições de exemplo para validar o layout. Não é uma oferta real.'
  const promotions: Promotion[] = [
    {
      id: 'promo-teste-a',
      title: 'Promoção de teste A',
      highlight: 'Chamada de exemplo',
      description: 'Descrição de exemplo de uma promoção. Conteúdo de teste.',
      terms,
      price: { amountCents: 4500 },
      productId: 'pizza-teste-teste-salgadas-1',
      validFrom: shiftDays(today, -2),
      validUntil: shiftDays(today, 5),
    },
    {
      id: 'promo-teste-b',
      title: 'Promoção de teste B',
      description: 'Descrição de exemplo. Termina hoje para testar o rótulo de validade.',
      terms,
      validFrom: shiftDays(today, -7),
      validUntil: today,
    },
    {
      id: 'promo-teste-c',
      title: 'Promoção de teste C',
      description: 'Descrição de exemplo com validade longa.',
      terms,
      comboId: 'combo-teste-1',
      validFrom: shiftDays(today, -1),
      validUntil: shiftDays(today, 30),
    },
    // As duas abaixo NÃO devem aparecer: servem para provar o filtro de validade.
    {
      id: 'promo-teste-vencida',
      title: 'Promoção de teste VENCIDA',
      terms,
      validFrom: shiftDays(today, -20),
      validUntil: shiftDays(today, -1),
    },
    {
      id: 'promo-teste-futura',
      title: 'Promoção de teste FUTURA',
      terms,
      validFrom: shiftDays(today, 3),
      validUntil: shiftDays(today, 20),
    },
  ]

  return { categories, products, combos, promotions }
}
