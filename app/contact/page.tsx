'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Get in touch
        </p>
        <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">
          Contact
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Questions about an order, a drop, or a collab? Reach out and the SMK team
          will get back to you within 1-2 business days.
        </p>
      </header>

      <div className="mb-10 flex flex-col gap-3 text-sm">
        <a
          href="mailto:hello@smkstreetwear.com"
          className="inline-flex items-center gap-2 hover:text-primary"
        >
          <Mail className="size-4 text-primary" /> hello@smkstreetwear.com
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 hover:text-primary"
        >
          <InstagramIcon className="size-4 text-primary" /> @smk.streetwear
        </a>
      </div>

      {sent ? (
        <p className="rounded-sm border border-primary/40 bg-primary/10 p-4 text-sm font-medium">
          Thanks for reaching out. We&apos;ll be in touch soon.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
          className="flex flex-col gap-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Name"
              aria-label="Name"
              className="h-11 rounded-sm border border-border bg-card px-3 text-sm focus:border-primary focus:outline-none"
            />
            <input
              required
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="h-11 rounded-sm border border-border bg-card px-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <textarea
            required
            rows={5}
            placeholder="Your message"
            aria-label="Message"
            className="rounded-sm border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <Button type="submit" size="lg" className="h-11 self-start px-8">
            Send message
          </Button>
        </form>
      )}
    </div>
  )
}
