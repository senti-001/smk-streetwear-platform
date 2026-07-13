'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  endsAt: string // ISO date string
  className?: string
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(endsAt: string): TimeLeft {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function CountdownTimer({ endsAt, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(endsAt))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(endsAt))
    }, 1000)
    return () => clearInterval(interval)
  }, [endsAt])

  // Avoid hydration mismatch — show skeleton on server
  if (!mounted) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {['00', '00', '00', '00'].map((v, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="font-display text-3xl leading-none text-foreground">{v}</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {['Days', 'Hrs', 'Min', 'Sec'][i]}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const expired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0

  if (expired) return null

  const segments = [
    { value: pad(timeLeft.days), label: 'Days' },
    { value: pad(timeLeft.hours), label: 'Hrs' },
    { value: pad(timeLeft.minutes), label: 'Min' },
    { value: pad(timeLeft.seconds), label: 'Sec' },
  ]

  return (
    <div className={`flex items-center gap-4 ${className}`} aria-label="Time remaining">
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl leading-none tabular-nums sm:text-4xl">
              {seg.value}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {seg.label}
            </span>
          </div>
          {i < segments.length - 1 && (
            <span className="mt-0.5 font-display text-2xl leading-none text-muted-foreground">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
