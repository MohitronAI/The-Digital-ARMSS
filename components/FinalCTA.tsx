import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export function FinalCTA() {
  return (
    <section className="bg-brand-gold py-20 text-white sm:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/80">Start the Conversation</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Ready to Transform Your Digital Presence?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">Let’s discuss how we can help you grow with strategy, design, and performance marketing that works together.</p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="secondary" size="lg" className="bg-white text-brand-navy hover:bg-white/95">
              Schedule Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}