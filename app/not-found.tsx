import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="max-w-xl rounded-3xl bg-white p-8 text-center shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">404</p>
        <h1 className="mt-4 font-display text-5xl font-bold text-brand-navy">Page not found</h1>
        <p className="mt-4 text-brand-ink/70">The page you are looking for does not exist or has been moved.</p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Return home</Button>
        </div>
      </div>
    </div>
  )
}