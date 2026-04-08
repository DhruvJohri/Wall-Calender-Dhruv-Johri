'use client'

import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { NoteItem } from '@/components/calendar/NoteItem'
import { formatRangeLabel } from '@/lib/dateUtils'
import type { DateRange, Note } from '@/types'

interface NotesPanelProps {
  notes: Note[]
  onAddNote: (text: string) => void
  onDeleteNote: (id: string) => void
  selectedRange: DateRange
}

export function NotesPanel({ notes, onAddNote, onDeleteNote, selectedRange }: NotesPanelProps) {
  const [draft, setDraft] = useState('')

  function handleAddNote() {
    if (!draft.trim()) {
      return
    }

    onAddNote(draft)
    setDraft('')
  }

  return (
    <aside className="order-2 flex min-h-[280px] w-full flex-col gap-3 border-t border-gray-200 bg-[var(--cal-notes-bg)] p-4 md:order-1 md:w-56 md:border-r md:border-t-0">
      <h3 className="font-display text-lg italic text-gray-400">Notes</h3>
      {selectedRange.start ? (
        <div className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-[var(--cal-text-muted)] shadow-sm">
          Selected: {formatRangeLabel(selectedRange)}
        </div>
      ) : (
        <div className="rounded-full border border-dashed border-gray-200 px-3 py-1 text-[11px] text-gray-400">
          Add a general note or select dates first
        </div>
      )}
      <textarea
        aria-label="Add note"
        className="h-24 w-full resize-none rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--cal-accent)]"
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Add a note..."
        value={draft}
      />
      <div className="flex items-center justify-between gap-3">
        <button
          aria-label="Add note"
          className="rounded-md bg-[var(--cal-accent)] px-3 py-1 text-xs text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!draft.trim()}
          onClick={handleAddNote}
          type="button"
        >
          + Add
        </button>
        <span className="text-[10px] uppercase tracking-[0.14em] text-gray-400">{notes.length} saved</span>
      </div>
      <div className="notes-scroll mt-2 flex max-h-48 flex-col gap-2 overflow-y-auto">
        <AnimatePresence initial={false}>
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onDelete={onDeleteNote} />
          ))}
        </AnimatePresence>
      </div>
    </aside>
  )
}
