"use client"

import { ArrowRight, Sparkles, Wand2 } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { fadeUp, letterBounce, scaleIn, slowGradient, subtleGradientShift, wordStagger } from '@/lib/animations'

interface HeroCta {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

interface HeroProps {
  title: string
  subtitle: string
  eyebrow?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  mode?: 'home' | 'page'
  className?: string
}

function splitTitle(title: string) {
  return title.trim().split(/\s+/)
}

export function Hero({
  title,
  subtitle,
  eyebrow = 'Premium Digital Marketing Agency in Pune',
  primaryCta = { label: 'Get Free Consultation', href: '/contact' },
  secondaryCta = { label: 'View Our Work', href: '#case-studies', variant: 'outline' },
  mode = 'home',
  className
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 260], [1, 0])
  const heroY = useTransform(scrollY, [0, 260], [0, 56])
  const backgroundY = useTransform(scrollY, [0, 900], [0, 180])
  const contentY = useTransform(scrollY, [0, 900], [0, 40])
  const cardY = useTransform(scrollY, [0, 900], [0, -34])
  const isHome = mode === 'home'

  const shapes = useMemo(
    () => [
      { className: 'left-[8%] top-[18%] h-24 w-24 rounded-[2rem] bg-brand-gold/18 blur-xl', duration: 12, offset: 0 },
      { className: 'right-[10%] top-[20%] h-32 w-32 rounded-full bg-white/10 blur-2xl', duration: 14, offset: 1.8 },
      { className: 'left-[20%] bottom-[12%] h-20 w-20 rounded-[1.5rem] bg-white/12 blur-xl', duration: 16, offset: 3.2 }
    ],
    []
  )

  const titleWords = splitTitle(title)

  return (
    <motion.section
      style={{ opacity: heroOpacity, y: heroY }}
      className={cn(
        'relative isolate overflow-hidden',
        isHome ? 'min-h-[100svh] bg-brand-navy text-white' : 'bg-gradient-to-br from-brand-navy via-[#00244a] to-[#001629] py-24 text-white sm:py-28',
        className
      )}
    >
      <motion.div className="absolute inset-0 bg-hero-gradient opacity-90" style={{ y: backgroundY, backgroundSize: '220% 220%' }} animate={shouldReduceMotion ? undefined : slowGradient} />
      <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,165,116,0.24),transparent_0_24%),radial-gradient(circle_at_80%_14%,rgba(255,255,255,0.16),transparent_0_18%),linear-gradient(125deg,rgba(255,255,255,0.05)_0%,transparent_18%,transparent_82%,rgba(255,255,255,0.06)_100%)]" style={{ y: backgroundY }} animate={shouldReduceMotion ? undefined : subtleGradientShift} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-15 [mask-image:radial-gradient(circle_at_center,black,transparent_84%)]" />

      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          aria-hidden
          className={cn('absolute', shape.className)}
          animate={shouldReduceMotion ? undefined : { y: [0, -14, 0], x: [0, 10, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: shape.duration, repeat: Infinity, ease: 'easeInOut', delay: shape.offset }}
        />
      ))}

      <Container className={cn('relative z-10 flex min-h-[100svh] items-center', isHome ? 'py-28 sm:py-32' : 'py-0')}>
        <div className={cn('grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]', isHome ? 'pt-12' : 'pt-0')}>
          <motion.div style={{ y: contentY }} className="mx-auto max-w-[900px] text-center lg:mx-0 lg:text-left">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
            >
              <Sparkles className="h-4 w-4" />
              {eyebrow}
            </motion.p>

            <motion.div variants={wordStagger(0.18)} initial="hidden" animate="show" className="mt-8 space-y-6">
              <motion.div variants={scaleIn} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/82 backdrop-blur-md">
                <Wand2 className="h-4 w-4 text-brand-gold" />
                Premium growth systems for ambitious brands
              </motion.div>

              <motion.h1
                variants={wordStagger(0.22)}
                initial="hidden"
                animate="show"
                style={{ perspective: 1200 }}
                className={cn('mx-auto max-w-[900px] text-5xl font-bold tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl xl:text-[4.3rem] xl:leading-[0.95] lg:mx-0', isHome && 'max-w-[900px]')}
              >
                {titleWords.map((word, wordIndex) => (
                  <span key={`${word}-${wordIndex}`} className="inline-block pr-[0.28em] last:pr-0">
                    {word.split('').map((letter, letterIndex) => (
                      <motion.span
                        key={`${word}-${wordIndex}-${letterIndex}`}
                        variants={letterBounce}
                        className={cn('inline-block', wordIndex === 0 && letterIndex === 0 ? 'text-brand-gold' : 'text-white')}
                        transition={{ delay: 0.22 + wordIndex * 0.18 + letterIndex * 0.025 }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" className="mx-auto max-w-2xl text-balance text-lg leading-8 text-white/78 sm:text-xl lg:mx-0">
                {subtitle}
              </motion.p>

              <motion.div variants={wordStagger(0.36)} initial="hidden" animate="show" className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/72 lg:justify-start">
                {['SEO', 'Social', 'Content', 'Web'].map((item) => (
                  <motion.span key={item} variants={scaleIn} className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 backdrop-blur-sm">
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={wordStagger(0.44)} initial="hidden" animate="show" className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              {primaryCta ? (
                <motion.div variants={scaleIn} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button href={primaryCta.href} variant={primaryCta.variant ?? 'primary'} size="lg">
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : null}
              {secondaryCta ? (
                <motion.div variants={scaleIn} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button href={secondaryCta.href} variant={secondaryCta.variant ?? 'outline'} size="lg" className="border-white/20 text-white hover:bg-brand-gold hover:text-white">
                    {secondaryCta.label}
                  </Button>
                </motion.div>
              ) : null}
            </motion.div>

            {isHome ? (
              <motion.div variants={wordStagger(0.52)} initial="hidden" animate="show" className="mt-12 grid max-w-3xl grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                {['Strategic Growth', 'Premium Creative', 'Fast Delivery', 'Measurable ROI'].map((item) => (
                  <motion.div key={item} variants={scaleIn} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-center text-white/85 backdrop-blur">
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </motion.div>

          <motion.div
            aria-hidden
            className="relative hidden lg:block"
            style={{ y: cardY }}
            initial={{ opacity: 0, x: 32, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative isolate rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.32),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_32%)]" />
              <div className="relative space-y-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-gold/90">Growth Pulse</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em]">Strategic clarity. Faster traction.</h3>
                  </div>
                  <motion.div animate={shouldReduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, 4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="rounded-full bg-brand-gold/18 p-3 text-brand-gold">
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Conversion Lift', value: '+43%' },
                    { label: 'Organic Growth', value: '+128%' },
                    { label: 'Avg. ROI', value: '300%' },
                    { label: 'Speed Score', value: '98/100' }
                  ].map((metric, index) => (
                    <motion.div key={metric.label} variants={scaleIn} custom={index} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/50">{metric.label}</p>
                      <p className="mt-2 font-display text-3xl font-bold text-brand-gold">{metric.value}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="rounded-2xl border border-brand-gold/20 bg-brand-navy/40 p-4 text-sm leading-7 text-white/82">
                  Premium visuals, motion-led storytelling, and focused conversion journeys built for agencies that want to look and feel expensive.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  )
}
