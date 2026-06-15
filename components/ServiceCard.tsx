"use client"

import Link from 'next/link'
import { ArrowRight, LayoutTemplate, Mail, PenTool, Search, Share2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import { scaleIn } from '@/lib/animations'
import type { Service } from '@/types'

const icons = {
  Search,
  Share2,
  PenTool,
  Mail,
  LayoutTemplate,
  Sparkles
}

interface ServiceCardProps {
  service: Service
  compact?: boolean
  selected?: boolean
  onClick?: () => void
  href?: string
}

export function ServiceCard({ service, compact = false, selected = false, onClick, href }: ServiceCardProps) {
  const Icon = icons[service.icon]

  const content = (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -12, scale: 1.05 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative h-full"
    >
      <Card
        className={cn(
          'relative h-full overflow-hidden border border-white/70 bg-white p-6 transition-all duration-300 sm:p-7',
          selected ? 'border-brand-gold shadow-[0_24px_80px_rgba(212,165,116,0.18)]' : 'hover:border-brand-gold/30 hover:shadow-2xl'
        )}
      >
        <motion.div className="pointer-events-none absolute left-6 top-0 h-0.5 w-0 bg-brand-gold transition-all duration-500 group-hover:w-[100px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,116,0.16),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <motion.div
          aria-hidden
          className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-gold/10 blur-2xl"
          initial={false}
          animate={{ scale: selected ? 1.15 : 1, opacity: selected ? 0.8 : 0.5 }}
          transition={{ duration: 0.4 }}
        />
        <div className="flex h-full flex-col">
          <div className="flex items-start gap-4">
            <motion.div
              className="relative rounded-2xl bg-brand-navy p-3 text-white shadow-[0_12px_30px_rgba(0,31,63,0.22)]"
              whileHover={{ rotate: 10, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
            >
              <Icon className="h-6 w-6" />
              <motion.span aria-hidden className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-gold/0 via-brand-gold/0 to-brand-gold/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold tracking-[-0.02em] text-brand-navy transition-colors duration-300 group-hover:text-brand-gold">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-brand-ink/72 sm:text-base">
                {compact ? service.shortDescription : service.description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-gold">
            Learn More
            <motion.span whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 280, damping: 20 }}>
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </div>
        </div>
      </Card>
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block h-full w-full text-left">
        {content}
      </button>
    )
  }

  return content
}