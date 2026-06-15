import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { caseStudies } from '@/data/caseStudies'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/ui/Section'

interface CaseStudyPageProps {
  params: { slug: string }
}

export const dynamic = 'force-dynamic'

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const study = caseStudies.find((item) => item.slug === params.slug)
  if (!study) return { title: 'Case study not found' }
  return {
    title: study.title,
    description: study.description
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = caseStudies.find((item) => item.slug === params.slug)
  if (!study) notFound()

  const similarStudies = caseStudies.filter((item) => item.slug !== study.slug && item.industry === study.industry).slice(0, 3)

  return (
    <>
      <Hero
        mode="page"
        eyebrow={study.industry}
        title={study.title}
        subtitle={study.description}
        primaryCta={{ label: 'Start a Project', href: '/contact' }}
        secondaryCta={{ label: 'All Case Studies', href: '/case-studies', variant: 'outline' }}
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {study.metrics.map((metric) => (
              <Card key={metric.label} className="p-6 text-center">
                <p className="font-display text-4xl font-bold text-brand-navy">{metric.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-brand-gold">{metric.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white" eyebrow="Case Background" title="The challenge, solution, and results" subtitle="A concise summary of how we approached the engagement.">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="p-7">
              <h3 className="text-xl font-bold text-brand-navy">Client Background</h3>
              <p className="mt-4 text-sm leading-7 text-brand-ink/72">{study.clientName} needed a stronger digital engine to support business growth and improve the quality of inbound demand.</p>
            </Card>
            <Card className="p-7">
              <h3 className="text-xl font-bold text-brand-navy">Challenge</h3>
              <p className="mt-4 text-sm leading-7 text-brand-ink/72">{study.challenge}</p>
            </Card>
            <Card className="p-7">
              <h3 className="text-xl font-bold text-brand-navy">Solution</h3>
              <p className="mt-4 text-sm leading-7 text-brand-ink/72">{study.solution}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section eyebrow="Process" title="A practical plan, implemented step by step." subtitle="We keep the work structured so the client always knows what is happening and why.">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {study.timeline.map((step) => (
              <Card key={step.label} className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">{step.label}</p>
                <p className="mt-3 text-sm leading-7 text-brand-ink/72">{step.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white" eyebrow="Results" title="The outcomes were measurable and meaningful." subtitle="We focus on the metrics that change the business, not just the metrics that look good on a slide.">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <Card className="overflow-hidden p-0 shadow-soft">
              <div className="relative aspect-[4/3]">
                <Image src={study.image} alt={study.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </Card>
            <Card className="p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-brand-gold">Results Summary</p>
              <p className="mt-4 text-base leading-8 text-brand-ink/76">{study.results}</p>
              <div className="mt-8 space-y-4">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between rounded-2xl bg-brand-sand px-4 py-4">
                    <span className="font-medium text-brand-navy">{metric.label}</span>
                    <span className="font-bold text-brand-gold">{metric.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-brand-gold/25 bg-brand-gold/10 p-5">
                <CheckCircle2 className="h-6 w-6 text-brand-gold" />
                <p className="mt-3 text-sm leading-7 text-brand-ink/76">“{study.testimonial}”</p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {similarStudies.length > 0 ? (
        <Section eyebrow="Similar Projects" title="More work from the same quality bar" subtitle="Browse related case studies to see how our approach adapts across sectors.">
          <Container>
            <div className="grid gap-6 md:grid-cols-3">
              {similarStudies.map((similar) => (
                <Card key={similar.slug} className="overflow-hidden">
                  <a href={`/case-studies/${similar.slug}`}>
                    <div className="relative aspect-[4/3]">
                      <Image src={similar.image} alt={similar.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="p-5">
                      <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">{similar.industry}</p>
                      <h3 className="mt-3 text-xl font-bold text-brand-navy">{similar.title}</h3>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold">
                        View Full
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  )
}