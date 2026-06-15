import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { updateTeamMemberSchema, validatePermissions } from '@/lib/team-validation'
import { requireSuperAdmin } from '@/lib/super-admin-check'

async function syncPermissions(teamMemberId: number, permissions: Record<string, boolean>) {
  const activePermissions = Object.entries(permissions).filter(([, enabled]) => enabled).map(([permission]) => permission)

  await db.teamMemberPermission.deleteMany({ where: { teamMemberId } })

  if (activePermissions.length === 0) {
    return
  }

  const permissionRows = await db.permission.findMany({ where: { name: { in: activePermissions } } })
  await db.teamMemberPermission.createMany({
    data: permissionRows.map((permission) => ({ teamMemberId, permissionId: permission.id, enabled: true }))
  })
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    requireSuperAdmin(session)
    const teamMemberId = Number(params.id)
    const teamMember = await db.teamMember.findUnique({ where: { id: teamMemberId }, include: { permissions: { include: { permission: true } } } })
    if (!teamMember) {
      return NextResponse.json({ error: 'Not found', code: 'NOT_FOUND' }, { status: 404 })
    }

    return NextResponse.json({
      teamMember: {
        id: teamMember.id,
        name: teamMember.name,
        email: teamMember.email,
        status: teamMember.status,
        createdAt: teamMember.createdAt,
        permissions: teamMember.permissions.filter((permission) => permission.enabled).map((permission) => permission.permission.name)
      }
    })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Forbidden', code: 'FORBIDDEN' }, { status: 403 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    requireSuperAdmin(session)
    const teamMemberId = Number(params.id)
    const body = await request.json()
    const parsed = updateTeamMemberSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', code: 'VALIDATION_ERROR', details: parsed.error.flatten() }, { status: 400 })
    }

    if (parsed.data.permissions && !validatePermissions(parsed.data.permissions)) {
      return NextResponse.json({ error: 'Invalid permissions', code: 'INVALID_PERMISSIONS' }, { status: 400 })
    }

    const updated = await db.teamMember.update({
      where: { id: teamMemberId },
      data: {
        ...(parsed.data.name ? { name: parsed.data.name } : {}),
        ...(parsed.data.status ? { status: parsed.data.status } : {})
      }
    })

    if (parsed.data.permissions) {
      await syncPermissions(teamMemberId, parsed.data.permissions)
    }

    return NextResponse.json({ success: true, teamMember: updated })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Server error', code: 'SERVER_ERROR' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    requireSuperAdmin(session)
    const teamMemberId = Number(params.id)
    await db.teamMember.delete({ where: { id: teamMemberId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Server error', code: 'SERVER_ERROR' }, { status: 500 })
  }
}