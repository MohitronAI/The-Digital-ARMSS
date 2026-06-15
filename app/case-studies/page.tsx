import { Hero } from '@/components/Hero'
import { CaseStudiesExplorer } from '@/components/CaseStudiesExplorer'

export default function CaseStudiesPage() {
  return (
    <>
      <Hero
        mode="page"
        eyebrow="Case Studies"
        title="Selected projects with measurable outcomes."
        subtitle="Explore how strategy, messaging, and execution came together across different industries."
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        secondaryCta={{ label: 'Read the Blog', href: '/blog', variant: 'outline' }}
      />
      <CaseStudiesExplorer />
    </>
  )
}