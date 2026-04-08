'use client'

import { useReducer } from 'react'

import { compareDates, isBetweenExclusive, isSameDay, normalizeDate } from '@/lib/dateUtils'
import type { DateRange } from '@/types'

type RangeAction =
  | { type: 'select'; date: Date }
  | { type: 'clear' }

function reducer(state: DateRange, action: RangeAction): DateRange {
  if (action.type === 'clear') {
    return { start: null, end: null }
  }

  const date = normalizeDate(action.date)

  if (!state.start) {
    return { start: date, end: null }
  }

  if (!state.end) {
    if (compareDates(date, state.start) < 0) {
      return { start: date, end: null }
    }

    return { start: state.start, end: date }
  }

  return { start: date, end: null }
}

export function useDateRange() {
  const [selectedRange, dispatch] = useReducer(reducer, { start: null, end: null })

  function handleDayClick(date: Date) {
    dispatch({ type: 'select', date })
  }

  function clearRange() {
    dispatch({ type: 'clear' })
  }

  function isStart(date: Date): boolean {
    return isSameDay(selectedRange.start, date)
  }

  function isEnd(date: Date): boolean {
    return isSameDay(selectedRange.end, date)
  }

  function isInRange(date: Date): boolean {
    return isBetweenExclusive(date, selectedRange.start, selectedRange.end)
  }

  return {
    selectedRange,
    handleDayClick,
    clearRange,
    isStart,
    isEnd,
    isInRange,
  }
}
