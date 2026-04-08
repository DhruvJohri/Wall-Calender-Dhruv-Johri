'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Tooltip } from '@/components/ui/Tooltip'

interface CalendarHeaderProps {
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

export function CalendarHeader({ onPrevMonth, onNextMonth, onToday }: CalendarHeaderProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-3 pt-4 md:px-5 md:pt-5">
      <Tooltip content="Previous month">
        <button
          aria-label="Go to previous month"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-slate-950/55 text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-950/72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          onClick={onPrevMonth}
          type="button"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
      </Tooltip>
      <Tooltip content="Jump to current month">
        <button
          aria-label="Jump to today"
          className="pointer-events-auto rounded-full border border-white/45 bg-slate-950/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-950/72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          onClick={onToday}
          type="button"
        >
          Today
        </button>
      </Tooltip>
      <Tooltip content="Next month">
        <button
          aria-label="Go to next month"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-slate-950/55 text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-950/72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          onClick={onNextMonth}
          type="button"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </Tooltip>
    </div>
  )
}
