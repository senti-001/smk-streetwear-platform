'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Animated counter for the stats row
function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1400
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="hero-stat">
      <span className="hero-stat-value">
        {count}{suffix}
      </span>
      <span className="hero-stat-label">{label}</span>
    </div>
  )
}

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero-root" aria-label="SMK Self Made King hero">

      {/* ── Full-bleed background image ── */}
      <div className="hero-bg-wrap">
        <Image
          src="/smk-moodboard.png"
          alt="SMK Self Made King brand moodboard"
          fill
          priority
          sizes="100vw"
          className="hero-bg-img"
          onLoad={() => setLoaded(true)}
        />
        {/* Dark overlay gradient — heavier at bottom for text legibility */}
        <div className="hero-overlay" />
        {/* Subtle grain */}
        <div className="hero-grain" aria-hidden />
      </div>

      {/* ── Content ── */}
      <div className={`hero-content ${loaded ? 'hero-content--visible' : ''}`}>

        {/* Top eyebrow bar */}
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          <span>Orange County, California · Est. 2020</span>
          <span className="hero-eyebrow-dot" />
          <span>949</span>
          <span className="hero-eyebrow-dot" />
          <span>Self Made King</span>
        </div>

        {/* Main headline */}
        <div className="hero-headline-wrap">
          <h1 className="hero-headline">
            <span className="hero-headline-line hero-headline-line--1">SELF</span>
            <span className="hero-headline-line hero-headline-line--2">MADE</span>
            <span className="hero-headline-line hero-headline-line--3 hero-headline-primary">KING</span>
          </h1>

          {/* Vertical rule + descriptor */}
          <div className="hero-descriptor">
            <div className="hero-descriptor-rule" />
            <div className="hero-descriptor-text">
              <p className="hero-descriptor-tag">SMK · OC</p>
              <p className="hero-descriptor-copy">
                Built different.<br />
                Mindset elevated.<br />
                Loyalty. Discipline. Legacy.
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="hero-stats">
          <AnimatedStat value={949} suffix="" label="Area Code" />
          <div className="hero-stats-divider" />
          <AnimatedStat value={100} suffix="%" label="Independent" />
          <div className="hero-stats-divider" />
          <AnimatedStat value={2020} suffix="" label="Founded" />
        </div>

        {/* CTA buttons */}
        <div className="hero-ctas">
          <Link id="hero-shop-now" href="/shop" className="hero-cta-primary">
            <span>Shop Now</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link id="hero-our-story" href="/about" className="hero-cta-ghost">
            Our Story
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll" aria-hidden>
          <div className="hero-scroll-bar" />
          <span>Scroll</span>
        </div>
      </div>

      {/* ── Floating seal badge ── */}
      <div className="hero-seal" aria-hidden>
        <Image
          src="/artwork/self-made-king-seal-blue.png"
          alt="Self Made King Seal"
          width={140}
          height={140}
          className="hero-seal-img"
        />
      </div>

    </section>
  )
}
