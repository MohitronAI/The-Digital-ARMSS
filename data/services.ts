import { Service } from '@/types'

export const services: Service[] = [
  {
    slug: 'seo-sem',
    name: 'SEO & SEM',
    icon: 'Search',
    shortDescription: 'Increase visibility where buyers are already searching and convert that demand into measurable revenue.',
    description: 'A precision-led search strategy combining technical SEO, content optimization, and paid search management to capture qualified demand at every stage of the funnel.',
    overview: 'The Digital ARMSS helps brands own high-intent search moments with a balanced organic and paid search engine strategy designed for consistent growth, lower acquisition costs, and stronger lead quality.',
    whatWeDo: ['Technical audits and site architecture improvements', 'Keyword research and intent mapping', 'On-page and content optimization', 'Google Ads search campaign buildout', 'Landing page testing and conversion tracking'],
    benefits: ['More visibility for high-value search terms', 'Reduced cost per lead through better targeting', 'Compounding organic growth over time'],
    process: [
      { title: 'Audit', description: 'We diagnose visibility gaps, indexing issues, and missed conversion opportunities.' },
      { title: 'Strategy', description: 'We build keyword clusters, intent paths, and bidding frameworks around commercial goals.' },
      { title: 'Build', description: 'We optimize pages, campaigns, and tracking infrastructure end to end.' },
      { title: 'Launch', description: 'We launch with clear KPI baselines and measurement dashboards.' },
      { title: 'Optimize', description: 'We review search data weekly and continuously improve performance.' }
    ],
    caseStudyExample: 'A Pune-based B2B manufacturer increased inbound demo requests by 184% in 90 days after a search overhaul.',
    faq: [
      { question: 'How soon can SEO results appear?', answer: 'Early indicators often appear within 60 to 90 days, with stronger organic gains compounding over 4 to 6 months.' },
      { question: 'Do you manage Google Ads budgets?', answer: 'Yes, we manage campaign structure, bidding, creative, and reporting to align spend with acquisition targets.' }
    ]
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    icon: 'Share2',
    shortDescription: 'Build engaged communities with content systems designed for reach, resonance, and conversions.',
    description: 'From brand storytelling to performance-driven social campaigns, we create a consistent social presence that turns attention into loyal audiences and repeat customers.',
    overview: 'We turn scattered posting into a reliable growth engine across LinkedIn, Instagram, Facebook, and emerging channels relevant to your audience.',
    whatWeDo: ['Channel strategy and content calendars', 'Creative concepting and design direction', 'Community management and response systems', 'Paid social campaign management', 'Performance analysis and audience refinement'],
    benefits: ['Stronger brand recall and trust', 'Higher engagement with relevant audiences', 'A repeatable content engine that scales'],
    process: [
      { title: 'Audience', description: 'We identify what your audience cares about, shares, and saves.' },
      { title: 'Positioning', description: 'We define a voice and content pillars that support your brand goals.' },
      { title: 'Content', description: 'We produce platform-native creative that is optimized for engagement.' },
      { title: 'Launch', description: 'We publish with consistency and monitor early performance signals.' },
      { title: 'Refine', description: 'We double down on high-performing themes and formats.' }
    ],
    caseStudyExample: 'A wellness brand grew social-qualified leads by 220% after a 6-month content and paid social sprint.',
    faq: [
      { question: 'Do you create posts and reels?', answer: 'Yes, we plan and manage both static and motion-led social content formats.' },
      { question: 'Can you work with our in-house designer?', answer: 'Absolutely. We can plug into existing teams or lead the full social stack.' }
    ]
  },
  {
    slug: 'content-marketing',
    name: 'Content Marketing',
    icon: 'PenTool',
    shortDescription: 'Create content that attracts the right audience, builds authority, and converts interest into action.',
    description: 'We plan and produce high-value blogs, landing pages, case studies, and resource content that improves discovery while supporting sales conversations.',
    overview: 'Content becomes powerful when it is built around intent and conversion. We help you publish content that educates, persuades, and ranks.',
    whatWeDo: ['Editorial strategy and content planning', 'Blog and resource production', 'Landing page copywriting', 'Case study and thought leadership content', 'Content performance audits'],
    benefits: ['More qualified organic traffic', 'Better sales enablement content', 'Higher conversion rates from informed visitors'],
    process: [
      { title: 'Research', description: 'We uncover questions, objections, and content opportunities.' },
      { title: 'Plan', description: 'We map content to funnel stages and revenue outcomes.' },
      { title: 'Write', description: 'We create SEO-aware, conversion-focused assets.' },
      { title: 'Publish', description: 'We structure content for readability, discovery, and internal linking.' },
      { title: 'Measure', description: 'We track engagement, rankings, and assisted conversions.' }
    ],
    caseStudyExample: 'A SaaS startup tripled its content-driven signups after a strategic editorial program.',
    faq: [
      { question: 'Do you write in our brand voice?', answer: 'Yes, we build a voice guide and adapt copy to your tone and audience.' },
      { question: 'Can you repurpose webinar or sales content?', answer: 'Yes, we can transform existing assets into lead-generating content systems.' }
    ]
  },
  {
    slug: 'email-marketing',
    name: 'Email Marketing',
    icon: 'Mail',
    shortDescription: 'Nurture leads with targeted campaigns, lifecycle flows, and conversion-first email automation.',
    description: 'From welcome sequences to abandoned lead recovery, we design email systems that keep your brand top of mind and turn interest into repeat business.',
    overview: 'Email remains one of the highest-ROI channels when built with segmentation, timing, and a strong message hierarchy.',
    whatWeDo: ['Lifecycle automation and segmentation', 'Newsletter and campaign planning', 'Lead nurture sequences', 'Copywriting and template design', 'A/B testing and performance reporting'],
    benefits: ['Improved lead nurturing', 'Higher repeat purchase and retention rates', 'Direct audience access without platform dependency'],
    process: [
      { title: 'Audit', description: 'We review your list hygiene, current automations, and engagement trends.' },
      { title: 'Segment', description: 'We build meaningful audience groups for relevance and timing.' },
      { title: 'Design', description: 'We create mobile-friendly, on-brand email templates.' },
      { title: 'Automate', description: 'We launch flows that support lifecycle milestones.' },
      { title: 'Optimize', description: 'We test subject lines, CTAs, and content blocks for improvement.' }
    ],
    caseStudyExample: 'A service business improved booked calls by 71% through a short nurture sequence and reactivation flow.',
    faq: [
      { question: 'Do you send emails on our behalf?', answer: 'Yes, or we can build the system and train your team to run it internally.' },
      { question: 'Can you integrate with our CRM?', answer: 'Yes, we work with most common CRM and marketing automation platforms.' }
    ]
  },
  {
    slug: 'web-design-development',
    name: 'Web Design & Development',
    icon: 'LayoutTemplate',
    shortDescription: 'Build conversion-focused websites that feel premium, load fast, and drive measurable business outcomes.',
    description: 'We design and develop responsive websites that combine strong visual identity, clean UX, and technical performance.',
    overview: 'A website should do more than look good. We craft digital experiences that create trust, simplify decisions, and accelerate conversion.',
    whatWeDo: ['UX and visual design systems', 'Next.js development and performance tuning', 'Conversion-focused landing pages', 'CMS and content structure planning', 'Accessibility and SEO best practices'],
    benefits: ['Faster page speed and stronger Core Web Vitals', 'Improved trust and conversion rates', 'A polished digital brand experience'],
    process: [
      { title: 'Discover', description: 'We map user goals, business goals, and content priorities.' },
      { title: 'Wireframe', description: 'We establish page structure and conversion flow.' },
      { title: 'Design', description: 'We create a premium visual system aligned to your brand.' },
      { title: 'Develop', description: 'We build a responsive, optimized, and maintainable site.' },
      { title: 'Launch', description: 'We test performance, accessibility, and analytics before going live.' }
    ],
    caseStudyExample: 'A consulting firm lifted contact conversion by 43% after a redesigned site and clearer service positioning.',
    faq: [
      { question: 'Do you build with Next.js?', answer: 'Yes, we primarily use Next.js for speed, scalability, and SEO performance.' },
      { question: 'Can you migrate from our current site?', answer: 'Yes, we handle structured migrations with minimal disruption.' }
    ]
  },
  {
    slug: 'brand-strategy',
    name: 'Brand Strategy',
    icon: 'Sparkles',
    shortDescription: 'Develop a strong brand identity that clarifies your positioning and makes your growth easier to scale.',
    description: 'We help businesses define how they should be perceived, what they stand for, and how to show up consistently across channels.',
    overview: 'Brand strategy aligns message, market position, and customer perception so every marketing activity works harder and feels more cohesive.',
    whatWeDo: ['Brand discovery and positioning', 'Messaging frameworks and tone of voice', 'Visual direction support', 'Audience and competitor analysis', 'Brand rollout guidance'],
    benefits: ['Sharper differentiation in crowded markets', 'More confident content and sales messaging', 'Improved trust with your target audience'],
    process: [
      { title: 'Discover', description: 'We understand your business, audience, and market context.' },
      { title: 'Define', description: 'We articulate positioning, promise, and personality.' },
      { title: 'Systemize', description: 'We create a usable brand toolkit for your team.' },
      { title: 'Align', description: 'We ensure every channel reflects the same strategy.' },
      { title: 'Scale', description: 'We support rollout as your brand grows across touchpoints.' }
    ],
    caseStudyExample: 'A premium local brand sharpened its positioning and saw a 28% increase in qualified enquiries.',
    faq: [
      { question: 'Do you also create logos?', answer: 'We focus on strategy and can coordinate visual identity work with trusted design partners.' },
      { question: 'Is brand strategy only for new businesses?', answer: 'No, mature brands often benefit even more when they need repositioning or expansion.' }
    ]
  }
]

export const serviceCategories = services.map((service) => service.name)
