'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <section id="newsletter" className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Members Only
        </p>
        <h2 className="font-display text-4xl uppercase leading-none text-balance sm:text-5xl">
          Join the SMK Collective
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-secondary-foreground/70">
          Members unlock Archive pricing, first dibs on limited drops, and restock alerts
          before anything goes public. No spam — just the drop.
        </p>

        {/* Benefits row */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {['Archive Access', 'First Drop Alerts', 'Members Pricing'].map((benefit) => (
            <span
              key={benefit}
              className="rounded-sm border border-secondary-foreground/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary-foreground/60"
            >
              {benefit}
            </span>
          ))}
        </div>

        {submitted ? (
          <div className="mt-10">
            <p className="text-lg font-semibold text-primary">You&apos;re in. 👑</p>
            <p className="mt-2 text-sm text-secondary-foreground/60">
              Check your inbox — we sent you something.
            </p>
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!email || loading) return
              setLoading(true)

              try {
                const res = await fetch('/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email }),
                })

                if (res.ok) {
                  setSubmitted(true)
                } else {
                  console.error('Failed to subscribe')
                }
              } catch (error) {
                console.error('Error:', error)
              } finally {
                setLoading(false)
              }
            }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
              disabled={loading}
              className="h-12 flex-1 rounded-sm border border-secondary-foreground/20 bg-background/5 px-4 text-sm text-secondary-foreground placeholder:text-secondary-foreground/40 focus:border-primary focus:outline-none disabled:opacity-60"
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-12 gap-2 px-8"
            >
              {loading ? 'Joining...' : (
                <>Join <ArrowRight className="size-4" /></>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

