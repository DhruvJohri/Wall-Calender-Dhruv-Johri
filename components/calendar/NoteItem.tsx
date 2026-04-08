'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'

import { formatNoteRangeLabel } from '@/lib/dateUtils'
import type { Note } from '@/types'

interface NoteItemProps {
  note: Note
  onDelete: (id: string) => void
}

export function NoteItem({ note, onDelete }: NoteItemProps) {
  const label = formatNoteRangeLabel(note.rangeStart, note.rangeEnd)

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className="group relative rounded-lg border border-gray-100 bg-white p-2 text-xs text-gray-700 shadow-sm"
      initial={{ opacity: 0, x: -10 }}
    >
      <button
        aria-label="Delete note"
        className="absolute right-1 top-1 opacity-0 transition group-hover:opacity-100"
        onClick={() => onDelete(note.id)}
        type="button"
      >
        <X size={12} />
      </button>
      <p className="whitespace-pre-wrap pr-5">{note.text}</p>
      {label ? (
        <p className="mt-2 text-[10px] font-semibold text-[var(--cal-accent)]">{label}</p>
      ) : null}
    </motion.div>
  )
}
