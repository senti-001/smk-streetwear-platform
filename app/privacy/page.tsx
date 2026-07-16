import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — SMK Self Made King',
  description: 'How SMK Streetwear collects, uses, and protects your information. Orange County streetwear built different.',
}

const SECTIONS = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: `When you place an order, create an account, or sign up for drop notifications, we collect information you provide directly — including your name, email address, shipping address, and payment details (processed securely by Stripe; we never store raw card numbers).

We also automatically collect limited technical data when you visit our site: your IP address, browser type, pages visited, and referring URL. This helps us keep the store running smoothly and understand what gear people are checking out.`,
  },
  {
    id: 'how-we-use-it',
    title: 'How We Use Your Information',
    body: `We use your data to:
• Fulfill and ship your orders
• Send order confirmations and tracking updates
• Notify you of new drops and restocks (only if you opt in)
• Respond to customer support requests
• Detect and prevent fraud or abuse
• Improve the shopping experience on our site

We do not sell, rent, or trade your personal information to any third party for marketing purposes. Full stop.`,
  },
  {
    id: 'sharing',
    title: 'Who We Share Data With',
    body: `We share your information only as necessary to operate the business:

• **Stripe** — payment processing (PCI-DSS compliant)
• **Shopify** — e-commerce infrastructure
• **Shipping carriers** (UPS, USPS, FedEx) — to deliver your order
• **Email platforms** — to send transactional and opt-in marketing emails
• **Analytics tools** — aggregated, anonymized site usage data only

All third-party partners are required to handle your data in accordance with applicable privacy laws.`,
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: `Our site uses cookies and similar tracking technologies to keep your cart intact, remember your preferences, and analyze site traffic. You can control cookies through your browser settings. Disabling cookies may affect some site functionality (like your cart persisting between sessions).`,
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    body: `We retain your order and account information for as long as necessary to fulfill the purposes described in this policy, comply with legal obligations (such as tax records), and resolve disputes. You may request deletion of your account data at any time by contacting us.`,
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    body: `Depending on where you live, you may have the right to:
• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data
• Opt out of marketing communications at any time (unsubscribe link in every email)
• Lodge a complaint with your local data protection authority

California residents: under CCPA, you have additional rights regarding the disclosure and deletion of personal information. Contact us to exercise these rights.`,
  },
  {
    id: 'security',
    title: 'Security',
    body: `We use industry-standard measures to protect your data — including SSL/TLS encryption for all data in transit and secure infrastructure through Shopify and Stripe. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security, but we take it seriously.`,
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. When we do, we'll update the "Last updated" date below. Continued use of the site after changes constitutes acceptance of the revised policy.`,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    body: `Questions about your privacy or want to exercise your data rights? Reach out:`,
    contact: true,
  },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* Header */}
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</p>
      <h1 className="mt-3 font-display text-5xl uppercase leading-none tracking-tight md:text-6xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        SMK — Self Made King (&ldquo;SMK,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is committed to protecting your privacy.
        This policy describes how we handle your personal information when you shop with us or visit{' '}
        <span className="text-foreground">smkstreetwear.com</span>.
      </p>

      {/* TOC */}
      <nav className="mt-8 rounded-sm border border-border bg-muted/40 p-5" aria-label="Table of contents">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Contents</p>
        <ol className="flex flex-col gap-1.5 text-sm">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      <div className="mt-12 flex flex-col gap-10">
        {SECTIONS.map((s, i) => (
          <section key={s.id} id={s.id}>
            <h2 className="font-display text-2xl uppercase leading-none tracking-tight text-foreground">
              <span className="mr-2 text-primary">{i + 1}.</span>{s.title}
            </h2>
            <div className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {s.body}
            </div>
            {s.contact && (
              <div className="mt-4 flex flex-col gap-1 text-sm">
                <a
                  href="mailto:privacy@smkstreetwear.com"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  privacy@smkstreetwear.com
                </a>
                <span className="text-muted-foreground">SMK Self Made King · Orange County, CA 92620</span>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Footer bar */}
      <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
        <p>Last updated: July 15, 2026</p>
        <div className="flex gap-4">
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </div>
  )
}
