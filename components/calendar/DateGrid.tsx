'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'

import { DayCell } from '@/components/calendar/DayCell'
import { WEEKDAYS } from '@/lib/constants'
import type { CalendarDirection, DateRange, DayInfo } from '@/types'

interface DateGridProps {
  currentDate: Date
  days: DayInfo[]
  direction: CalendarDirection
  getNoteCountForDay: (date: Date) => number
  isEnd: (date: Date) => boolean
  isInRange: (date: Date) => boolean
  isPreviewInRange: (date: Date) => boolean
  isStart: (date: Date) => boolean
  onClearRange: () => void
  onDayClick: (date: Date) => void
  onHoverDay: (date: Date | null) => void
  pulseToday: boolean
  selectedRange: DateRange
  today: Date
}

const variants = {
  enter: (dir: CalendarDirection) => ({ x: dir === 'right' ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: CalendarDirection) => ({ x: dir === 'right' ? -60 : 60, opacity: 0 }),
}

export function DateGrid({
  currentDate,
  days,
  direction,
  getNoteCountForDay,
  isEnd,
  isInRange,
  isPreviewInRange,
  isStart,
  onClearRange,
  onDayClick,
  onHoverDay,
  pulseToday,
  selectedRange,
  today,
}: DateGridProps) {
  const cellRefs = useRef<Array<HTMLDivElement | null>>([])

  function focusNext(startIndex: number, delta: number) {
    let nextIndex = startIndex + delta

    while (nextIndex >= 0 && nextIndex < days.length) {
      if (days[nextIndex]?.isCurrentMonth) {
        cellRefs.current[nextIndex]?.focus()
        return
      }

      nextIndex += delta
    }
  }

  function handleKeyDown(index: number, day: DayInfo) {
    return (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          focusNext(index, -1)
          break
        case 'ArrowRight':
          event.preventDefault()
          focusNext(index, 1)
          break
        case 'ArrowUp':
          event.preventDefault()
          focusNext(index, -7)
          break
        case 'ArrowDown':
          event.preventDefault()
          focusNext(index, 7)
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (day.isCurrentMonth) {
            onDayClick(day.date)
          }
          break
        case 'Escape':
          event.preventDefault()
          onClearRange()
          onHoverDay(null)
          break
        default:
          break
      }
    }
  }

  return (
    <section className="order-1 bg-[var(--cal-panel)] p-4 md:order-2 md:p-5">
      <div className="grid grid-cols-7 gap-y-2 border-b border-gray-100 pb-3">
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className={`text-center font-body text-[10px] font-semibold uppercase tracking-[0.15em] ${
              weekday === 'Sat' || weekday === 'Sun'
                ? 'text-[var(--cal-weekend)]'
                : 'text-[var(--cal-text-muted)]'
            }`}
            role="columnheader"
          >
            {weekday}
          </div>
        ))}
      </div>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          animate="center"
          className="grid grid-cols-7 gap-y-1 p-4"
          custom={direction}
          exit="exit"
          initial="enter"
          key={currentDate.toISOString()}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          variants={variants}
        >
          {days.map((day, index) => (
            <DayCell
              cellRef={(node) => {
                cellRefs.current[index] = node
              }}
              day={day}
              isCurrentMonth={day.isCurrentMonth}
              isEnd={isEnd(day.date)}
              isInRange={isInRange(day.date)}
              isPreviewRange={isPreviewInRange(day.date)}
              isStart={isStart(day.date)}
              isToday={day.date.getTime() === today.getTime()}
              key={day.date.toISOString()}
              noteCount={getNoteCountForDay(day.date)}
              onClick={() => onDayClick(day.date)}
              onHover={onHoverDay}
              onKeyDown={handleKeyDown(index, day)}
              pulseToday={pulseToday}
              tabIndex={day.isCurrentMonth ? 0 : -1}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">
        {selectedRange.start
          ? selectedRange.end
            ? `Selected range ${selectedRange.start.toDateString()} to ${selectedRange.end.toDateString()}`
            : `Selected start date ${selectedRange.start.toDateString()}`
          : 'No range selected'}
      </span>
    </section>
  )
}
