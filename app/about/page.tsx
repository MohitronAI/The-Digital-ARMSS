import Image from 'next/image'
import { Award, Compass, HeartHandshake, Target } from 'lucide-react'
import { Hero } from '@/components/Hero'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { team } from '@/data/team'

const pillars = [
  { icon: Target, title: 'Mission', description: 'To help ambitious brands grow with strategy-led digital marketing that is clear, measurable, and premium in execution.' },
  { icon: Compass, title: 'Vision', description: 'To become the most trusted digital growth partner for businesses that value quality, trust, and long-term results.' },
  { icon: HeartHandshake, title: 'Values', description: 'Clarity, accountability, creativity, and performance guide how we work with clients and with each other.' }
]

const milestones = [
  { year: '2019', title: 'Founded in Pune', description: 'Started with a small, strategy-first team serving local businesses.' },
  { year: '2021', title: 'Expanded performance capabilities', description: 'Added search, paid media, and lifecycle marketing systems.' },
  { year: '2023', title: 'Built premium web experience offerings', description: 'Launched conversion-focused websites and design systems.' },
  { year: '2026', title: 'Trusted across industries', description: 'Now supports brands in manufacturing, healthcare, SaaS, finance, and retail.' }
]

export default function AboutPage() {
  return (
    <>
      <Hero
        mode="page"
        eyebrow="About Us"
        title="A strategy-first partner for premium growth."
        subtitle="We help brands clarify their message, improve digital performance, and build an online presence that feels as strong as the business behind it."
        primaryCta={{ label: 'Talk to Us', href: '/contact' }}
        secondaryCta={{ label: 'Explore Services', href: '/services', variant: 'outline' }}
      />

      <Section eyebrow="Our Story" title="Built for brands that want more than generic marketing." subtitle="The Digital ARMSS was created to solve a simple problem: too many businesses were investing in digital marketing without a clear strategy, a coherent brand story, or reliable measurement. We started in Pune with a small team that cared deeply about clarity and results, and that mindset still shapes everything we do. Today, we partner with founders and marketing teams who want a better system behind their growth. We combine strategy, creative direction, content, search, social, and web development so the customer journey feels connected rather than fragmented. That matters because modern buyers do not respond to isolated tactics. They respond to brands that feel credible, relevant, and easy to trust. Our process is intentionally hands-on. We spend time understanding the market, the offer, and the numbers before we create anything. Then we build the right mix of channels, content, and experiences to support growth over time. The result is a partnership that feels organized, strategic, and focused on outcomes rather than activity. We are still based in Pune, but our work now reaches beyond the city because the need for high-quality, accountable digital marketing is universal. The businesses we work best with share one thing: they care about how their brand is perceived, and they want marketing that reflects that ambition.">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <Card key={pillar.title} className="p-7">
                  <Icon className="h-10 w-10 text-brand-gold" />
                  <h3 className="mt-5 text-2xl font-bold text-brand-navy">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-ink/72">{pillar.description}</p>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section eyebrow="Team" title="A focused team with complementary strengths." subtitle="Strategists, designers, marketers, and analysts working together around one outcome: better growth.">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">{member.role}</p>
                  <h3 className="mt-3 text-2xl font-bold text-brand-navy">{member.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-ink/72">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white" eyebrow="Milestones" title="A short timeline of growth." subtitle="A business built intentionally, with each step strengthening our ability to serve ambitious clients.">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {milestones.map((item) => (
              <Card key={item.year} className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">{item.year}</p>
                <h3 className="mt-3 text-xl font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-ink/72">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section eyebrow="Why Partner With Us" title="We bring senior attention to the work that matters." subtitle="Clients choose us when they want a digital partner who can think clearly, execute well, and stay accountable to outcomes.">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-7">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-brand-gold/15 p-4 text-brand-gold">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy">Premium execution</h3>
                  <p className="mt-1 text-sm text-brand-ink/62">Attention to detail across design, messaging, and performance.</p>
                </div>
              </div>
            </Card>
            <Card className="p-7">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-brand-gold/15 p-4 text-brand-gold">
                  <Target className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy">Outcome-focused strategy</h3>
                  <p className="mt-1 text-sm text-brand-ink/62">Clear plans, measurable KPIs, and a bias toward practical growth.</p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}