"use client"

import { Button } from '@/components/ui/Button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="max-w-xl rounded-3xl bg-white p-8 text-center shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">Something went wrong</p>
        <h2 className="mt-4 font-display text-4xl font-bold text-brand-navy">We could not load this page.</h2>
        <p className="mt-4 text-brand-ink/70">{error.message}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="outline">Back home</Button>
        </div>
      </div>
    </div>
  )
}