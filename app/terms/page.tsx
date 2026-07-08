import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of SMK Streetwear.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</p>
      <h1 className="mt-3 font-display text-5xl uppercase tracking-tight text-foreground">
        Terms of Service
      </h1>
      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          By accessing SMK &mdash; Self Made King, you agree to these terms. Please read them
          before placing an order.
        </p>
        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
            Orders &amp; drops
          </h2>
          <p className="mt-2">
            Products are released in limited drops. Placing an order does not guarantee stock
            until payment is confirmed. Limited pieces are final sale unless stated otherwise.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
            Returns
          </h2>
          <p className="mt-2">
            Unworn items may be returned within 14 days of delivery, excluding final-sale and
            limited-drop pieces. Return shipping is the customer&apos;s responsibility.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
            Contact
          </h2>
          <p className="mt-2">
            Questions? Email{' '}
            <a href="mailto:support@smkstreetwear.com" className="text-primary underline-offset-4 hover:underline">
              support@smkstreetwear.com
            </a>
            .
          </p>
        </section>
        <p className="text-xs text-muted-foreground/70">Last updated: July 2026</p>
      </div>
    </div>
  )
}
