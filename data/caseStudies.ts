import { CaseStudy } from '@/types'

export const caseStudies: CaseStudy[] = [
  {
    slug: 'atlas-industries-lead-growth',
    title: 'Atlas Industries Lead Growth',
    clientName: 'Atlas Industries',
    industry: 'Manufacturing',
    duration: '6 months',
    category: 'Manufacturing',
    description: 'A search and content overhaul that turned a low-intent website into a reliable lead-generation engine for a fast-growing industrial business.',
    challenge: 'Atlas Industries had strong capability but weak digital visibility. Organic traffic was low, paid spend was inefficient, and enquiries lacked quality.',
    solution: 'We rebuilt the search strategy, rewrote service pages, launched targeted campaigns, and introduced conversion-focused messaging across the site.',
    results: 'Qualified enquiries rose sharply while acquisition costs fell, giving the sales team a better pipeline and more predictable monthly growth.',
    testimonial: 'The new site and campaigns changed the quality of our leads almost immediately. We now have a clear system for growth.',
    clientLogo: 'Atlas',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Lead growth', value: '184%' },
      { label: 'Cost per lead', value: '-37%' },
      { label: 'Organic traffic', value: '+128%' },
      { label: 'Conversion rate', value: '+61%' }
    ],
    timeline: [
      { label: 'Month 1', description: 'Discovery, analytics review, and search audit.' },
      { label: 'Month 2', description: 'Messaging, keyword mapping, and new landing page structure.' },
      { label: 'Month 3', description: 'Campaign launch and content deployment.' },
      { label: 'Month 4', description: 'Optimizations based on lead quality and cost trends.' }
    ],
    tags: ['Manufacturing', 'SEO', 'SEM']
  },
  {
    slug: 'meridian-health-social-reach',
    title: 'Meridian Health Social Reach',
    clientName: 'Meridian Health',
    industry: 'Healthcare',
    duration: '4 months',
    category: 'Healthcare',
    description: 'A social-first growth campaign that improved awareness and appointment enquiries for a multi-location healthcare provider.',
    challenge: 'The brand had trust but limited social engagement and inconsistent campaign structure across channels.',
    solution: 'We launched a pillar-based content system, improved creative consistency, and supported with paid retargeting.',
    results: 'Audience growth and enquiry volume both increased, with especially strong performance from short-form educational content.',
    testimonial: 'The campaign made our services easier to understand and gave us a steady flow of inquiries from social.',
    clientLogo: 'Meridian',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Reach', value: '+312%' },
      { label: 'Engagement', value: '+146%' },
      { label: 'Appointment enquiries', value: '+84%' },
      { label: 'Follower growth', value: '+95%' }
    ],
    timeline: [
      { label: 'Week 1', description: 'Audience and content audit.' },
      { label: 'Week 2', description: 'Creative system and posting framework.' },
      { label: 'Week 3', description: 'Launch of evergreen and campaign content.' },
      { label: 'Week 4+', description: 'Iterative optimization and community management.' }
    ],
    tags: ['Healthcare', 'Social Media']
  },
  {
    slug: 'nova-saas-content-engine',
    title: 'Nova SaaS Content Engine',
    clientName: 'Nova SaaS',
    industry: 'SaaS',
    duration: '8 months',
    category: 'SaaS',
    description: 'A content system that supported SEO, demand generation, and product education for a B2B SaaS startup.',
    challenge: 'Nova needed credible educational content that could rank, attract demos, and support the sales team.',
    solution: 'We built a content roadmap around buying-stage intent and launched a consistent publishing cadence with conversion-focused internal links.',
    results: 'Organic signups increased, demo calls improved, and the content library became a core growth asset.',
    testimonial: 'ARMSS gave our content clear commercial purpose. We now have a content engine, not just blogs.',
    clientLogo: 'Nova',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Organic signups', value: '+210%' },
      { label: 'Demo conversions', value: '+73%' },
      { label: 'Keyword rankings', value: '+156' },
      { label: 'Time on page', value: '+49%' }
    ],
    timeline: [
      { label: 'Phase 1', description: 'Audience research and content mapping.' },
      { label: 'Phase 2', description: 'Editorial calendar and SEO outlines.' },
      { label: 'Phase 3', description: 'Long-form content production and optimization.' },
      { label: 'Phase 4', description: 'Performance tracking and content refresh cycles.' }
    ],
    tags: ['SaaS', 'Content Marketing']
  },
  {
    slug: 'aurora-consulting-website-rebuild',
    title: 'Aurora Consulting Website Rebuild',
    clientName: 'Aurora Consulting',
    industry: 'Professional Services',
    duration: '10 weeks',
    category: 'Professional Services',
    description: 'A premium website redesign focused on positioning, clarity, and stronger lead conversion for a consulting firm.',
    challenge: 'Aurora had expertise but a dated website that failed to communicate credibility or drive enquiries effectively.',
    solution: 'We restructured the brand story, created a modern design system, and built a fast, responsive website with clearer conversion paths.',
    results: 'The redesigned experience increased enquiry volume and improved perceptions of premium quality.',
    testimonial: 'The site finally looks and feels like the level of expertise we deliver to clients.',
    clientLogo: 'Aurora',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Conversion uplift', value: '+43%' },
      { label: 'Bounce rate', value: '-29%' },
      { label: 'Page speed', value: '98/100' },
      { label: 'Qualified enquiries', value: '+68%' }
    ],
    timeline: [
      { label: 'Discovery', description: 'Interviews, content audit, and analytics review.' },
      { label: 'Structure', description: 'Messaging architecture and conversion mapping.' },
      { label: 'Design', description: 'Visual system and page composition.' },
      { label: 'Build', description: 'Next.js development and QA launch.' }
    ],
    tags: ['Professional Services', 'Web Design']
  },
  {
    slug: 'zenith-retail-email-automation',
    title: 'Zenith Retail Email Automation',
    clientName: 'Zenith Retail',
    industry: 'Retail',
    duration: '5 months',
    category: 'Retail',
    description: 'A lifecycle email program that improved retention, repeat purchases, and reactivation for a premium retail brand.',
    challenge: 'Zenith had a strong customer base but underused email and poor segmentation across campaigns.',
    solution: 'We introduced a segmented email framework, automated lifecycle flows, and better campaign storytelling.',
    results: 'Repeat purchases and reactivation improved while unsubscribes stayed low and engagement remained strong.',
    testimonial: 'Our email channel is finally working as a proper revenue and retention driver.',
    clientLogo: 'Zenith',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Revenue from email', value: '+39%' },
      { label: 'Open rate', value: '42%' },
      { label: 'Click rate', value: '+58%' },
      { label: 'Reactivation', value: '+76%' }
    ],
    timeline: [
      { label: 'Audit', description: 'List, flow, and segmentation review.' },
      { label: 'Build', description: 'Automations, templates, and copywriting.' },
      { label: 'Launch', description: 'Welcome, nurture, and reactivation sequences.' },
      { label: 'Test', description: 'Ongoing optimization and campaign iteration.' }
    ],
    tags: ['Retail', 'Email Marketing']
  },
  {
    slug: 'pulse-finance-brand-strategy',
    title: 'Pulse Finance Brand Strategy',
    clientName: 'Pulse Finance',
    industry: 'Fintech',
    duration: '7 weeks',
    category: 'Fintech',
    description: 'A brand strategy engagement that clarified positioning, language, and market differentiation for a growing fintech company.',
    challenge: 'The business had strong product-market fit but messaging was too generic to stand out in a crowded category.',
    solution: 'We defined a sharper positioning framework, rewrote the brand narrative, and gave the internal team a clearer voice.',
    results: 'The brand now communicates more confidence, improves trust, and supports stronger marketing execution.',
    testimonial: 'The strategy gave us clarity across every channel. It changed how we talk about our value.',
    clientLogo: 'Pulse',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Brand clarity', value: '10/10' },
      { label: 'Message alignment', value: '+64%' },
      { label: 'Lead quality', value: '+31%' },
      { label: 'Stakeholder confidence', value: 'High' }
    ],
    timeline: [
      { label: 'Workshop', description: 'Brand discovery and stakeholder alignment.' },
      { label: 'Positioning', description: 'Category, promise, and value proposition.' },
      { label: 'Messaging', description: 'Website, pitch, and campaign language.' },
      { label: 'Toolkit', description: 'Guidelines and rollout support.' }
    ],
    tags: ['Fintech', 'Brand Strategy']
  }
]

export const industries = ['All', ...Array.from(new Set(caseStudies.map((study) => study.industry)))]
