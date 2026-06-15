import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { hasPermission } from '@/lib/permission-checker'
import type { Session } from 'next-auth'

export function RequirePermission({ session, permissions, children }: { session: Session | null | undefined; permissions: string[]; children: ReactNode }) {
  if (!session?.user) {
    redirect('/login')
  }

  if (!permissions.every((permission) => hasPermission(session, permission))) {
    redirect('/admin/forbidden')
  }

  return <>{children}</>
}