import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/commerce/product-card'
import { Newsletter } from '@/components/marketing/newsletter'
import { PRODUCTS, ARTWORKS } from '@/lib/products'

export default function HomePage() {
  const newest = PRODUCTS.filter((p) => p.status === 'new').slice(0, 4)
  const featured = PRODUCTS.filter((p) => p.featured && !newest.some(n => n.id === p.id)).reverse().slice(0, 4)

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

      {/* Newest drop */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Just dropped
            </p>
            <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">
              Newest Drop
            </h2>
          </div>
          <Link
            href="/shop?sort=new"
            className="hidden items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] hover:text-primary sm:flex"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {newest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Most wanted
          </p>
          <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">
            Trending Now
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
