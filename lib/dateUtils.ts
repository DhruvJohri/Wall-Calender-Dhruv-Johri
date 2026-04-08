import type { DateRange, Note } from '@/types'

export function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12)
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12)
}

export function addDays(date: Date, amount: number): Date {
  const result = normalizeDate(date)
  result.setDate(result.getDate() + amount)
  return result
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1, 12)
}

export function isSameDay(left: Date | null, right: Date | null): boolean {
  if (!left || !right) {
    return false
  }

  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

export function isSameMonth(left: Date, right: Date): boolean {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth()
}

export function compareDates(left: Date, right: Date): number {
  const leftTime = normalizeDate(left).getTime()
  const rightTime = normalizeDate(right).getTime()

  if (leftTime === rightTime) {
    return 0
  }

  return leftTime > rightTime ? 1 : -1
}

export function isBetweenExclusive(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) {
    return false
  }

  const normalizedDate = normalizeDate(date).getTime()
  const startTime = normalizeDate(start).getTime()
  const endTime = normalizeDate(end).getTime()

  return normalizedDate > Math.min(startTime, endTime) && normalizedDate < Math.max(startTime, endTime)
}

export function isBetweenInclusive(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) {
    return false
  }

  const normalizedDate = normalizeDate(date).getTime()
  const startTime = normalizeDate(start).getTime()
  const endTime = normalizeDate(end).getTime()

  return normalizedDate >= Math.min(startTime, endTime) && normalizedDate <= Math.max(startTime, endTime)
}

export function toStorageISOString(date: Date): string {
  return normalizeDate(date).toISOString()
}

export function parseStoredDate(value: string | null): Date | null {
  if (!value) {
    return null
  }

  const parsed = new Date(value)

  return Number.isNaN(parsed.getTime()) ? null : normalizeDate(parsed)
}

export function formatAccessibleDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatRangeLabel(range: DateRange): string {
  if (!range.start) {
    return 'No dates selected'
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  })

  if (!range.end || isSameDay(range.start, range.end)) {
    return formatter.format(range.start)
  }

  return `${formatter.format(range.start)} - ${formatter.format(range.end)}`
}

export function formatNoteRangeLabel(start: string | null, end: string | null): string | null {
  const startDate = parseStoredDate(start)
  const endDate = parseStoredDate(end)

  if (!startDate) {
    return null
  }

  return formatRangeLabel({ start: startDate, end: endDate ?? startDate })
}

export function noteIncludesDate(note: Note, date: Date): boolean {
  const start = parseStoredDate(note.rangeStart)
  const end = parseStoredDate(note.rangeEnd) ?? start

  if (!start || !end) {
    return false
  }

  return isBetweenInclusive(date, start, end)
}
