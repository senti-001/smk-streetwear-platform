import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About | SMK — Self Made King',
  description: 'The story behind SMK — Self Made King, Orange County streetwear.',
}

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <Image
          src="/brand-story.png"
          alt="SMK Orange County crew"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 to-transparent" />
        <div className="relative mx-auto w-full max-w-4xl px-4 pb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/90">
            The Story
          </p>
          <h1 className="font-display text-5xl uppercase leading-none text-background sm:text-7xl">
            Self Made King
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="flex flex-col gap-6 text-base leading-relaxed text-muted-foreground">
          <p>
            SMK started in a garage in South Orange County with one idea: make the
            kind of heavyweight, no-compromise streetwear we actually wanted to
            wear. No fast fashion, no filler.
          </p>
          <p>
            Every piece is designed, sampled, and released in limited runs. We put
            everything into fabric weight, fit, and finish &mdash; the details you
            feel the moment you put it on. When a drop is gone, it&apos;s gone.
          </p>
          <p>
            Self Made King is more than a name. It&apos;s for anyone who built their
            own lane from nothing. From the 949 to wherever you rep it &mdash; wear
            the crown.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-10 text-center">
          <div>
            <p className="font-display text-4xl text-primary">04</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Drops released
            </p>
          </div>
          <div>
            <p className="font-display text-4xl text-primary">949</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Made in OC
            </p>
          </div>
          <div>
            <p className="font-display text-4xl text-primary">100%</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Independent
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
