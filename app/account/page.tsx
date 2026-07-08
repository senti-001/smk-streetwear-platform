import type { Metadata } from 'next'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Account',
  description: 'Sign in to your SMK account to track orders and early drop access.',
}

export default function AccountPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-20">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
          The Court
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Sign in for order tracking, early drop access, and member-only releases.
          Accounts arrive with the next release &mdash; authentication is coming online soon.
        </p>

        <form className="mt-6 flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Email
            </span>
            <input
              type="email"
              disabled
              placeholder="you@example.com"
              className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none disabled:opacity-60"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Password
            </span>
            <input
              type="password"
              disabled
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none disabled:opacity-60"
            />
          </label>
          <button
            type="button"
            disabled
            className={cn(buttonVariants({ size: 'lg' }), 'mt-2 h-12 w-full cursor-not-allowed opacity-60')}
          >
            Sign in &mdash; coming soon
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Want to shop the current drop instead?{' '}
          <Link href="/shop" className="font-semibold text-primary underline-offset-4 hover:underline">
            Enter the shop
          </Link>
        </p>
      </div>
    </div>
  )
}
