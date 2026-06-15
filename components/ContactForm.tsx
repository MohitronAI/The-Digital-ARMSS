"use client"

import { useState, type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { services } from '@/data/services'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { ContactFormValues } from '@/types'

const localContactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service.'),
  message: z.string().min(20, 'Please share a little more detail about your goals.'),
  privacy: z.boolean().refine((value) => value, { message: 'Please agree to the privacy policy.' })
})

type ContactSchema = z.infer<typeof localContactSchema>

const defaultValues: ContactFormValues = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
  privacy: false
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactSchema>({
    resolver: zodResolver(localContactSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues
  })

  const onSubmit = async (values: ContactSchema) => {
    setSubmitError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          company: values.company,
          serviceInterested: values.service,
          message: values.message,
          source: 'contact page form'
        })
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Something went wrong. Please try again.')
      }

      setIsSubmitted(true)
      reset(defaultValues)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  const onError = () => setSubmitError('Please correct the highlighted fields and try again.')

  return (
    <Card className="overflow-hidden p-0 shadow-soft">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-brand-navy p-8 text-white sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Get in Touch</p>
          <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Tell us about your goals.</h3>
          <p className="mt-4 max-w-xl text-white/74">We typically respond within one business day with a practical next step and a clear sense of how we can help.</p>

          <div className="mt-8 space-y-4 text-sm text-white/78">
            <div>
              <p className="font-semibold text-white">Services</p>
              <p className="mt-2 leading-6">{services.map((service) => service.name).join(' · ')}</p>
            </div>
            <div>
              <p className="font-semibold text-white">What happens next</p>
              <p className="mt-2 leading-6">We review your brief, clarify the priority outcomes, and propose the right engagement model.</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl bg-brand-sand text-center"
              >
                <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} className="rounded-full bg-brand-gold/15 p-5 text-brand-gold">
                  <CheckCircle2 className="h-12 w-12" />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl font-bold text-brand-navy">Message sent successfully</h3>
                <p className="mt-3 max-w-md text-brand-ink/70">Thanks for reaching out. We’ll get back to you shortly with a thoughtful reply.</p>
                <Button href="/services" variant="outline" className="mt-6">
                  Explore Services
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit, onError)}
                animate={Object.keys(errors).length > 0 ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-5"
              >
                {submitError ? (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {submitError}
                  </motion.div>
                ) : null}

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" error={errors.fullName?.message}>
                    <input {...register('fullName')} className="input" placeholder="Your full name" aria-invalid={Boolean(errors.fullName)} />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input {...register('email')} className="input" placeholder="you@company.com" aria-invalid={Boolean(errors.email)} />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Phone" error={errors.phone?.message}>
                    <input {...register('phone')} className="input" placeholder="Optional phone number" aria-invalid={Boolean(errors.phone)} />
                  </Field>
                  <Field label="Company" error={errors.company?.message}>
                    <input {...register('company')} className="input" placeholder="Company name" aria-invalid={Boolean(errors.company)} />
                  </Field>
                </div>

                <Field label="Service Interested In" error={errors.service?.message}>
                  <select {...register('service')} className="input" aria-invalid={Boolean(errors.service)}>
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Message" error={errors.message?.message}>
                  <textarea {...register('message')} rows={6} className="input resize-none" placeholder="Tell us about your goals, timeline, and current challenges." aria-invalid={Boolean(errors.message)} />
                </Field>

                <label className="flex items-start gap-3 text-sm text-brand-ink/72">
                  <input type="checkbox" {...register('privacy')} className="mt-1 h-4 w-4 rounded border-brand-navy/20 text-brand-gold focus:ring-brand-gold/50" />
                  <span>I agree to the privacy policy and consent to being contacted about my enquiry.</span>
                </label>
                {errors.privacy?.message ? <p className="-mt-2 text-sm text-red-500">{errors.privacy.message}</p> : null}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brand-navy">
        {label}
        <span className="ml-1 text-brand-gold">*</span>
      </span>
      {children}
      <AnimatePresence>
        {error ? (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 text-sm text-red-500" role="alert">
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </label>
  )
}
