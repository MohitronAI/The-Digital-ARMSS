"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface SharedProps {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

type ButtonAsButton = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type ButtonAsLink = SharedProps & { href: string; target?: string; rel?: string }

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-gold text-brand-navy shadow-sm hover:bg-[#dfb17f] hover:shadow-lg',
  secondary: 'bg-brand-navy text-white shadow-sm hover:bg-[#00284f] hover:shadow-lg',
  outline: 'border border-brand-navy/15 bg-transparent text-brand-navy hover:border-brand-gold hover:bg-brand-gold hover:text-white hover:shadow-lg',
  ghost: 'bg-transparent text-brand-navy hover:bg-brand-navy/5'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-sm sm:text-base',
  lg: 'h-14 px-6 text-base sm:text-lg'
}

function RippleLayer({ ripples }: { ripples: Array<{ id: number; x: number; y: number; size: number }> }) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 mix-blend-screen animate-ping"
          style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size, animationDuration: '520ms' }}
        />
      ))}
    </span>
  )
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, className, variant = 'primary', size = 'md', loading = false, ...rest } = props
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])

  const sharedClassName = useMemo(
    () =>
      cn(
        'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-semibold transition-all duration-300 active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-brand-gold/45 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        className
      ),
    [className, size, variant]
  )

  const createRipple = (event: PointerEvent<HTMLElement>) => {
    const target = event.currentTarget.getBoundingClientRect()
    const sizeValue = Math.max(target.width, target.height) * 1.15
    const x = event.clientX - target.left - sizeValue / 2
    const y = event.clientY - target.top - sizeValue / 2
    const id = Date.now() + Math.random()
    setRipples((current) => [...current, { id, x, y, size: sizeValue }])
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id))
    }, 520)
  }

  const childrenContent = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {children}
      </span>
      <RippleLayer ripples={ripples} />
    </>
  )

  if ('href' in props && props.href) {
    const { href, target, rel } = props
    return (
      <Link className={sharedClassName} href={href} target={target} rel={rel} onPointerDown={createRipple}>
        {childrenContent}
      </Link>
    )
  }

  const buttonProps = rest as ButtonAsButton
  return (
    <button
      className={sharedClassName}
      {...buttonProps}
      disabled={buttonProps.disabled || loading}
      onPointerDown={createRipple}
    >
      {childrenContent}
    </button>
  )
}