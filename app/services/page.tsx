import { Hero } from '@/components/Hero'
import { ServiceExplorer } from '@/components/ServiceExplorer'

export default function ServicesPage() {
  return (
    <>
      <Hero
        mode="page"
        eyebrow="Services"
        title="Every service designed for measurable growth."
        subtitle="Explore the six service pillars that power our premium digital marketing engagements."
        primaryCta={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCta={{ label: 'See Case Studies', href: '/case-studies', variant: 'outline' }}
      />
      <ServiceExplorer />
    </>
  )
}