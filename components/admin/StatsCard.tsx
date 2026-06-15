import type { ReactNode } from 'react'

export function StatsCard({ label, value, hint, icon }: { label: string; value: string; hint?: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">{label}</p>
          <p className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">{value}</p>
          {hint ? <p className="mt-2 text-sm text-brand-ink/65">{hint}</p> : null}
        </div>
        {icon ? <div className="rounded-2xl bg-brand-gold/10 p-3 text-brand-gold">{icon}</div> : null}
      </div>
    </div>
  )
}