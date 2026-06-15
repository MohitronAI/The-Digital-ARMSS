import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { newsletterSchema } from '@/lib/validation'
import { checkRateLimit, getIpAddress } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

export async function POST(request: Request) {
  const ip = getIpAddress(request)
  const rateLimit = checkRateLimit(`newsletter:${ip}`, 20, 60 * 60 * 1000)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const parsed = newsletterSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Field validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    await db.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { active: true },
      create: { email: parsed.data.email, active: true }
    })

    logger.info('newsletter.subscribed', { email: parsed.data.email })
    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch (error) {
    logger.error('newsletter.failed', { error: error instanceof Error ? error.message : error })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}