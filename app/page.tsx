import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Flame } from 'lucide-react'
import { ProductCard } from '@/components/commerce/product-card'
import { Newsletter } from '@/components/marketing/newsletter'
import { PRODUCTS, ARTWORKS } from '@/lib/products'
import marketingConfig from '@/lib/marketing-config.json'

export default function HomePage() {
  const products = PRODUCTS
  const { archiveSale, homepage } = marketingConfig

  // Total inventory remaining across all products (for urgency signal)
  const totalInventory = PRODUCTS.reduce((sum, p) => sum + p.inventory, 0)

  return (
    <>
      {/* Art section / Hero Replacement */}
      <section className="bg-card pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h1 className="font-display text-5xl uppercase leading-none sm:text-6xl md:text-8xl">
              SMK Originals
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Heavyweight staples, smoke gothic lettering, limited runs. 
              Premium Orange County streetwear built for those who made it themselves.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ARTWORKS.map((art) => (
              <div
                key={art.id}
                className="group relative overflow-hidden rounded-sm border border-border bg-secondary/40 transition-colors hover:border-primary"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl uppercase leading-none transition-colors group-hover:text-primary">
                    {art.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {art.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Archive Drop Banner (agent-controlled) ── */}
      {homepage.showArchiveBanner && archiveSale.active && (
        <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
          {/* Grain overlay */}
          <div className="grain absolute inset-0 pointer-events-none" />
          {/* Decorative background text */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
            aria-hidden
          >
            <span className="font-display whitespace-nowrap text-[16vw] font-black uppercase leading-none text-secondary-foreground/[0.04]">
              ARCHIVE
            </span>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-14">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: copy */}
              <div className="max-w-xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.30em] text-primary">
                  Limited Time
                </p>
                <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">
                  {archiveSale.headline}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-secondary-foreground/70">
                  {archiveSale.subheadline}
                </p>
                {/* Inventory urgency */}
                {totalInventory <= 200 && (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Flame className="size-3.5" />
                    {totalInventory} units remaining across all styles
                  </p>
                )}
              </div>

              {/* Right: stats + CTA */}
              <div className="flex flex-col items-start gap-6 lg:items-end">
                {/* Discount badge */}
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-6xl leading-none text-primary sm:text-7xl">
                    {archiveSale.discountPercent}%
                  </span>
                  <span className="font-display text-2xl uppercase leading-none text-secondary-foreground/60">
                    Off
                  </span>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Link
                    id="homepage-archive-cta"
                    href="/archive"
                    className="inline-flex h-11 items-center gap-2 rounded-sm bg-primary px-7 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90 active:scale-100"
                  >
                    Shop Archive <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/shop"
                    className="inline-flex h-11 items-center gap-2 rounded-sm border border-secondary-foreground/20 px-6 text-sm font-semibold uppercase tracking-[0.14em] text-secondary-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    View all styles <ArrowRight className="size-4" />
                  </Link>
                </div>
                <p className="text-xs text-secondary-foreground/40">
                  Discount auto-applied — no code needed
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Gear */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              All Gear
            </p>
            <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">
              Latest Drops
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] hover:text-primary sm:flex"
          >
            Shop all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
