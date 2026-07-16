import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — SMK Self Made King',
  description: 'The terms and conditions that govern your use of SMK Streetwear. Orange County CA.',
}

const SECTIONS = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    body: `By accessing or purchasing from smkstreetwear.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site. SMK — Self Made King reserves the right to update these terms at any time; continued use of the site constitutes acceptance.`,
  },
  {
    id: 'products',
    title: 'Products & Limited Drops',
    body: `All products are released in limited drops. Quantities are strictly limited — placing an item in your cart does not reserve it. Your order is not confirmed until payment is successfully processed and you receive an order confirmation email.

SMK reserves the right to cancel any order at our discretion, in which case a full refund will be issued. Product images are for illustration purposes; minor color variations may occur due to screen calibration and garment dyeing processes.`,
  },
  {
    id: 'pricing',
    title: 'Pricing & Payment',
    body: `All prices are listed in USD. We accept major credit/debit cards and other payment methods as offered at checkout, processed securely via Stripe. Sales tax is applied where required by law.

We reserve the right to correct pricing errors at any time. If an order is placed at an incorrect price, we will contact you before processing.`,
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    body: `We ship from Orange County, CA. Domestic orders typically arrive within 5–10 business days; international orders 10–21 business days depending on customs and carrier delays.

Shipping times are estimates only — we are not responsible for carrier delays, customs holds, or incorrect addresses provided at checkout. Free shipping thresholds and promotions apply as displayed at the time of purchase.`,
  },
  {
    id: 'returns',
    title: 'Returns & Exchanges',
    body: `We want you to be stoked on your gear. Items in unworn, unwashed condition with original tags attached may be returned within 14 days of delivery for a refund or exchange.

The following are FINAL SALE and not eligible for return:
• Limited-drop pieces (marked at checkout)
• Sale/archive items
• Items showing signs of wear, washing, or missing tags

Return shipping costs are the customer's responsibility unless we made a fulfillment error (wrong item, defective product). To initiate a return, email support@smkstreetwear.com with your order number.`,
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    body: `All content on this site — including graphics, logos, product designs, photography, and copy — is the property of SMK Self Made King and protected by applicable copyright and trademark laws. You may not reproduce, distribute, or use our content without written permission.`,
  },
  {
    id: 'user-conduct',
    title: 'User Conduct',
    body: `You agree not to:
• Use the site for any unlawful purpose
• Attempt to gain unauthorized access to our systems
• Scrape, crawl, or data-mine the site without permission
• Resell SMK products purchased through bot-assisted or bulk purchasing methods
• Submit false or fraudulent orders or chargebacks

Violation of these terms may result in order cancellation and being banned from future purchases.`,
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers & Limitation of Liability',
    body: `The site and its content are provided "as is" without warranties of any kind. SMK Self Made King makes no guarantees regarding availability, accuracy, or fitness for a particular purpose.

To the fullest extent permitted by law, SMK shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site or products purchased. Our total liability shall not exceed the amount you paid for the relevant order.`,
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    body: `These terms are governed by the laws of the State of California, without regard to conflict-of-law principles. Any disputes shall be resolved in the courts of Orange County, California.`,
  },
  {
    id: 'contact',
    title: 'Contact',
    body: `Questions about these terms?`,
    contact: true,
  },
]

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* Header */}
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</p>
      <h1 className="mt-3 font-display text-5xl uppercase leading-none tracking-tight md:text-6xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        These terms govern your access to and use of smkstreetwear.com and any purchases made through it.
        By using the site you agree to these terms — read them before you shop.
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
                  href="mailto:support@smkstreetwear.com"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  support@smkstreetwear.com
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
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </div>
  )
}
