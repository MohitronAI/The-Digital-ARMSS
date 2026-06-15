import { Hero } from '@/components/Hero'
import { BlogExplorer } from '@/components/BlogExplorer'

export default function BlogPage() {
  return (
    <>
      <Hero
        mode="page"
        eyebrow="Blog"
        title="Practical ideas for digital growth."
        subtitle="Read strategy notes, SEO tips, web design insights, and content frameworks written for teams that want better outcomes."
        primaryCta={{ label: 'Talk to Us', href: '/contact' }}
        secondaryCta={{ label: 'Case Studies', href: '/case-studies', variant: 'outline' }}
      />
      <BlogExplorer />
    </>
  )
}