import type { ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 rounded-full bg-[var(--cal-text)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        {content}
      </span>
    </div>
  )
}
