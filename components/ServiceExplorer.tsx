"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock3, Lightbulb, Rocket } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { ServiceCard } from '@/components/ServiceCard'
import { services } from '@/data/services'
import type { Service } from '@/types'

export function ServiceExplorer() {
  const [selectedSlug, setSelectedSlug] = useState<Service['slug']>(services[0].slug)
  const selectedService = useMemo(() => services.find((service) => service.slug === selectedSlug) ?? services[0], [selectedSlug])

  return (
    <Section
      eyebrow="All Services"
      title="Explore Every Capability"
      subtitle="Tap a service to expand the details, process, and example outcomes behind each offering."
    >
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              compact
              selected={service.slug === selectedService.slug}
              onClick={() => setSelectedSlug(service.slug)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedService.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-10"
          >
            <Card className="overflow-hidden p-0 shadow-soft">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="bg-brand-navy p-8 text-white sm:p-10">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Deep Dive</p>
                  <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{selectedService.name}</h3>
                  <p className="mt-4 max-w-2xl text-white/76">{selectedService.overview}</p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {selectedService.benefits.map((benefit) => (
                      <div key={benefit} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                        <CheckCircle2 className="mb-3 h-5 w-5 text-brand-gold" />
                        <p className="text-sm leading-6 text-white/84">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 p-8 sm:p-10">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">What We Do</p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-brand-ink/75">
                      {selectedService.whatWeDo.map((item) => (
                        <li key={item} className="flex gap-3">
                          <Rocket className="mt-1 h-4 w-4 shrink-0 text-brand-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">Our Process</p>
                    <div className="mt-4 grid gap-3">
                      {selectedService.process.map((step, index) => (
                        <div key={step.title} className="flex gap-4 rounded-2xl bg-brand-sand p-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-navy">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-brand-navy">{step.title}</p>
                            <p className="mt-1 text-sm leading-6 text-brand-ink/70">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-brand-navy/10 p-4">
                      <Lightbulb className="h-5 w-5 text-brand-gold" />
                      <p className="mt-3 text-sm font-semibold text-brand-navy">Example Outcome</p>
                      <p className="mt-2 text-sm leading-6 text-brand-ink/70">{selectedService.caseStudyExample}</p>
                    </div>
                    <div className="rounded-2xl border border-brand-navy/10 p-4">
                      <Clock3 className="h-5 w-5 text-brand-gold" />
                      <p className="mt-3 text-sm font-semibold text-brand-navy">Typical Engagement</p>
                      <p className="mt-2 text-sm leading-6 text-brand-ink/70">Designed for sustained performance improvements over a 90-day foundation sprint and beyond.</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">Frequently Asked</p>
                    <div className="mt-4 space-y-4">
                      {selectedService.faq.map((item) => (
                        <div key={item.question} className="rounded-2xl bg-brand-sand p-4">
                          <p className="font-semibold text-brand-navy">{item.question}</p>
                          <p className="mt-2 text-sm leading-6 text-brand-ink/70">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  )
}