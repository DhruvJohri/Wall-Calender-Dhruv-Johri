'use client'

import { useMemo, useState } from 'react'

import { addDays, addMonths, isSameDay, isSameMonth, normalizeDate, startOfMonth } from '@/lib/dateUtils'
import type { CalendarDirection, DayInfo } from '@/types'

export function useCalendar() {
  const today = normalizeDate(new Date())
  const [currentDate, setCurrentDate] = useState<Date>(startOfMonth(today))
  const [direction, setDirection] = useState<CalendarDirection>('right')

  const days = useMemo<DayInfo[]>(() => {
    const firstDay = startOfMonth(currentDate)
    const mondayOffset = (firstDay.getDay() + 6) % 7
    const gridStart = addDays(firstDay, -mondayOffset)

    return Array.from({ length: 42 }, (_, index) => {
      const date = addDays(gridStart, index)

      return {
        date,
        dayOfMonth: date.getDate(),
        isCurrentMonth: isSameMonth(date, currentDate),
        isToday: isSameDay(date, today),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
      }
    })
  }, [currentDate, today])

  function goToPrevMonth() {
    setDirection('left')
    setCurrentDate((value) => addMonths(value, -1))
  }

  function goToNextMonth() {
    setDirection('right')
    setCurrentDate((value) => addMonths(value, 1))
  }

  function goToToday() {
    const target = startOfMonth(today)
    const nextDirection: CalendarDirection = target.getTime() >= currentDate.getTime() ? 'right' : 'left'

    setDirection(nextDirection)
    setCurrentDate(target)
  }

  return {
    currentDate,
    days,
    direction,
    today,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  }
}
