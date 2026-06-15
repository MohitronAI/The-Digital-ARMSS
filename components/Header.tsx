"use client"

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { fadeUp, staggerContainerFast } from '@/lib/animations'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact', href: '/contact' }
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50">
      <div className={cn('border-b transition-all duration-300', scrolled ? 'border-white/60 bg-white/78 shadow-[0_12px_45px_rgba(0,31,63,0.1)] backdrop-blur-2xl' : 'border-transparent bg-transparent')}>
        <Container className="relative flex h-20 items-center justify-between gap-6">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
          <Link href="/" className="flex items-center gap-3">
            <motion.span
              key={scrolled ? 'scrolled' : 'idle'}
              initial={{ y: -2, scale: 0.98 }}
              animate={{ y: [0, -3, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-gold text-lg font-bold text-brand-navy shadow-sm"
            >
              A
            </motion.span>
            <div>
              <p className="text-base font-bold text-brand-navy">The Digital ARMSS</p>
              <p className="text-xs text-brand-ink/55">The Digital Arm Behind Your Growth</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <div key={item.href} className="group relative px-1 py-1">
                  <Link
                    href={item.href}
                    className={cn(
                      'relative rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                      active ? 'text-brand-navy' : 'text-brand-ink/72 hover:bg-brand-navy/5 hover:text-brand-navy'
                    )}
                  >
                    {item.label}
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 overflow-hidden rounded-full bg-brand-navy/10" />
                    <motion.span
                      layoutId={active ? 'nav-indicator' : undefined}
                      className={cn('absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-gold', active ? 'opacity-100' : 'opacity-0')}
                    />
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-gold transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </div>
              )
            })}
          </nav>

          <div className="hidden lg:block">
            <div className="flex items-center gap-3">
              <Button href="/contact" size="md">
                Get Consultation
              </Button>
            </div>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-brand-navy/10 bg-white/90 text-brand-navy shadow-sm backdrop-blur lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            <motion.span animate={{ rotate: open ? 90 : 0, scale: open ? 1.05 : 1 }} transition={{ type: 'spring', stiffness: 240, damping: 20 }}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </button>
        </Container>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -24, x: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, x: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="origin-top border-b border-white/60 bg-white/92 shadow-xl backdrop-blur-2xl lg:hidden"
          >
            <Container className="py-5">
              <motion.div initial="hidden" animate="show" variants={staggerContainerFast} className="grid gap-2">
                {navItems.map((item) => (
                  <motion.div key={item.href} variants={fadeUp}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'block rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300',
                        pathname === item.href ? 'bg-brand-navy text-white shadow-soft' : 'bg-brand-sand text-brand-ink hover:bg-brand-gold/10 hover:text-brand-navy'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={fadeUp}>
                  <Button href="/contact" className="mt-2 w-full">
                    Get Consultation
                  </Button>
                </motion.div>
              </motion.div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}