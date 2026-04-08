'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import { CalendarHeader } from '@/components/calendar/CalendarHeader'
import { DateGrid } from '@/components/calendar/DateGrid'
import { HeroImage } from '@/components/calendar/HeroImage'
import { NotesPanel } from '@/components/calendar/NotesPanel'
import { useCalendar } from '@/hooks/useCalendar'
import { useDateRange } from '@/hooks/useDateRange'
import { useNotes } from '@/hooks/useNotes'
import { compareDates, noteIncludesDate } from '@/lib/dateUtils'

export function CalendarPage() {
  const { currentDate, days, direction, today, goToNextMonth, goToPrevMonth, goToToday } = useCalendar()
  const { selectedRange, handleDayClick, clearRange, isStart, isEnd, isInRange } = useDateRange()
  const { notes, addNote, deleteNote } = useNotes()
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [pulseToday, setPulseToday] = useState(false)

  useEffect(() => {
    setHoveredDate(null)
  }, [currentDate, selectedRange.end, selectedRange.start])

  useEffect(() => {
    if (!pulseToday) {
      return
    }

    const timeout = window.setTimeout(() => setPulseToday(false), 1000)

    return () => window.clearTimeout(timeout)
  }, [pulseToday])

  const noteCountLookup = useMemo(() => {
    const entries = new Map<string, number>()

    days.forEach((day) => {
      const count = notes.reduce((total, note) => total + (noteIncludesDate(note, day.date) ? 1 : 0), 0)
      entries.set(day.date.toDateString(), count)
    })

    return entries
  }, [days, notes])

  function isPreviewInRange(date: Date): boolean {
    if (!selectedRange.start || selectedRange.end || !hoveredDate) {
      return false
    }

    const startDate = compareDates(selectedRange.start, hoveredDate) <= 0 ? selectedRange.start : hoveredDate
    const endDate = compareDates(selectedRange.start, hoveredDate) <= 0 ? hoveredDate : selectedRange.start
    const fromStart = compareDates(date, startDate)
    const toEnd = compareDates(date, endDate)

    return fromStart > 0 && toEnd <= 0
  }

  function handleTodayClick() {
    goToToday()
    setPulseToday(true)
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-[var(--cal-bg)] shadow-[var(--cal-shadow)]"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key={currentDate.toISOString()}
            transition={{ duration: 0.4 }}
          >
            <HeroImage month={currentDate.getMonth()} year={currentDate.getFullYear()} />
          </motion.div>
        </AnimatePresence>
        <CalendarHeader onNextMonth={goToNextMonth} onPrevMonth={goToPrevMonth} onToday={handleTodayClick} />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-[220px_minmax(0,1fr)]">
        <DateGrid
          currentDate={currentDate}
          days={days}
          direction={direction}
          getNoteCountForDay={(date) => noteCountLookup.get(date.toDateString()) ?? 0}
          isEnd={isEnd}
          isInRange={isInRange}
          isPreviewInRange={isPreviewInRange}
          isStart={isStart}
          onClearRange={clearRange}
          onDayClick={(date) => {
            handleDayClick(date)
            setHoveredDate(null)
          }}
          onHoverDay={(date) => {
            if (selectedRange.start && !selectedRange.end) {
              setHoveredDate(date)
              return
            }

            setHoveredDate(null)
          }}
          pulseToday={pulseToday}
          selectedRange={selectedRange}
          today={today}
        />
        <NotesPanel
          notes={notes}
          onAddNote={(text) => addNote(text, selectedRange)}
          onDeleteNote={deleteNote}
          selectedRange={selectedRange}
        />
      </div>
    </motion.div>
  )
}
