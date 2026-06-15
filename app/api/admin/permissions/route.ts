import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getAllPermissionsGrouped } from '@/lib/permission-definitions'

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 })
  }

  return NextResponse.json({
    currentPermissions: session.user.permissions ?? [],
    allPermissions: getAllPermissionsGrouped()
  })
}