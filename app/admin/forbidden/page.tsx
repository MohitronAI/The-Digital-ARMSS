import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">403</p>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">Access denied</h2>
      <p className="mt-3 text-sm leading-7 text-brand-ink/70">Your account does not have permission to view this area.</p>
      <Link href="/admin" className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-brand-gold px-5 font-semibold text-brand-navy">
        Back to dashboard
      </Link>
    </div>
  )
}