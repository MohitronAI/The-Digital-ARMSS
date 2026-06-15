import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { adminLeadQuerySchema, leadSchema } from '@/lib/validation'
import { checkRateLimit, getIpAddress } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'
import { sendAdminNotification, sendLeadConfirmation } from '@/lib/email'
import { getAdminSession } from '@/lib/admin-auth'

export async function POST(request: Request) {
  const ip = getIpAddress(request)
  const rateLimit = checkRateLimit(`lead:${ip}`, 5, 60 * 60 * 1000)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const parsed = leadSchema.safeParse(body)
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
        source: parsed.data.source ?? 'homepage form',
        status: parsed.data.status ?? 'new',
        notes: parsed.data.notes ?? null,
        isQuoteRequest: parsed.data.isQuoteRequest ?? false,
        requestedServices: parsed.data.requestedServices ?? Prisma.DbNull,
        timeline: parsed.data.timeline ?? null,
        followUpAt: parsed.data.followUpAt ? new Date(parsed.data.followUpAt) : null
      },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        serviceInterested: parsed.data.serviceInterested,
        message: parsed.data.message,
        budget: parsed.data.budget || null,
        source: parsed.data.source ?? 'homepage form',
        status: parsed.data.status ?? 'new',
        notes: parsed.data.notes ?? null,
        isQuoteRequest: parsed.data.isQuoteRequest ?? false,
        requestedServices: parsed.data.requestedServices ?? Prisma.DbNull,
        timeline: parsed.data.timeline ?? null,
        followUpAt: parsed.data.followUpAt ? new Date(parsed.data.followUpAt) : null
      }
    })

    await Promise.all([
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

    logger.info('lead.submitted', { leadId: lead.id, email: lead.email })
    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    logger.error('lead.create.failed', { error: error instanceof Error ? error.message : error })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const parsed = adminLeadQuerySchema.safeParse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
      search: searchParams.get('search') ?? undefined
    })

    if (!parsed.success) {
      return NextResponse.json({ error: 'Field validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const { page, limit, status, sortBy, search } = parsed.data
    const where: Prisma.LeadWhereInput = {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [{ name: { contains: search, mode: 'insensitive' as const } }, { email: { contains: search, mode: 'insensitive' as const } }]
          }
        : {})
    }

    const [total, leads] = await Promise.all([
      db.lead.count({ where }),
      db.lead.findMany({
        where,
        orderBy: { [sortBy]: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      })
    ])

    return NextResponse.json({ leads, total, page })
  } catch (error) {
    logger.error('lead.list.failed', { error: error instanceof Error ? error.message : error })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}