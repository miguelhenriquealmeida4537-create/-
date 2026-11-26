import { describe, expect, it } from 'vitest'
import type { OpeningHoursRange } from '@/content/types'
import { hoursByDay, isOpenAt } from '@/lib/opening-hours'

const tz = 'America/Sao_Paulo'
// Horários FICTÍCIOS, só para o teste: ter/qua/qui/dom 18–23:30; sex/sáb 18–01:00
const ranges: OpeningHoursRange[] = [
  { days: ['tue', 'wed', 'thu', 'sun'], opens: '18:00', closes: '23:30' },
  { days: ['fri', 'sat'], opens: '18:00', closes: '01:00' },
]
const at = (iso: string) => isOpenAt(ranges, new Date(iso), tz)

describe('opening hours', () => {
  it.each([
    ['2026-11-24T21:00:00Z', true, 'terça 18:00 abre'],
    ['2026-11-24T20:59:00Z', false, 'terça 17:59 fechado'],
    ['2026-11-25T02:29:00Z', true, 'terça 23:29 aberto'],
    ['2026-11-25T02:30:00Z', false, 'terça 23:30 fecha'],
    ['2026-11-28T03:30:00Z', true, 'sexta→sábado 00:30 ainda aberto'],
    ['2026-11-28T04:00:00Z', false, 'sábado 01:00 fechou'],
    ['2026-11-23T22:00:00Z', false, 'segunda sem expediente'],
    ['2026-11-24T03:30:00Z', false, 'domingo não passa da meia-noite'],
  ])('%s → %s (%s)', (iso, expected) => {
    expect(at(iso)).toBe(expected)
  })
  it('sem horários cadastrados não afirma aberto nem fechado', () => {
    expect(isOpenAt([], new Date(), tz)).toBeNull()
  })
  it('agrupa por dia', () => {
    expect(hoursByDay(ranges).find((d) => d.day === 'fri')?.intervals).toEqual(['18:00–01:00'])
  })
})
