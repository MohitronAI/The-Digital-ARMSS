import type { Session } from 'next-auth'
import { db } from '@/lib/db'
import { ALL_PERMISSION_NAMES, type PermissionName, getAllPermissionsGrouped } from '@/lib/permission-definitions'
import { isSuperAdmin } from '@/lib/super-admin-check'

export async function getTeamMemberPermissions(teamMemberId: number) {
  const permissions = await db.teamMemberPermission.findMany({
    where: { teamMemberId, enabled: true },
    select: { permission: { select: { name: true } } }
  })

  return permissions.map((permission) => permission.permission.name)
}

export function hasPermission(session: Session | null | undefined, permissionName: string) {
  if (!session?.user) {
    return false
  }

  if (isSuperAdmin(session)) {
    return true
  }

  return session.user.permissions?.includes(permissionName) ?? false
}

export function canAccessPage(session: Session | null | undefined, requiredPermissions: string[]) {
  return requiredPermissions.every((permission) => hasPermission(session, permission))
}

export function canPerformAction(session: Session | null | undefined, action: string) {
  return hasPermission(session, action)
}

export function validatePermissions(permissions: Record<string, boolean>) {
  return Object.keys(permissions).every((permission) => ALL_PERMISSION_NAMES.includes(permission as PermissionName))
}

export { getAllPermissionsGrouped }