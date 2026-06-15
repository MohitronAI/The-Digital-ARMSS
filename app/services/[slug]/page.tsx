import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { services } from '@/data/services'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Hero } from '@/components/Hero'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

interface ServicePageProps {
  params: { slug: string }
}

export const dynamic = 'force-dynamic'

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = services.find((item) => item.slug === params.slug)
  if (!service) return { title: 'Service not found' }
  return {
    title: service.name,
    description: service.description
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((item) => item.slug === params.slug)
  if (!service) notFound()

  return (
    <>
      <Hero
        mode="page"
        eyebrow="Service Detail"
        title={service.name}
        subtitle={service.description}
        primaryCta={{ label: 'Get This Service', href: '/contact' }}
        secondaryCta={{ label: 'Back to Services', href: '/services', variant: 'outline' }}
      />

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">Overview</p>
              <p className="mt-4 text-base leading-8 text-brand-ink/76 sm:text-lg">{service.overview}</p>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-brand-navy">What we do</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-ink/72 sm:text-base">
                  {service.whatWeDo.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <div className="space-y-5">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-brand-navy">Benefits</h3>
                <div className="mt-4 space-y-3">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="rounded-2xl bg-brand-sand p-4 text-sm leading-7 text-brand-ink/72">
                      {benefit}
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-brand-navy">Case Study Example</h3>
                <p className="mt-4 text-sm leading-7 text-brand-ink/72">{service.caseStudyExample}</p>
              </Card>

              <Button href="/contact" className="w-full" size="lg">
                Schedule a Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" eyebrow="Our Process" title="A clear five-step engagement model" subtitle="We keep every engagement structured, transparent, and focused on measurable progress.">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {service.process.map((step, index) => (
              <Card key={step.title} className="p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">Step {index + 1}</p>
                <h3 className="mt-3 text-lg font-bold text-brand-navy">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-ink/72">{step.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}