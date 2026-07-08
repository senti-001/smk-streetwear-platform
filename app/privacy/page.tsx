import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How SMK Streetwear collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</p>
      <h1 className="mt-3 font-display text-5xl uppercase tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          SMK &mdash; Self Made King (&ldquo;SMK,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy.
          This policy explains what we collect and how we use it when you shop with us.
        </p>
        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
            What we collect
          </h2>
          <p className="mt-2">
            Contact and shipping details, order history, and basic device analytics used to
            improve the store and process your orders.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
            How we use it
          </h2>
          <p className="mt-2">
            To fulfill orders, provide support, send drop notifications you opt into, and prevent
            fraud. We never sell your personal data.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
            Contact
          </h2>
          <p className="mt-2">
            Questions about your data? Email{' '}
            <a href="mailto:privacy@smkstreetwear.com" className="text-primary underline-offset-4 hover:underline">
              privacy@smkstreetwear.com
            </a>
            .
          </p>
        </section>
        <p className="text-xs text-muted-foreground/70">Last updated: July 2026</p>
      </div>
    </div>
  )
}
