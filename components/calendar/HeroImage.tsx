'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { MONTH_IMAGES, MONTH_NAMES } from '@/lib/constants'

interface HeroImageProps {
  month: number
  year: number
}

export function HeroImage({ month, year }: HeroImageProps) {
  const [useFallback, setUseFallback] = useState(false)
  const image = MONTH_IMAGES[month]
  const isDev = process.env.NODE_ENV !== 'production'
  const remoteFallback = `https://source.unsplash.com/1200x600/?${image.unsplashKeyword}`
  const src = useFallback && isDev ? remoteFallback : image.src

  useEffect(() => {
    setUseFallback(false)
  }, [month])

  return (
    <div className="relative overflow-hidden">
      <div
        className="wire-bar relative h-5 overflow-visible"
        style={{ background: 'linear-gradient(to bottom, #d1d5db 0%, #9ca3af 100%)' }}
      >
        {Array.from({ length: 12 }, (_, index) => {
          const left = ((index + 1) / 13) * 100

          return (
            <div
              key={left}
              className="absolute -top-3 h-7 w-5 rounded-full border-2 border-gray-400 bg-gray-200"
              style={{ left: `calc(${left}% - 10px)` }}
            />
          )
        })}
      </div>
      <div className="relative h-64 md:h-72">
        <Image
          alt={image.alt}
          className="object-cover object-top"
          fill
          onError={() => {
            if (isDev) {
              setUseFallback(true)
            }
          }}
          priority
          src={src}
          unoptimized={Boolean(useFallback && isDev)}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 via-black/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div
          className="absolute bottom-0 left-0 h-24 w-40 bg-[var(--cal-accent)]/90"
          style={{ clipPath: 'polygon(0 20%, 65% 100%, 0 100%)' }}
        />
        <div
          className="absolute bottom-0 right-0 h-28 w-52 bg-[var(--cal-accent)]"
          style={{ clipPath: 'polygon(18% 100%, 100% 30%, 100% 100%)' }}
        />
        <div className="absolute bottom-0 right-0 bg-gradient-to-l from-[var(--cal-accent)] via-[var(--cal-accent)]/85 to-transparent px-6 py-4 text-right">
          <p className="font-display text-2xl font-normal text-white/80">{year}</p>
          <h2 className="font-display text-4xl font-bold uppercase tracking-[0.2em] text-white md:text-5xl">
            {MONTH_NAMES[month]}
          </h2>
        </div>
      </div>
    </div>
  )
}
