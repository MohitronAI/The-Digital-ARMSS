import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { quoteRequestSchema } from '@/lib/validation'
import { checkRateLimit, getIpAddress } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'
import { sendQuoteConfirmation, sendQuoteToAdmin } from '@/lib/email'

export async function POST(request: Request) {
  const ip = getIpAddress(request)
  const rateLimit = checkRateLimit(`quote:${ip}`, 10, 24 * 60 * 60 * 1000)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const parsed = quoteRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Field validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const serviceInterested = parsed.data.services.join(', ')
    const followUpAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const lead = await db.lead.upsert({
      where: { email: parsed.data.email },
      update: {
        name: parsed.data.name,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        serviceInterested,
        message: parsed.data.projectDescription,
        budget: parsed.data.budget || null,
        source: 'quote request form',
        status: 'new',
        isQuoteRequest: true,
        requestedServices: parsed.data.services,
        timeline: parsed.data.timeline,
        followUpAt
      },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        serviceInterested,
        message: parsed.data.projectDescription,
        budget: parsed.data.budget || null,
        source: 'quote request form',
        status: 'new',
        isQuoteRequest: true,
        requestedServices: parsed.data.services,
        timeline: parsed.data.timeline,
        followUpAt
      }
    })

    const notificationResults = await Promise.allSettled([
      sendQuoteConfirmation(lead.email, parsed.data.services),
      sendQuoteToAdmin({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        services: parsed.data.services,
        projectDescription: parsed.data.projectDescription,
        timeline: parsed.data.timeline,
        budget: lead.budget,
        leadId: lead.id
      })
    ])

    const notificationFailures = notificationResults.filter((result): result is PromiseRejectedResult => result.status === 'rejected')
    if (notificationFailures.length > 0) {
      logger.warn('quote.notifications.failed', {
        leadId: lead.id,
        errors: notificationFailures.map((failure) => failure.reason instanceof Error ? failure.reason.message : String(failure.reason))
      })
    }

    logger.info('quote.submitted', { leadId: lead.id, email: lead.email })
    return NextResponse.json({
      success: true,
      message: 'Quote request submitted',
      leadId: lead.id,
      emailWarnings: notificationFailures.length > 0 ? ['Notifications could not be delivered, but your quote request was saved.'] : []
    })
  } catch (error) {
    logger.error('quote.failed', { error: error instanceof Error ? error.message : error })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}