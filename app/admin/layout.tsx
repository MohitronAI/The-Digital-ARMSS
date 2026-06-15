import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { getAdminSession } from '@/lib/admin-auth'
import { SignOutButton } from '@/components/admin/SignOutButton'
import { RoleIndicator } from '@/components/admin/RoleIndicator'
import { hasPermission } from '@/lib/permission-checker'
import { isSuperAdmin } from '@/lib/super-admin-check'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession()
  if (!session) {
    redirect('/login')
  }

  const navItems = [
    hasPermission(session, 'DASHBOARD_ACCESS') || isSuperAdmin(session) ? { label: 'Overview', href: '/admin' } : null,
    hasPermission(session, 'LEADS_VIEW') || isSuperAdmin(session) ? { label: 'Leads', href: '/admin/leads' } : null,
    hasPermission(session, 'TEAM_VIEW') || isSuperAdmin(session) ? { label: 'Team', href: '/admin/team' } : null,
    hasPermission(session, 'ANALYTICS_VIEW') || isSuperAdmin(session) ? { label: 'Analytics', href: '/admin/analytics' } : null,
    hasPermission(session, 'SETTINGS_VIEW') || isSuperAdmin(session) ? { label: 'Settings', href: '/admin/settings' } : null
  ].filter(Boolean) as Array<{ label: string; href: string }>

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-brand-sand/40 to-white">
      <div className="border-b border-brand-navy/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Admin</p>
            <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-brand-navy">The Digital ARMSS Dashboard</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-brand-ink/55">
              <span>Signed in as {session.user?.email ?? 'admin'}</span>
              <RoleIndicator name={session.user?.name ?? 'Admin'} role={session.user?.role ?? 'SUPER_ADMIN'} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-4 py-2 text-sm font-semibold text-brand-ink/70 hover:bg-brand-sand hover:text-brand-navy">
                  {item.label}
                </Link>
              ))}
            </nav>
            <SignOutButton />
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}