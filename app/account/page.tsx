'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants, Button } from '@/components/ui/button'

export default function AccountPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
          The Court
        </h1>
        
        {submitted ? (
          <div className="mt-6">
            <p className="text-lg font-semibold text-primary">You're in. 👑</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We've added you to the SMK Collective. Check your inbox for your rewards link.
            </p>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sign in for order tracking, early drop access, and member-only releases.
              Full authentication is coming soon, but you can secure your rewards now.
            </p>

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
              className="mt-6 flex flex-col gap-3"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="you@example.com"
                  className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary disabled:opacity-60"
                />
              </label>
              
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="mt-2 h-12 w-full"
              >
                {loading ? 'Securing Access...' : 'Get Rewards Access'}
              </Button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Want to shop the current drop instead?{' '}
          <Link href="/shop" className="font-semibold text-primary underline-offset-4 hover:underline">
            Enter the shop
          </Link>
        </p>
      </div>
    </div>
  )
}
