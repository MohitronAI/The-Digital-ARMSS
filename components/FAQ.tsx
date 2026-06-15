"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { fadeUp, slideInLeft, staggerContainerFast } from '@/lib/animations'

const faqs = [
  {
    question: 'What makes The Digital ARMSS different?',
    answer: 'We combine brand strategy, creative quality, and performance execution in one team, so the work is cohesive from first impression to conversion.'
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Paid and conversion improvements can appear quickly, while SEO and brand growth compound over a few months as the system matures.'
  },
  {
    question: 'What is the minimum project duration?',
    answer: 'Most engagements start with a 90-day foundation sprint so there is enough time to implement, measure, and optimize meaningfully.'
  },
  {
    question: 'Do you work outside Pune?',
    answer: 'Yes. We are based in Pune, but we work with clients across India and internationally through a remote-friendly process.'
  },
  {
    question: 'What reports do you provide?',
    answer: 'You get clear performance reporting focused on the metrics that matter: visibility, engagement, leads, conversions, and ROI.'
  },
  {
    question: 'Can you work with our internal team?',
    answer: 'Absolutely. We can support internal teams, lead execution, or design a hybrid model based on your capacity and goals.'
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Frequently Asked Questions"
      subtitle="Quick answers to the questions we hear most often before a project begins."
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#fafafa] to-brand-sand/50"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(0,31,63,0.05),transparent_26%)]" />
      <Container className="relative z-10">
        <motion.div variants={staggerContainerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index

            return (
              <motion.div key={faq.question} variants={fadeUp} whileHover={{ y: -2 }} className="relative">
                <Card className={`group overflow-hidden border transition-all duration-300 ${open ? 'border-brand-gold/35 shadow-[0_18px_50px_rgba(0,31,63,0.1)]' : 'border-white/70 shadow-md hover:border-brand-gold/20 hover:shadow-xl'}`}>
                  <motion.div
                    className={`absolute left-0 top-0 h-full w-1 origin-top bg-brand-gold transition-all duration-300 ${open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
                    initial={false}
                    animate={{}}
                  />
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 sm:px-7 ${open ? 'bg-brand-gold/5' : 'hover:bg-brand-sand/60'}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className="text-[18px] font-bold tracking-[-0.01em] text-brand-navy sm:text-[20px]">{faq.question}</span>
                    <motion.span animate={{ rotate: open ? 180 : 0, scale: open ? 1.05 : 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="shrink-0 text-brand-gold">
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        id={`faq-panel-${index}`}
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-brand-gold/15 px-6 pb-6 pt-5 text-sm leading-7 text-brand-ink/72 sm:px-7 sm:text-base">
                          <motion.div variants={slideInLeft} initial="hidden" animate="show" className="rounded-2xl bg-brand-gold/8 p-4">
                            {faq.answer}
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}
