"use client"

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { services } from '@/data/services'
import { fadeUp, slideInLeft, staggerContainerFast } from '@/lib/animations'

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_24%)]" />
      <Container className="py-16 sm:py-20">
        <motion.div variants={staggerContainerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} className="relative z-10 grid gap-10 lg:grid-cols-4">
          <motion.div variants={slideInLeft}>
            <Link href="/" className="inline-flex items-center gap-3 text-xl font-bold tracking-wide">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-gold text-brand-navy shadow-sm">A</span>
              <span>The Digital ARMSS</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/72">Premium digital marketing for brands that want strategic clarity, better performance, and a more compelling online presence.</p>
            <div className="mt-6 flex gap-3 text-white/75">
              {[Instagram, Linkedin, Facebook].map((Icon, index) => (
                <a key={index} href="#" aria-label="Social link" className="rounded-lg border border-white/10 p-3 transition-all duration-300 hover:rotate-12 hover:scale-110 hover:border-brand-gold hover:text-brand-gold">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/76">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group relative inline-block hover:text-brand-gold">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Services</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/76">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="group relative inline-block hover:text-brand-gold">
                    {service.name}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Newsletter</h3>
            <p className="mt-5 text-sm leading-7 text-white/72">Get occasional insights on growth, positioning, and digital performance.</p>
            <form
              className="mt-5 space-y-3"
              onSubmit={async (event) => {
                event.preventDefault()
                setError('')

                try {
                  const response = await fetch('/api/newsletter/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                  })

                  const payload = (await response.json().catch(() => null)) as { error?: string } | null
                  if (!response.ok) {
                    throw new Error(payload?.error ?? 'Subscription failed. Please try again.')
                  }

                  setSent(true)
                  setEmail('')
                } catch (submitError) {
                  setSent(false)
                  setError(submitError instanceof Error ? submitError.message : 'Subscription failed. Please try again.')
                }
              }}
            >
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                placeholder="Email address"
                className="h-12 w-full rounded-lg border border-white/10 bg-white/6 px-4 text-sm text-white placeholder:text-white/45 shadow-sm outline-none transition-all duration-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 focus:shadow-[0_0_0_4px_rgba(212,165,116,0.12)]"
              />
              <Button type="submit" className="w-full" size="md">
                Subscribe
              </Button>
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              {sent ? <p className="text-sm text-brand-gold">Thanks for subscribing.</p> : null}
            </form>
          </motion.div>
        </motion.div>

        <motion.div variants={staggerContainerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} className="relative z-10 mt-12 grid gap-4 border-t border-white/10 pt-8 text-sm text-white/72 sm:grid-cols-2 lg:grid-cols-4">
          <ContactItem icon={Mail} label="Email" value="hello@thedigitalarmss.com" />
          <ContactItem icon={Phone} label="Phone" value="+91-98765-43210" />
          <ContactItem icon={MapPin} label="Address" value="Pune, Maharashtra, India" />
          <ContactItem icon={MapPin} label="Hours" value="Mon - Sat, 10:00 AM - 7:00 PM" />
        </motion.div>

        <div className="relative z-10 mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <p>© {new Date().getFullYear()} The Digital ARMSS. All rights reserved.</p>
            <Link href="/login" className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/60 transition-colors hover:border-brand-gold/30 hover:text-brand-gold">
              Portal
            </Link>
          </div>
          <p>Designed for performance, clarity, and premium brand presence.</p>
        </div>
      </Container>
    </footer>
  )
}

function ContactItem({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -4, scale: 1.01 }} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/8">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-brand-gold" />
        <span className="font-semibold text-white">{label}</span>
      </div>
      <p className="mt-2 text-sm text-white/72">{value}</p>
    </motion.div>
  )
}