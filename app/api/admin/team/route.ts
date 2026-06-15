import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { createTeamMemberSchema, validatePermissions } from '@/lib/team-validation'
import { requireSuperAdmin } from '@/lib/super-admin-check'
import { ALL_PERMISSION_NAMES } from '@/lib/permission-definitions'
import { hashPassword } from '@/lib/password-utils'

async function ensurePermissionRows() {
  await Promise.all(
    ALL_PERMISSION_NAMES.map((name) =>
      db.permission.upsert({
        where: { name },
        update: {},
        create: {
          name,
          category: name.split('_')[0].replace(/^(.)/, (value) => value.toUpperCase()),
          description: name.replaceAll('_', ' '),
          defaultEnabled: false
        }
      })
    )
  )
}

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    requireSuperAdmin(session)
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, Number(searchParams.get('page') ?? 1))
    const limit = Math.max(1, Math.min(100, Number(searchParams.get('limit') ?? 10)))
    const search = (searchParams.get('search') ?? '').trim()

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } }
          ]
        }
      : {}

    const [total, teamMembers] = await Promise.all([
      db.teamMember.count({ where }),
      db.teamMember.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit, include: { permissions: { include: { permission: true } } } })
    ])

    return NextResponse.json({
      teamMembers: teamMembers.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        status: member.status,
        createdAt: member.createdAt,
        permissions: member.permissions.filter((permission) => permission.enabled).map((permission) => permission.permission.name)
      })),
      total,
      page,
      limit
    })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Forbidden', code: 'FORBIDDEN' }, { status: 403 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    requireSuperAdmin(session)
    await ensurePermissionRows()

    const body = await request.json()
    const parsed = createTeamMemberSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', code: 'VALIDATION_ERROR', details: parsed.error.flatten() }, { status: 400 })
    }

    if (!validatePermissions(parsed.data.permissions)) {
      return NextResponse.json({ error: 'Invalid permissions', code: 'INVALID_PERMISSIONS' }, { status: 400 })
    }

    const email = parsed.data.email.toLowerCase()
    const existing = await db.teamMember.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already exists', code: 'EMAIL_EXISTS' }, { status: 409 })
    }

    const admin = await db.adminUser.findUnique({ where: { email: session.user.email } })
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden', code: 'FORBIDDEN' }, { status: 403 })
    }

    const hashedPassword = await hashPassword(parsed.data.password)
    const activePermissions = Object.entries(parsed.data.permissions).filter(([, enabled]) => enabled).map(([permission]) => permission)

    const teamMember = await db.teamMember.create({
      data: {
        name: parsed.data.name,
        email,
        password: hashedPassword,
        createdByAdminId: admin.id,
        permissions: {
          create: await Promise.all(activePermissions.map(async (permissionName) => {
            const permission = await db.permission.findUnique({ where: { name: permissionName } })
            return permission ? { permissionId: permission.id, enabled: true } : null
          })).then((results) => results.filter(Boolean) as Array<{ permissionId: number; enabled: boolean }>)
        }
      }
    })

    return NextResponse.json({ success: true, teamMember: { id: teamMember.id, name: teamMember.name, email: teamMember.email } })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Server error', code: 'SERVER_ERROR' }, { status: 500 })
  }
}