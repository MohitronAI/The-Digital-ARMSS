export type ServiceIconName = 'Search' | 'Share2' | 'PenTool' | 'Mail' | 'LayoutTemplate' | 'Sparkles'

export type ServiceSlug =
  | 'seo-sem'
  | 'social-media-marketing'
  | 'content-marketing'
  | 'email-marketing'
  | 'web-design-development'
  | 'brand-strategy'

export type CaseStudyIndustry =
  | 'Manufacturing'
  | 'Healthcare'
  | 'SaaS'
  | 'Professional Services'
  | 'Retail'
  | 'Fintech'

export type BlogCategory = 'Brand Strategy' | 'SEO' | 'Web Design' | 'Email Marketing' | 'SaaS' | 'Strategy'

export interface ServiceProcessStep {
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Service {
  slug: ServiceSlug
  name: string
  icon: ServiceIconName
  shortDescription: string
  description: string
  overview: string
  whatWeDo: string[]
  benefits: string[]
  process: ServiceProcessStep[]
  caseStudyExample: string
  faq: FAQItem[]
}

export interface CaseStudyMetric {
  label: string
  value: string
}

export interface CaseStudyTimelineItem {
  label: string
  description: string
}

export interface CaseStudy {
  slug: string
  title: string
  clientName: string
  industry: CaseStudyIndustry
  duration: string
  category: string
  description: string
  challenge: string
  solution: string
  results: string
  testimonial: string
  clientLogo: string
  image: string
  metrics: CaseStudyMetric[]
  timeline: CaseStudyTimelineItem[]
  tags: string[]
}

export interface BlogPost {
  slug: string
  title: string
  category: BlogCategory
  excerpt: string
  author: string
  date: string
  readTime: string
  image: string
  markdown: string
  featured?: boolean
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export interface Testimonial {
  name: string
  company: string
  role: string
  quote: string
  image: string
  rating: number
}

export interface NavLink {
  label: string
  href: string
}

export interface ContactFormValues {
  fullName: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
  privacy: boolean
}
