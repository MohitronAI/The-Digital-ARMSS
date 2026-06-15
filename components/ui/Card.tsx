import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return <div className={cn('rounded-2xl border border-white/70 bg-white shadow-md', className)}>{children}</div>
}