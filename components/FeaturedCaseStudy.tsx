"use client"

import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { caseStudies } from '@/data/caseStudies'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { fadeUp, slideInLeft, staggerContainerFast } from '@/lib/animations'

const featured = caseStudies[0]

export function FeaturedCaseStudy() {
  return (
    <Section
      id="case-studies"
      eyebrow="Featured Case Study"
      title="Real results from a premium growth system"
      subtitle="A look at how strategy, search, and conversion-focused design worked together to improve qualified lead flow."
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#fbfbfb] to-brand-sand/40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,116,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(0,31,63,0.06),transparent_26%)]" />
      <Container>
        <Card className="overflow-hidden border-white/70 p-0 shadow-[0_24px_80px_rgba(0,31,63,0.12)]">
          <div className="grid gap-0 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[320px] overflow-hidden lg:min-h-[560px]"
            >
              <motion.div whileInView={{ scale: 1.05 }} viewport={{ once: true, margin: '-120px' }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
                <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/25 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand-navy">{featured.industry}</div>
            </motion.div>

            <motion.div variants={staggerContainerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} className="p-8 sm:p-10">
              <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
                {featured.duration}
              </motion.p>
              <motion.h3 variants={slideInLeft} className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-brand-navy sm:text-4xl">
                {featured.title}
              </motion.h3>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {featured.metrics.slice(0, 4).map((metric, index) => (
                  <motion.div key={metric.label} variants={fadeUp} transition={{ duration: 0.4, delay: index * 0.08 }} className="rounded-2xl border border-brand-gold/12 bg-brand-sand p-4">
                    <p className="text-2xl font-bold text-brand-gold">{metric.value}</p>
                    <p className="mt-1 text-sm text-brand-ink/70">{metric.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={staggerContainerFast} className="mt-8 space-y-5 text-sm leading-7 text-brand-ink/76 sm:text-base">
                <motion.div variants={fadeUp}>
                  <p className="font-semibold text-brand-navy">Challenge</p>
                  <p className="mt-2">{featured.challenge}</p>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <p className="font-semibold text-brand-navy">Solution</p>
                  <p className="mt-2">{featured.solution}</p>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <p className="font-semibold text-brand-navy">Results</p>
                  <p className="mt-2">{featured.results}</p>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href={`/case-studies/${featured.slug}`} className="bg-gradient-to-r from-brand-gold to-[#e1b98c] hover:shadow-[0_18px_45px_rgba(212,165,116,0.3)]">
                  View Full Case Study
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-3 rounded-lg bg-brand-sand px-4 py-3 text-sm text-brand-ink/70">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                  Built for measurable growth, not vanity metrics
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </Container>
    </Section>
  )
}