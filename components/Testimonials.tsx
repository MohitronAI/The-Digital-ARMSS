"use client"

import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { testimonials } from '@/data/testimonials'
import { Button } from '@/components/ui/Button'
import { fadeIn, fadeUp, staggerContainerFast, wordStagger } from '@/lib/animations'

function QuoteText({ quote }: { quote: string }) {
  const letters = useMemo(() => quote.split(''), [quote])

  return (
    <motion.p variants={wordStagger(0.05)} initial="hidden" animate="show" className="text-balance font-display text-3xl italic leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
      {letters.map((letter, index) => (
        <motion.span key={`${letter}-${index}`} variants={fadeIn} className="inline-block">
          {letter === ' ' ? '\u00a0' : letter}
        </motion.span>
      ))}
    </motion.p>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-brand-gold">
      {Array.from({ length: rating }).map((_, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.6, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.24, delay: index * 0.08 }}
        >
          <Star className="h-5 w-5 fill-current" />
        </motion.span>
      ))}
    </div>
  )
}

export function Testimonials() {
  const total = testimonials.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const current = testimonials[index]

  useEffect(() => {
    if (paused) return

    const timer = window.setInterval(() => {
      setIndex((currentValue) => (currentValue + 1) % total)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [paused, total])

  const goNext = () => setIndex((currentValue) => (currentValue + 1) % total)
  const goPrev = () => setIndex((currentValue) => (currentValue - 1 + total) % total)

  return (
    <Section
      id="testimonials"
      eyebrow="Testimonials"
      title="What Our Clients Say"
      subtitle="A few words from partners who value strategy, responsiveness, and results."
      className="relative overflow-hidden bg-gradient-to-b from-white via-brand-sand/40 to-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.1),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(0,31,63,0.06),transparent_24%)]" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden border-white/60 bg-white p-0 shadow-[0_24px_80px_rgba(0,31,63,0.12)]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, filter: 'blur(8px)', y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col justify-between overflow-hidden bg-brand-navy p-8 text-white sm:p-10"
                >
                  <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,116,0.22),transparent_26%),linear-gradient(160deg,rgba(255,255,255,0.08),transparent_42%)]" animate={shouldReduceMotion ? undefined : { opacity: [0.72, 0.92, 0.72] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
                  <div className="relative z-10 space-y-8">
                    <Stars rating={current.rating} />
                    <QuoteText quote={current.quote} />
                    <motion.div initial="hidden" animate="show" variants={staggerContainerFast} className="flex items-center gap-4">
                      <motion.div
                        initial={{ clipPath: 'circle(0% at 50% 50%)', scale: 0.92 }}
                        animate={{ clipPath: 'circle(75% at 50% 50%)', scale: 1 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                      >
                        <Image src={current.image} alt={current.name} fill className="object-cover" sizes="56px" />
                      </motion.div>
                      <motion.div variants={fadeUp}>
                        <p className="font-semibold">{current.name}</p>
                        <p className="text-sm text-white/72">
                          {current.role} · {current.company}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                variants={staggerContainerFast}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-120px' }}
                className="flex flex-col justify-between p-8 sm:p-10"
              >
                <div className="space-y-6">
                  <motion.div variants={fadeUp}>
                    <p className="text-sm uppercase tracking-[0.28em] text-brand-gold">Client Spotlight</p>
                    <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-brand-navy">Trusted by growing brands across India</h3>
                  </motion.div>
                  <motion.p variants={fadeUp} className="max-w-xl text-base leading-7 text-brand-ink/72">
                    We stay close to the work, communicate clearly, and design around measurable business outcomes so clients know exactly what is changing and why.
                  </motion.p>
                  <motion.div variants={fadeUp} className="rounded-2xl border border-brand-gold/15 bg-brand-gold/8 p-4 text-sm leading-7 text-brand-ink/78">
                    The carousel crossfades automatically every five seconds, pauses on hover, and keeps the motion restrained so the content feels premium rather than busy.
                  </motion.div>
                </div>

                <motion.div
                  variants={fadeUp}
                  className="mt-10 flex flex-wrap items-center gap-3"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <Button variant="outline" size="sm" className="h-11 w-11 rounded-full p-0 hover:scale-110" onClick={goPrev} aria-label="Previous testimonial">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-11 w-11 rounded-full p-0 hover:scale-110" onClick={goNext} aria-label="Next testimonial">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="ml-auto flex items-center gap-2">
                    {testimonials.map((item, dotIndex) => {
                      const active = dotIndex === index
                      return (
                        <button
                          key={item.name}
                          type="button"
                          aria-label={`Show testimonial from ${item.name}`}
                          onClick={() => setIndex(dotIndex)}
                          className={`h-2.5 rounded-full transition-all duration-300 hover:scale-110 ${active ? 'w-8 bg-brand-gold' : 'w-2.5 bg-brand-navy/20 hover:bg-brand-gold/55'}`}
                        />
                      )
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
