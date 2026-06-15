"use client"

import { Award, BarChart3, HeadphonesIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { fadeUp, slideInLeft, slideInRight, staggerContainerFast } from '@/lib/animations'

const benefits = [
  {
    icon: BarChart3,
    title: 'Data-Driven Strategies',
    description: 'Every decision is backed by real performance data, not assumptions or generic playbooks.'
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Our campaigns are built to produce measurable ROI gains, not just activity or impressions.'
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    description: 'You get a responsive, strategic partner that stays close to the work and the outcomes.'
  }
]

export function WhyChooseUs() {
  return (
    <Section
      id="why-choose-us"
      className="relative overflow-hidden bg-brand-navy text-white"
      eyebrow="Why Choose Us"
      title="Strategy, execution, and accountability in one team."
      subtitle="We combine brand thinking, performance marketing, and premium creative execution to help businesses scale with confidence."
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%)]" />
      <Container>
        <motion.div variants={staggerContainerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div key={benefit.title} variants={index % 2 === 0 ? slideInLeft : slideInRight} transition={{ duration: 0.5, delay: index * 0.08 }}>
                <Card className="group h-full border-white/10 bg-white/6 p-7 text-white shadow-none backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/10">
                  <motion.div whileHover={{ scale: 1.08, rotate: 6 }} transition={{ type: 'spring', stiffness: 240, damping: 16 }} className="inline-flex rounded-2xl bg-brand-gold/10 p-3 text-brand-gold">
                    <Icon className="h-10 w-10" />
                  </motion.div>
                  <motion.h3 variants={fadeUp} className="mt-5 text-2xl font-bold tracking-[-0.02em]">
                    {benefit.title}
                  </motion.h3>
                  <motion.p variants={fadeUp} className="mt-3 leading-7 text-white/74">
                    {benefit.description}
                  </motion.p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}