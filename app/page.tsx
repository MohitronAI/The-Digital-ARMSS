import { Hero } from '@/components/Hero'
import { Stats } from '@/components/Stats'
import { Services } from '@/components/Services'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { FeaturedCaseStudy } from '@/components/FeaturedCaseStudy'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero
        title="The Digital ARMSS"
        subtitle="Strategic digital marketing solutions for brands that want a clearer position, stronger visibility, and more qualified growth."
        primaryCta={{ label: 'Get Free Consultation', href: '/contact' }}
        secondaryCta={{ label: 'View Our Work', href: '#case-studies', variant: 'outline' }}
      />
      <Stats />
      <Services />
      <WhyChooseUs />
      <FeaturedCaseStudy />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  )
}