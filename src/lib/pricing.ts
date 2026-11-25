import type { OptionChoice, OptionGroup, PriceOption, Product } from '@/content/types'

/**
 * Cálculo de preço do produto conforme as opções escolhidas.
 * Funções puras (sem React, sem DOM) — testáveis isoladamente.
 * Valores sempre em centavos.
 */

/** Seleção do cliente: tamanho + escolhas por grupo. */
export interface ProductSelection {
  sizeId: string | null
  /** groupId → ids das escolhas marcadas */
  choices: Record<string, string[]>
}

export interface PriceLine {
  label: string
  amountCents: number
}

export interface PriceBreakdown {
  totalCents: number
  lines: PriceLine[]
}

/** Id estável de um tamanho (usa o índice quando o id não foi informado). */
export const sizeKey = (size: PriceOption, index: number) => size.id ?? `tamanho-${index}`

/** Menor preço entre os tamanhos — para "a partir de". */
export function startingPrice(product: Product): number {
  return Math.min(...product.prices.map((p) => p.amountCents))
}

/** Acréscimo de uma escolha, considerando o preço por tamanho quando houver. */
export function choiceDelta(choice: OptionChoice, sizeId: string | null): number {
  if (sizeId && choice.priceDeltaBySize?.[sizeId] !== undefined) {
    return choice.priceDeltaBySize[sizeId]
  }
  return choice.priceDeltaCents
}

/** Seleção inicial: primeiro tamanho e primeira opção dos grupos obrigatórios. */
export function initialSelection(product: Product): ProductSelection {
  const first = product.prices[0]
  return {
    sizeId: first ? sizeKey(first, 0) : null,
    choices: Object.fromEntries(
      (product.optionGroups ?? []).map((g) => {
        const firstAvailable = g.choices.find((c) => c.available !== false)
        return [
          g.id,
          g.type === 'single' && g.required && firstAvailable ? [firstAvailable.id] : [],
        ]
      }),
    ),
  }
}

/** Marca/desmarca uma escolha respeitando o tipo e o limite do grupo. */
export function toggleChoice(
  selection: ProductSelection,
  group: OptionGroup,
  choiceId: string,
): ProductSelection {
  const current = selection.choices[group.id] ?? []
  let next: string[]
  if (group.type === 'single') {
    next = current.includes(choiceId) && !group.required ? [] : [choiceId]
  } else if (current.includes(choiceId)) {
    next = current.filter((id) => id !== choiceId)
  } else {
    if (group.max !== undefined && current.length >= group.max) return selection
    next = [...current, choiceId]
  }
  return { ...selection, choices: { ...selection.choices, [group.id]: next } }
}

/** Preço total com o detalhamento por linha. */
export function computePrice(product: Product, selection: ProductSelection): PriceBreakdown {
  const sizeIndex = product.prices.findIndex((p, i) => sizeKey(p, i) === selection.sizeId)
  const size = product.prices[sizeIndex] ?? product.prices[0]
  const lines: PriceLine[] = []

  if (size) {
    lines.push({ label: size.label ?? product.name, amountCents: size.amountCents })
  }

  for (const group of product.optionGroups ?? []) {
    for (const id of selection.choices[group.id] ?? []) {
      const choice = group.choices.find((c) => c.id === id)
      if (!choice) continue
      const delta = choiceDelta(choice, selection.sizeId)
      if (delta !== 0) lines.push({ label: choice.label, amountCents: delta })
    }
  }

  return { totalCents: lines.reduce((sum, l) => sum + l.amountCents, 0), lines }
}

/** Grupos que ainda não atendem ao mínimo exigido. */
export function missingGroups(product: Product, selection: ProductSelection): OptionGroup[] {
  return (product.optionGroups ?? []).filter((g) => {
    const count = selection.choices[g.id]?.length ?? 0
    const min = g.min ?? (g.required ? 1 : 0)
    return count < min
  })
}
