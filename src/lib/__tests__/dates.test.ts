import { describe, expect, it } from 'vitest'
import { daysBetween, formatDateBR, isWithin, todayISO, validityLabel } from '@/lib/dates'

describe('dates', () => {
  it('"hoje" segue o fuso de Brasília, não o UTC', () => {
    expect(todayISO(new Date('2026-11-26T02:30:00Z'))).toBe('2026-11-25')
    expect(todayISO(new Date('2026-11-26T03:00:00Z'))).toBe('2026-11-26')
  })
  it('diferença em dias, inclusive na virada do ano', () => {
    expect(daysBetween('2026-11-25', '2026-12-01')).toBe(6)
    expect(daysBetween('2026-12-31', '2027-01-01')).toBe(1)
    expect(daysBetween('2026-11-25', '2026-11-24')).toBe(-1)
  })
  it('formata datas', () => {
    expect(formatDateBR('2026-12-05')).toBe('05/12/2026')
    expect(formatDateBR('2026-12-05', true)).toBe('05/12')
  })
  it('vigência inclui o primeiro e o último dia', () => {
    expect(isWithin('2026-11-20', '2026-11-25', '2026-11-25')).toBe(true)
    expect(isWithin('2026-11-25', '2026-11-30', '2026-11-25')).toBe(true)
    expect(isWithin('2026-11-01', '2026-11-24', '2026-11-25')).toBe(false)
    expect(isWithin('2026-11-26', '2026-12-10', '2026-11-25')).toBe(false)
  })
  it('rótulos de validade', () => {
    expect(validityLabel('2026-11-25', '2026-11-25')).toBe('Termina hoje')
    expect(validityLabel('2026-11-26', '2026-11-25')).toBe('Termina amanhã')
    expect(validityLabel('2026-11-30', '2026-11-25')).toBe('Termina em 5 dias')
    expect(validityLabel('2026-12-20', '2026-11-25')).toBe('Válida até 20/12')
  })
})
