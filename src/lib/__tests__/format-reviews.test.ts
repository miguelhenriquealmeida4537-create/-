import { describe, expect, it } from 'vitest'
import type { Review } from '@/content/types'
import { formatPhoneBR, formatPrice, telHref, whatsappHref } from '@/lib/format'
import { formatLongDateBR, formatRating, formatReviewCount, sortReviews } from '@/lib/reviews'

describe('format', () => {
  it('preço em reais', () => {
    expect(formatPrice(4590).replace(/\s/g, ' ')).toBe('R$ 45,90')
  })
  it('telefones brasileiros e links', () => {
    expect(formatPhoneBR('5511987654321')).toBe('(11) 98765-4321')
    expect(formatPhoneBR('1132345678')).toBe('(11) 3234-5678')
    expect(telHref('5511987654321')).toBe('tel:+5511987654321')
    expect(whatsappHref('55 11 98765-4321', 'Olá')).toBe(
      'https://wa.me/5511987654321?text=Ol%C3%A1',
    )
  })
})

describe('reviews', () => {
  const r = (id: string, date?: string): Review => ({
    id,
    author: id,
    rating: 5,
    text: '',
    date,
    source: { name: 'x' },
  })
  it('mais recentes primeiro; sem data no fim, na ordem original', () => {
    const ids = sortReviews([
      r('a', '2026-01-02'),
      r('b'),
      r('c', '2026-03-01'),
      r('d'),
      r('e', '2026-01-02'),
    ]).map((x) => x.id)
    expect(ids).toEqual(['c', 'a', 'e', 'b', 'd'])
  })
  it('formatação de nota, total e data', () => {
    expect(formatRating(4.8)).toBe('4,8')
    expect(formatRating(5)).toBe('5,0')
    expect(formatReviewCount(1)).toBe('1 avaliação')
    expect(formatReviewCount(1520)).toBe('1.520 avaliações')
    expect(formatLongDateBR('2026-03-14')).toBe('14 de março de 2026')
  })
})
