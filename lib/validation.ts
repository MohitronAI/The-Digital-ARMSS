import { z } from 'zod'

export const serviceInterestValues = ['SEO & SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Web Design & Development', 'Brand Strategy'] as const
export const leadStatusValues = ['new', 'contacted', 'converted', 'lost'] as const
export const quoteTimelineValues = ['ASAP', '1-3 months', '3-6 months'] as const
export const budgetValues = ['$2-5K', '$5-10K', '$10-20K', '$20K+'] as const

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name too short'),
  email: z.string().trim().email('Invalid email'),
  phone: z.string().trim().optional().or(z.literal('')),
  company: z.string().trim().optional().or(z.literal('')),
  serviceInterested: z.enum(serviceInterestValues),
  message: z.string().trim().min(20, 'Message must be at least 20 chars'),
  budget: z.string().trim().optional().or(z.literal('')),
  source: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  status: z.enum(leadStatusValues).optional(),
  isQuoteRequest: z.boolean().optional(),
  requestedServices: z.array(z.enum(serviceInterestValues)).optional(),
  timeline: z.enum(quoteTimelineValues).optional(),
  followUpAt: z.string().datetime().optional()
})

export const leadUpdateSchema = z.object({
  status: z.enum(leadStatusValues).optional(),
  notes: z.string().trim().max(4000).optional()
})

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name too short'),
  email: z.string().trim().email('Invalid email'),
  phone: z.string().trim().optional().or(z.literal('')),
  company: z.string().trim().optional().or(z.literal('')),
  serviceInterested: z.enum(serviceInterestValues),
  message: z.string().trim().min(20, 'Message must be at least 20 chars'),
  budget: z.enum(budgetValues).optional().or(z.literal(''))
})

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, 'Name too short'),
  email: z.string().trim().email('Invalid email'),
  phone: z.string().trim().optional().or(z.literal('')),
  company: z.string().trim().optional().or(z.literal('')),
  services: z.array(z.enum(serviceInterestValues)).min(1, 'Select at least one service'),
  projectDescription: z.string().trim().min(20, 'Project description must be at least 20 chars'),
  timeline: z.enum(quoteTimelineValues),
  budget: z.enum(budgetValues).optional().or(z.literal(''))
})

export const newsletterSchema = z.object({
  email: z.string().trim().email('Invalid email')
})

export const adminLeadQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(leadStatusValues).optional(),
  sortBy: z.enum(['createdAt', 'name', 'status', 'email']).default('createdAt'),
  search: z.string().trim().optional()
})

export type LeadInput = z.infer<typeof leadSchema>
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>