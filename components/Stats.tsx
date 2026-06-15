"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { formatNumber } from '@/lib/utils'
import { fadeUp, staggerContainerFast, subtleGradientShift } from '@/lib/animations'

const stats = [
  { label: 'Clients', value: 50, suffix: '+' },
  { label: 'Projects', value: 200, suffix: '+' },
  { label: 'Average ROI', value: 300, suffix: '%' },
  { label: 'Years in Business', value: 5, suffix: '+' }
]

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [current, setCurrent] = useState(0)
  const [complete, setComplete] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-120px 0px' })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (shouldReduceMotion) {
      setCurrent(value)
      setComplete(true)
      return
    }

    const duration = 2000
    const start = performance.now()
    let frameId = 0

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      setCurrent(Math.round(value * progress))
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      } else {
        setComplete(true)
      }
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [inView, shouldReduceMotion, value])

  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      <motion.span key={current} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
        {formatNumber(current)}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, scale: 0.7 }}
        animate={complete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.25, delay: 0.08 }}
        className="text-brand-gold"
      >
        {suffix}
      </motion.span>
    </span>
  )
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-24 text-white sm:py-28">
      <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,116,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_22%,rgba(255,255,255,0.02))]" animate={subtleGradientShift} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:90px_90px] opacity-10 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      <Container className="relative z-10">
        <motion.div variants={staggerContainerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} className="grid gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_28px_90px_rgba(0,0,0,0.18)] md:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-white/10">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={fadeUp} transition={{ duration: 0.45, delay: index * 0.08 }} className="p-7 text-center sm:p-8">
              <Card className="border-white/10 bg-white/6 p-0 shadow-none backdrop-blur-sm">
                <div className="rounded-[2rem] p-6 sm:p-8">
                  <div className="font-display text-5xl font-bold tracking-[-0.03em] text-white sm:text-6xl lg:text-[4rem]">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
