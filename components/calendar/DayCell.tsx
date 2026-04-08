'use client'

import type { KeyboardEvent } from 'react'

import { formatAccessibleDate } from '@/lib/dateUtils'
import type { DayInfo } from '@/types'

interface DayCellProps {
  cellRef: (node: HTMLDivElement | null) => void
  day: DayInfo
  isCurrentMonth: boolean
  isEnd: boolean
  isInRange: boolean
  isPreviewRange: boolean
  isStart: boolean
  isToday: boolean
  noteCount: number
  pulseToday: boolean
  tabIndex: number
  onClick: () => void
  onHover: (date: Date | null) => void
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
}

export function DayCell({
  cellRef,
  day,
  isCurrentMonth,
  isEnd,
  isInRange,
  isPreviewRange,
  isStart,
  isToday,
  noteCount,
  pulseToday,
  tabIndex,
  onClick,
  onHover,
  onKeyDown,
}: DayCellProps) {
  const isSingleDay = isStart && isEnd
  const isSelectedEdge = (isStart || isEnd) && !isSingleDay

  const containerClasses = [
    'group relative h-10 w-full select-none transition-all duration-150',
    isCurrentMonth ? 'cursor-pointer' : 'pointer-events-none cursor-default',
    isInRange ? 'bg-[var(--cal-range-bg)]' : '',
    !isInRange && isPreviewRange ? 'bg-[var(--cal-accent-2)]' : '',
    isStart && !isSingleDay ? 'rounded-l-full bg-[var(--cal-start-bg)]' : '',
    isEnd && !isSingleDay ? 'rounded-r-full bg-[var(--cal-end-bg)]' : '',
  ].join(' ')

  const innerClasses = [
    'relative z-10 flex h-9 w-9 items-center justify-center text-sm font-medium transition-all duration-150',
    isSingleDay ? 'rounded-full bg-[var(--cal-start-bg)] text-white' : '',
    isSelectedEdge ? 'text-white' : '',
    !isSingleDay && !isSelectedEdge && day.isWeekend ? 'text-[var(--cal-weekend)]' : 'text-[var(--cal-text)]',
    !isCurrentMonth ? 'text-gray-300' : '',
    isCurrentMonth && !isInRange && !isPreviewRange && !isSelectedEdge && !isSingleDay ? 'group-hover:rounded-full group-hover:bg-gray-100' : '',
    isToday ? 'ring-2 ring-[var(--cal-today)] ring-offset-1' : '',
    isToday && pulseToday ? 'animate-pulse' : '',
  ].join(' ')

  return (
    <div
      aria-label={formatAccessibleDate(day.date)}
      aria-pressed={isStart || isEnd || isInRange}
      className={containerClasses}
      onClick={() => {
        if (isCurrentMonth) {
          onClick()
        }
      }}
      onFocus={() => onHover(day.date)}
      onKeyDown={onKeyDown}
      onMouseEnter={() => onHover(day.date)}
      onMouseLeave={() => onHover(null)}
      ref={cellRef}
      role="button"
      tabIndex={tabIndex}
      title={formatAccessibleDate(day.date)}
    >
      <div className="flex h-full w-full items-center justify-center">
        <span className={innerClasses}>{day.dayOfMonth}</span>
      </div>
      {noteCount > 0 && isCurrentMonth ? (
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--cal-accent)]"
        />
      ) : null}
    </div>
  )
}
