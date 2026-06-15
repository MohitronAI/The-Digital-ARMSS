"use client"

import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AlertCircle, Loader2, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { services } from '@/data/services'
import { quoteRequestSchema, type QuoteRequestInput } from '@/lib/validation'
import { fadeUp, staggerContainerFast } from '@/lib/animations'

const budgetOptions = ['$2-5K', '$5-10K', '$10-20K', '$20K+'] as const
const timelineOptions = ['ASAP', '1-3 months', '3-6 months'] as const

export function QuoteRequestForm() {
  const [success, setSuccess] = useState('')
  const [submitError, setSubmitError] = useState('')
  const serviceOptions = useMemo(() => services.map((service) => service.name) as QuoteRequestInput['services'], [])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      services: ['SEO & SEM'],
      projectDescription: '',
      timeline: '1-3 months',
      budget: '$5-10K'
    }
  })

  const selectedServices = watch('services') ?? []

  const toggleService = (service: QuoteRequestInput['services'][number]) => {
    const next = selectedServices.includes(service) ? selectedServices.filter((item) => item !== service) : [...selectedServices, service]
    setValue('services', next, { shouldValidate: true, shouldDirty: true })
  }

  const onSubmit = async (values: QuoteRequestInput) => {
    setSubmitError('')
    setSuccess('')

    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null
      if (!response.ok) {
        throw new Error(payload?.error ?? 'Quote request submission failed.')
      }

      setSuccess('Your quote request has been submitted.')
      reset()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Quote request submission failed.')
    }
  }

  return (
    <Card className="overflow-hidden border-white/70 p-0 shadow-md">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-brand-navy p-8 text-white sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Quote Request</p>
          <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Need a more detailed proposal?</h3>
          <p className="mt-4 max-w-xl text-white/74">Send us a fuller brief and we’ll prepare a tailored quote with scope, timeline, and the right channel mix.</p>

          <div className="mt-8 space-y-3 text-sm text-white/78">
            <p className="font-semibold text-white">Typical services</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.slug} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">{service.name}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <motion.form variants={staggerContainerFast} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {submitError ? (
              <motion.div variants={fadeUp} className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {submitError}
              </motion.div>
            ) : null}
            {success ? <p className="rounded-2xl border border-brand-gold/20 bg-brand-gold/10 px-4 py-3 text-sm text-brand-navy">{success}</p> : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" error={errors.name?.message}>
                <input {...register('name')} className="input" placeholder="Your full name" />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input {...register('email')} className="input" placeholder="you@company.com" />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register('phone')} className="input" placeholder="Optional phone number" />
              </Field>
              <Field label="Company" error={errors.company?.message}>
                <input {...register('company')} className="input" placeholder="Company name" />
              </Field>
            </div>

            <div>
              <span className="mb-2 block text-sm font-semibold text-brand-navy">Services <span className="text-brand-gold">*</span></span>
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceOptions.map((service) => {
                  const active = selectedServices.includes(service)
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-300 ${active ? 'border-brand-gold bg-brand-gold/10 text-brand-navy' : 'border-brand-navy/10 bg-white hover:border-brand-gold/30 hover:bg-brand-sand'}`}
                    >
                      {service}
                    </button>
                  )
                })}
              </div>
              {errors.services?.message ? <p className="mt-2 text-sm text-red-500">{errors.services.message}</p> : null}
            </div>

            <Field label="Project Description" error={errors.projectDescription?.message}>
              <textarea {...register('projectDescription')} rows={6} className="input resize-none" placeholder="Tell us what you need, the scope, and the outcome you want." />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Timeline" error={errors.timeline?.message}>
                <select {...register('timeline')} className="input">
                  {timelineOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </Field>
              <Field label="Budget" error={errors.budget?.message}>
                <select {...register('budget')} className="input">
                  {budgetOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {isSubmitting ? 'Submitting...' : 'Request a Quote'}
            </Button>
          </motion.form>
        </div>
      </div>
    </Card>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brand-navy">{label} <span className="text-brand-gold">*</span></span>
      {children}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </label>
  )
}