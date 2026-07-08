import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ & Shipping | SMK — Self Made King',
  description: 'Shipping, returns, sizing, and drop information for SMK.',
}

const FAQS = [
  {
    q: 'When do drops release?',
    a: 'New drops release roughly every 4-6 weeks. Sign up for the newsletter to get early access and restock alerts before anyone else.',
  },
  {
    q: 'How does shipping work?',
    a: 'Orders ship within 1-2 business days via USPS or UPS. Free shipping on all orders over $150. Tracking is emailed as soon as your order ships.',
  },
  {
    q: 'What is your return policy?',
    a: 'Unworn items with tags can be returned within 30 days for store credit or a refund. Limited drop items are final sale.',
  },
  {
    q: 'How do the pieces fit?',
    a: 'Our tops and fleece are cut with a relaxed, boxy fit and run true to size. Check the size guide on each product page for exact measurements.',
  },
  {
    q: 'Do you restock sold-out items?',
    a: 'Core pieces restock periodically. Limited drops are numbered and never restock. Add items to your wishlist to get notified.',
  },
]

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Need help?
        </p>
        <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl">
          FAQ
        </h1>
      </header>

      <dl className="divide-y divide-border border-y border-border">
        {FAQS.map((item) => (
          <div key={item.q} className="py-6">
            <dt className="font-display text-xl uppercase">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
