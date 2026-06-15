import type { Session } from 'next-auth'

export function isSuperAdmin(session: Session | null | undefined) {
  return session?.user?.role === 'SUPER_ADMIN'
}

export function requireSuperAdmin(session: Session | null | undefined) {
  if (!isSuperAdmin(session)) {
    throw new Error('Forbidden')
  }

  return session
}