import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { leadUpdateSchema } from '@/lib/validation'
import { logger } from '@/lib/logger'
import { getAdminSession } from '@/lib/admin-auth'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const leadId = Number(params.id)
  if (Number.isNaN(leadId)) {
    return NextResponse.json({ error: 'Invalid lead id' }, { status: 400 })
  }

  const lead = await db.lead.findUnique({ where: { id: leadId } })
  if (!lead) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ lead })
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const leadId = Number(params.id)
  if (Number.isNaN(leadId)) {
    return NextResponse.json({ error: 'Invalid lead id' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const parsed = leadUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Field validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const lead = await db.lead.update({
      where: { id: leadId },
      data: {
        ...(parsed.data.status ? { status: parsed.data.status } : {}),
        ...(parsed.data.notes !== undefined ? { notes: parsed.data.notes } : {})
      }
    })

    logger.info('lead.updated', { leadId })
    return NextResponse.json({ success: true, lead })
  } catch (error) {
    logger.error('lead.update.failed', { error: error instanceof Error ? error.message : error })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const leadId = Number(params.id)
  if (Number.isNaN(leadId)) {
    return NextResponse.json({ error: 'Invalid lead id' }, { status: 400 })
  }

  try {
    await db.lead.delete({ where: { id: leadId } })
    logger.info('lead.deleted', { leadId })
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('lead.delete.failed', { error: error instanceof Error ? error.message : error })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}