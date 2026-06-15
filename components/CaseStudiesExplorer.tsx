"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Filter, ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { caseStudies, industries } from '@/data/caseStudies'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { paginate, truncate } from '@/lib/utils'

export function CaseStudiesExplorer() {
  const [industry, setIndustry] = useState('All')
  const [visibleCount, setVisibleCount] = useState(6)

  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((study) => industry === 'All' || study.industry === industry)
  }, [industry])

  const visibleCaseStudies = paginate(filteredCaseStudies, 1, visibleCount)

  return (
    <Section eyebrow="Case Studies" title="Selected work and measurable outcomes" subtitle="Filter by industry to explore how we adapt strategy, creative, and performance to different business contexts.">
      <Container>
        <div className="flex flex-wrap gap-2 rounded-3xl bg-white p-4 shadow-card">
          <Filter className="ml-1 mt-2 h-4 w-4 text-brand-gold" />
          {industries.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setIndustry(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${industry === item ? 'bg-brand-navy text-white' : 'bg-brand-sand text-brand-ink hover:bg-brand-gold/15'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCaseStudies.map((study) => (
            <Card key={study.slug} className="overflow-hidden">
              <Link href={`/case-studies/${study.slug}`} className="block h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={study.image} alt={study.title} fill className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1280px) 100vw, 33vw" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy">{study.industry}</div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">{study.duration}</p>
                  <h3 className="mt-3 text-2xl font-bold text-brand-navy">{study.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-ink/72">{truncate(study.description, 120)}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {study.metrics.slice(0, 4).map((metric) => (
                      <div key={metric.label} className="rounded-2xl bg-brand-sand p-3">
                        <p className="text-lg font-bold text-brand-navy">{metric.value}</p>
                        <p className="mt-1 text-xs text-brand-ink/62">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold">
                    View Full
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {visibleCaseStudies.length < filteredCaseStudies.length ? (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" onClick={() => setVisibleCount((count) => count + 3)}>
              Load More Case Studies
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  )
}