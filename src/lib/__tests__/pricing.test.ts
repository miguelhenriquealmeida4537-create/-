import { describe, expect, it } from 'vitest'
import type { Product } from '@/content/types'
import {
  computePrice,
  initialSelection,
  missingGroups,
  startingPrice,
  toggleChoice,
} from '@/lib/pricing'

// Produto FICTÍCIO usado apenas neste teste
const product: Product = {
  id: 't',
  categoryId: 'c',
  name: 'Teste',
  available: true,
  prices: [
    { id: 'p', label: 'Pequena', amountCents: 3000 },
    { id: 'g', label: 'Grande', amountCents: 5000 },
  ],
  optionGroups: [
    {
      id: 'borda',
      label: 'Borda',
      type: 'single',
      required: true,
      choices: [
        { id: 'sem', label: 'Sem borda', priceDeltaCents: 0 },
        { id: 'b1', label: 'Borda A', priceDeltaCents: 500, priceDeltaBySize: { g: 800 } },
      ],
    },
    {
      id: 'add',
      label: 'Adicionais',
      type: 'multiple',
      required: false,
      max: 2,
      choices: [
        { id: 'a1', label: 'A1', priceDeltaCents: 300 },
        { id: 'a2', label: 'A2', priceDeltaCents: 400 },
        { id: 'a3', label: 'A3', priceDeltaCents: 200 },
      ],
    },
  ],
}
const [borda, add] = product.optionGroups!

describe('pricing', () => {
  it('seleção inicial: primeiro tamanho e primeira opção obrigatória', () => {
    const s = initialSelection(product)
    expect(s.sizeId).toBe('p')
    expect(s.choices.borda).toEqual(['sem'])
    expect(computePrice(product, s).totalCents).toBe(3000)
  })

  it('soma borda com preço por tamanho', () => {
    let s = toggleChoice(initialSelection(product), borda!, 'b1')
    expect(computePrice(product, s).totalCents).toBe(3500)
    s = { ...s, sizeId: 'g' }
    expect(computePrice(product, s).totalCents).toBe(5800)
  })

  it('grupo obrigatório nunca fica vazio', () => {
    const s = toggleChoice(toggleChoice(initialSelection(product), borda!, 'b1'), borda!, 'b1')
    expect(s.choices.borda).toEqual(['b1'])
  })

  it('respeita o limite de adicionais e permite desmarcar', () => {
    let s = initialSelection(product)
    s = toggleChoice(toggleChoice(s, add!, 'a1'), add!, 'a2')
    expect(toggleChoice(s, add!, 'a3').choices.add).toEqual(['a1', 'a2'])
    expect(computePrice(product, s).totalCents).toBe(3000 + 300 + 400)
    expect(toggleChoice(s, add!, 'a1').choices.add).toEqual(['a2'])
  })

  it('"a partir de" = menor tamanho', () => {
    expect(startingPrice(product)).toBe(3000)
  })

  it('detecta grupo obrigatório vazio', () => {
    expect(missingGroups(product, { sizeId: 'p', choices: { borda: [], add: [] } })).toHaveLength(1)
  })
})
