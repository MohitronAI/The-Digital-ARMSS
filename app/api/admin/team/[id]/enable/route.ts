import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { requireSuperAdmin } from '@/lib/super-admin-check'

export const dynamic = 'force-dynamic'

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    requireSuperAdmin(session)
    await db.teamMember.update({ where: { id: Number(params.id) }, data: { status: 'ACTIVE' } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Server error', code: 'SERVER_ERROR' }, { status: 500 })
  }
}