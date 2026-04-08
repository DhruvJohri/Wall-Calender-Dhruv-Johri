export interface DateRange {
  start: Date | null
  end: Date | null
}

export type CalendarDirection = 'left' | 'right'

export interface DayInfo {
  date: Date
  dayOfMonth: number
  isCurrentMonth: boolean
  isToday: boolean
  isWeekend: boolean
}

export interface Note {
  id: string
  text: string
  rangeStart: string | null
  rangeEnd: string | null
  createdAt: string
}
