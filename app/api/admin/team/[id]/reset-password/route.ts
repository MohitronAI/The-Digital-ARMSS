import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { requireSuperAdmin } from '@/lib/super-admin-check'
import { generateSecurePassword, hashPassword, validatePassword } from '@/lib/password-utils'
import { resetPasswordSchema } from '@/lib/team-validation'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    requireSuperAdmin(session)
    const teamMemberId = Number(params.id)
    const body = await request.json().catch(() => ({}))
    const parsed = resetPasswordSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', code: 'VALIDATION_ERROR', details: parsed.error.flatten() }, { status: 400 })
    }

    const newPassword = parsed.data.newPassword ?? generateSecurePassword()
    const validation = validatePassword(newPassword)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.errors.join(' '), code: 'INVALID_PASSWORD' }, { status: 400 })
    }

    await db.teamMember.update({ where: { id: teamMemberId }, data: { password: await hashPassword(newPassword) } })
    return NextResponse.json({ success: true, newPassword })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Server error', code: 'SERVER_ERROR' }, { status: 500 })
  }
}