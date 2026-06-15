import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  eyebrow?: string
  title?: string
  subtitle?: string
}

export function Section({ children, id, className, eyebrow, title, subtitle }: SectionProps) {
  return (
    <section id={id} className={cn('py-24 sm:py-28', className)}>
      {(eyebrow || title || subtitle) && (
        <div className="mx-auto mb-14 max-w-3xl text-center">
          {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-gold">{eyebrow}</p> : null}
          {title ? <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.02em] text-brand-navy sm:text-5xl lg:text-6xl">{title}</h2> : null}
          {subtitle ? <p className="mt-4 text-base leading-7 text-brand-ink/75 sm:text-lg">{subtitle}</p> : null}
        </div>
      )}
      {children}
    </section>
  )
}