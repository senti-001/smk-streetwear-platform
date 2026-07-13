import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArchiveProductCard } from '@/components/archive/archive-product-card'
import { CountdownTimer } from '@/components/archive/countdown-timer'
import { PRODUCTS, type Product } from '@/lib/products'
import marketingConfig from '@/lib/marketing-config.json'

export const metadata: Metadata = {
  title: 'Archive Drop — Up to 40% Off | SMK Self Made King',
  description:
    "SMK Archive Drop. Previous collections, limited inventory. Up to 40% off while supplies last. Once it's gone, it's gone. Orange County streetwear.",
  openGraph: {
    title: 'Archive Drop — Up to 40% Off | SMK Self Made King',
    description: 'Previous collections. Limited inventory. Up to 40% off while supplies last.',
    type: 'website',
  },
}

// Products that qualify for the archive (have compareAtPrice set, or use archive tag)
// In production these would come from Shopify — here we derive from the static catalog
function getArchiveProducts(): Product[] {
  const withCompare = PRODUCTS.filter((p) => p.compareAtPrice)
  if (withCompare.length > 0) return withCompare

  // Fallback: treat all products as archive with a synthetic compareAtPrice
  return PRODUCTS.map((p) => ({
    ...p,
    compareAtPrice: Math.round(
      p.price / (1 - marketingConfig.archiveSale.discountPercent / 100),
    ),
  }))
}

export default function ArchivePage() {
  const { archiveSale } = marketingConfig
  const archiveProducts = getArchiveProducts()
  const totalInventory = archiveProducts.reduce((sum, p) => sum + p.inventory, 0)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        {/* Grain texture */}
        <div className="grain absolute inset-0" />

        {/* Decorative background text */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
          aria-hidden
        >
          <span className="font-display whitespace-nowrap text-[18vw] font-black uppercase leading-none text-secondary-foreground/5">
            ARCHIVE
          </span>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
          {/* Eyebrow */}
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-primary">
            SMK — {new Date().getFullYear()} Season Clearance
          </p>

          <h1 className="font-display text-6xl uppercase leading-none sm:text-7xl md:text-8xl lg:text-9xl">
            {archiveSale.headline}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-secondary-foreground/70">
            {archiveSale.subheadline}
          </p>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t border-secondary-foreground/10 pt-8">
            <div className="text-center">
              <p className="font-display text-4xl leading-none text-primary">
                {archiveSale.discountPercent}%
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-secondary-foreground/60">
                Max Off
              </p>
            </div>
            <div className="h-10 w-px bg-secondary-foreground/10" />
            <div className="text-center">
              <p className="font-display text-4xl leading-none">{archiveProducts.length}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-secondary-foreground/60">
                Styles
              </p>
            </div>
            <div className="h-10 w-px bg-secondary-foreground/10" />
            <div className="text-center">
              <p className="font-display text-4xl leading-none">{totalInventory}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-secondary-foreground/60">
                Units Left
              </p>
            </div>
          </div>

          {/* Countdown timer — only shown if endsAt is set in marketing-config.json */}
          {archiveSale.endsAt && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-[0.22em] text-secondary-foreground/50">
                Sale ends in
              </p>
              <CountdownTimer
                endsAt={archiveSale.endsAt}
                className="text-secondary-foreground"
              />
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              id="archive-shop-cta"
              href="#archive-products"
              className="inline-flex h-12 items-center gap-2 rounded-sm bg-primary px-8 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90 active:scale-100"
            >
              Shop Archive <ArrowRight className="size-4" />
            </a>
            <p className="text-xs text-secondary-foreground/50">
              Discount applied automatically at checkout
            </p>
          </div>
        </div>
      </section>

      {/* ── What is the Archive Drop? ── */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Previous Releases',
                body: 'Archive pieces from past collections. The same premium construction — now at reduced prices.',
              },
              {
                title: 'Never Restocked',
                body: "Once inventory is gone, these pieces are retired. No reprints, no restocks. IGBBMN.",
              },
              {
                title: 'Discount Auto-Applied',
                body: 'No coupon codes to remember. Click Shop Archive and the discount applies at checkout.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-sm border border-border p-6">
                <h3 className="font-display text-lg uppercase leading-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section id="archive-products" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Archive — {archiveProducts.length} Styles
            </p>
            <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">
              Shop Archive
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] hover:text-primary sm:flex"
          >
            Full store <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {archiveProducts.map((product) => {
            const discountPercent = product.compareAtPrice
              ? Math.round(
                  ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
                )
              : archiveSale.discountPercent

            return (
              <ArchiveProductCard
                key={product.id}
                product={product}
                discountPercent={discountPercent}
                discountUrl={archiveSale.shopifyDiscountUrl}
              />
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-sm border border-primary/20 bg-primary/5 px-8 py-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Members Only Access
          </p>
          <h3 className="mt-3 font-display text-3xl uppercase leading-none sm:text-4xl">
            Join the SMK Collective
          </h3>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Get early access to Archive drops, exclusive pricing, and first dibs on new
            collections. No spam — just the drop.
          </p>
          <Link
            href="/#newsletter"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-sm border border-primary px-7 text-sm font-bold uppercase tracking-[0.18em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Join the Collective
          </Link>
        </div>
      </section>
    </>
  )
}
