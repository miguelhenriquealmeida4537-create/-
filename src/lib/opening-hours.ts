import type { OpeningHoursRange, Weekday } from '@/content/types'

/** Funções puras sobre horário de funcionamento (testáveis sem navegador). */

export const WEEKDAYS: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export const WEEKDAY_LABEL: Record<Weekday, string> = {
  mon: 'Segunda',
  tue: 'Terça',
  wed: 'Quarta',
  thu: 'Quinta',
  fri: 'Sexta',
  sat: 'Sábado',
  sun: 'Domingo',
}

const SHORT_TO_WEEKDAY: Record<string, Weekday> = {
  Mon: 'mon',
  Tue: 'tue',
  Wed: 'wed',
  Thu: 'thu',
  Fri: 'fri',
  Sat: 'sat',
  Sun: 'sun',
}

const toMinutes = (hhmm: string) => {
  const [h = 0, m = 0] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Dia da semana e minuto do dia num fuso específico (independe do fuso do aparelho). */
export function zonedNow(date: Date, timeZone: string): { day: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return {
    day: SHORT_TO_WEEKDAY[get('weekday')] ?? 'mon',
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

/**
 * Está aberto agora? Considera intervalos que passam da meia-noite
 * (ex.: sex 18:00–01:00 continua aberto às 00:30 de sábado).
 * Sem horários cadastrados, retorna null (desconhecido — não afirma nada).
 */
export function isOpenAt(
  ranges: OpeningHoursRange[],
  date: Date,
  timeZone: string,
): boolean | null {
  if (ranges.length === 0) return null
  const { day, minutes } = zonedNow(date, timeZone)
  const yesterday = WEEKDAYS[(WEEKDAYS.indexOf(day) + 6) % 7]!

  return ranges.some((r) => {
    const opens = toMinutes(r.opens)
    const closes = toMinutes(r.closes)
    const overnight = closes <= opens
    if (r.days.includes(day)) {
      if (!overnight && minutes >= opens && minutes < closes) return true
      if (overnight && minutes >= opens) return true
    }
    // madrugada: intervalo iniciado ontem que vai além da meia-noite
    return overnight && r.days.includes(yesterday) && minutes < closes
  })
}

/** Linhas para exibição: um item por dia, na ordem da semana. */
export function hoursByDay(
  ranges: OpeningHoursRange[],
): { day: Weekday; label: string; intervals: string[] }[] {
  return WEEKDAYS.map((day) => ({
    day,
    label: WEEKDAY_LABEL[day],
    intervals: ranges
      .filter((r) => r.days.includes(day))
      .sort((a, b) => toMinutes(a.opens) - toMinutes(b.opens))
      .map((r) => `${r.opens}–${r.closes}`),
  }))
}
