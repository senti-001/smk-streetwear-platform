'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Join the court
        </p>
        <h2 className="font-display text-4xl uppercase leading-none text-balance sm:text-5xl">
          Get early access to every drop
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-secondary-foreground/70">
          Sign up for restock alerts, first dibs on limited releases, and members-only
          discounts. No spam, just the drop.
        </p>

        {submitted ? (
          <p className="mt-8 text-lg font-semibold text-primary">
            You&apos;re in. Watch your inbox for the next drop.
          </p>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!email) return

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
              className="h-12 flex-1 rounded-sm border border-secondary-foreground/20 bg-background/5 px-4 text-sm text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-primary focus:outline-none"
            />
            <Button type="submit" size="lg" className="h-12 px-8">
              Sign up
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
