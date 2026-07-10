import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="font-display text-4xl uppercase">Checkout Cancelled</h1>
      <p className="mt-4 text-muted-foreground">
        Your order has not been placed and you haven't been charged. Your items are still saved in your bag.
      </p>
      <Link
        href="/checkout"
        className={cn(buttonVariants({ size: 'lg' }), 'mt-8 h-12 px-8')}
      >
        Return to Checkout
      </Link>
    </div>
  )
}
