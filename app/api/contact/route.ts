import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { contactSchema } from '@/lib/validation'
import { checkRateLimit, getIpAddress } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'
import { sendAdminNotification, sendLeadConfirmation } from '@/lib/email'

export async function POST(request: Request) {
  const ip = getIpAddress(request)
  const rateLimit = checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Field validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const lead = await db.lead.upsert({
      where: { email: parsed.data.email },
      update: {
        name: parsed.data.name,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        serviceInterested: parsed.data.serviceInterested,
        message: parsed.data.message,
        budget: parsed.data.budget || null,
        source: 'contact page form',
        status: 'new',
        isQuoteRequest: false
      },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        serviceInterested: parsed.data.serviceInterested,
        message: parsed.data.message,
        budget: parsed.data.budget || null,
        source: 'contact page form',
        status: 'new'
      }
    })

    const notificationResults = await Promise.allSettled([
      sendLeadConfirmation(lead.email, lead.name, lead.serviceInterested),
      sendAdminNotification({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        serviceInterested: lead.serviceInterested,
        message: lead.message,
        budget: lead.budget,
        source: lead.source
      })
    ])

    const leadConfirmationFailed = notificationResults[0].status === 'rejected'
    const adminNotificationFailed = notificationResults[1].status === 'rejected'

    if (leadConfirmationFailed || adminNotificationFailed) {
      logger.warn('contact.notifications.failed', {
        leadId: lead.id,
        errors: notificationResults
          .filter((result) => result.status === 'rejected')
          .map((failure) => failure.reason instanceof Error ? failure.reason.message : String(failure.reason))
      })
    }

    logger.info('contact.submitted', { leadId: lead.id, email: lead.email, source: lead.source })
    return NextResponse.json({
      success: true,
      leadId: lead.id,
      emailWarnings: adminNotificationFailed ? ['Notifications could not be delivered, but your enquiry was saved.'] : []
    })
  } catch (error) {
    logger.error('contact.failed', { error: error instanceof Error ? error.message : error })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}