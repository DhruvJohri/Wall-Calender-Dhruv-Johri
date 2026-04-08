'use client'

import { useEffect, useState } from 'react'

import { toStorageISOString } from '@/lib/dateUtils'
import type { DateRange, Note } from '@/types'

const STORAGE_KEY = 'wall-calendar-notes'

function isStoredNote(value: unknown): value is Note {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.text === 'string' &&
    (typeof candidate.rangeStart === 'string' || candidate.rangeStart === null) &&
    (typeof candidate.rangeEnd === 'string' || candidate.rangeEnd === null) &&
    typeof candidate.createdAt === 'string'
  )
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as unknown

        if (Array.isArray(parsed)) {
          setNotes(parsed.filter(isStoredNote))
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }

    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [hasHydrated, notes])

  function addNote(text: string, range: DateRange) {
    const trimmed = text.trim()

    if (!trimmed) {
      return
    }

    const rangeStart = range.start ? toStorageISOString(range.start) : null
    const rangeEnd = range.start ? toStorageISOString(range.end ?? range.start) : null

    setNotes((current) => [
      {
        id: crypto.randomUUID(),
        text: trimmed,
        rangeStart,
        rangeEnd,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ])
  }

  function deleteNote(id: string) {
    setNotes((current) => current.filter((note) => note.id !== id))
  }

  return {
    notes,
    addNote,
    deleteNote,
  }
}
