import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <h1 className="font-display text-4xl uppercase">Order Confirmed</h1>
      <p className="mt-4 text-muted-foreground">
        Thank you for your purchase. You're a Self Made King. We'll email you a receipt and shipping updates.
      </p>
      <Link
        href="/shop"
        className={cn(buttonVariants({ size: 'lg' }), 'mt-8 h-12 px-8')}
      >
        Continue Shopping
      </Link>
    </div>
  )
}
