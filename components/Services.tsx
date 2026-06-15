"use client"

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { services } from '@/data/services'
import { ServiceCard } from '@/components/ServiceCard'
import { fadeUp, staggerContainerFast } from '@/lib/animations'

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Our Core Services"
      subtitle="A focused six-service system designed to improve visibility, build trust, and turn digital attention into qualified growth."
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#fafafa] to-brand-sand/50"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,116,0.1),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(0,31,63,0.06),transparent_30%)]" />
      <Container>
        <motion.div variants={staggerContainerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <ServiceCard service={service} compact href={`/services/${service.slug}`} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}