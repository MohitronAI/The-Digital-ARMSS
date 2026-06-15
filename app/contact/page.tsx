import { Hero } from '@/components/Hero'
import { ContactForm } from '@/components/ContactForm'
import { QuoteRequestForm } from '@/components/QuoteRequestForm'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Hero
        mode="page"
        eyebrow="Contact"
        title="Let’s build a smarter growth plan."
        subtitle="Tell us what you are trying to achieve and we’ll respond with a thoughtful next step."
        primaryCta={{ label: 'Send an Enquiry', href: '#contact-form' }}
        secondaryCta={{ label: 'Browse Services', href: '/services', variant: 'outline' }}
      />

      <section className="py-16 sm:py-20" id="contact-form">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-6">
              <Card className="p-7">
                <h2 className="text-2xl font-bold text-brand-navy">Contact Information</h2>
                <div className="mt-5 space-y-4 text-sm text-brand-ink/72">
                  <ContactLine icon={Mail} label="Email" value="hello@thedigitalarmss.com" />
                  <ContactLine icon={Phone} label="Phone" value="+91-98765-43210" />
                  <ContactLine icon={MapPin} label="Address" value="Pune, Maharashtra, India" />
                  <ContactLine icon={MapPin} label="Hours" value="Mon - Sat, 10:00 AM - 7:00 PM" />
                </div>
              </Card>

              <Card className="p-7">
                <h3 className="text-xl font-bold text-brand-navy">Social Links</h3>
                <div className="mt-4 flex gap-3">
                  {[Instagram, Linkedin, Facebook].map((Icon, index) => (
                    <a key={index} href="#" className="rounded-full border border-brand-navy/10 p-3 text-brand-navy hover:border-brand-gold hover:text-brand-gold">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </Card>

              <Card className="overflow-hidden p-0">
                <iframe
                  title="Google Map"
                  src={process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL}
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Card>
            </div>

            <ContactForm />
          </div>

          <div className="mt-10">
            <QuoteRequestForm />
          </div>
        </Container>
      </section>
    </>
  )
}

function ContactLine({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-brand-sand p-4">
      <Icon className="mt-0.5 h-4 w-4 text-brand-gold" />
      <div>
        <p className="font-semibold text-brand-navy">{label}</p>
        <p className="mt-1 text-sm leading-6 text-brand-ink/70">{value}</p>
      </div>
    </div>
  )
}