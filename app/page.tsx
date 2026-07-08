import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/commerce/product-card'
import { Newsletter } from '@/components/marketing/newsletter'
import { COLLECTIONS, PRODUCTS } from '@/lib/products'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const newest = PRODUCTS.filter((p) => p.status === 'new').slice(0, 4)
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative flex min-h-[82vh] items-end overflow-hidden">
          <Image
            src="/hero-drop.png"
            alt="SMK latest streetwear drop campaign"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/20 to-transparent" />
          <div className="relative mx-auto w-full max-w-7xl px-4 pb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground/90">
              Drop 004 &middot; Live Now
            </p>
            <h1 className="max-w-4xl font-display text-6xl uppercase leading-[0.85] text-background text-balance sm:text-7xl md:text-8xl lg:text-9xl">
              Wear the Crown
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-background/80">
              Premium Orange County streetwear built for those who made it
              themselves. Heavyweight staples, numbered limited runs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className={cn(buttonVariants({ size: 'lg' }), 'h-12 px-8 text-sm')}
              >
                Shop the drop
              </Link>
              <Link
                href="/collections/limited-drops"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-12 border-background/40 bg-transparent px-8 text-sm text-background hover:bg-background hover:text-foreground',
                )}
              >
                Limited drops
              </Link>
            </div>
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

      {/* Featured collection banner */}
      <section className="relative overflow-hidden">
        <div className="relative flex min-h-[60vh] items-center">
          <Image
            src="/collection-banner.png"
            alt="Self Made King collection"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary/60" />
          <div className="relative mx-auto w-full max-w-7xl px-4 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/90">
              Featured Collection
            </p>
            <h2 className="font-display text-5xl uppercase leading-[0.9] text-background text-balance sm:text-7xl">
              Self Made King
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-background/80">
              The flagship line. Premium pieces carrying the crown for those who
              built it themselves.
            </p>
            <Link
              href="/collections/self-made-king"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-8 inline-flex h-12 px-8 text-sm',
              )}
            >
              Shop the collection
            </Link>
          </div>
        </div>
      </section>

      {/* Collections grid */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Shop by line
          </p>
          <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">
            Collections
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group relative flex aspect-[3/2] flex-col justify-end overflow-hidden rounded-sm border border-border bg-muted p-5 transition-colors hover:border-primary"
            >
              <h3 className="font-display text-2xl uppercase leading-none transition-colors group-hover:text-primary sm:text-3xl">
                {collection.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {collection.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand story */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/brand-story.png"
              alt="SMK Orange County crew"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              The Story
            </p>
            <h2 className="font-display text-4xl uppercase leading-none text-balance sm:text-5xl">
              Built in the 949
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              SMK started in a garage in South Orange County with one idea: make the
              kind of heavyweight, no-compromise streetwear we actually wanted to
              wear. No fast fashion, no filler. Every piece is designed, sampled, and
              dropped in limited runs.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Self Made King is a mindset. Wear the crown.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] hover:text-primary"
            >
              Read our story <ArrowRight className="size-4" />
            </Link>
          </div>
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
