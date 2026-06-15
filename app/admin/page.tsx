import { db } from '@/lib/db'
import { StatsCard } from '@/components/admin/StatsCard'
import { LeadsTable } from '@/components/admin/LeadsTable'
import { Mail, TrendingUp, UserCheck, Users } from 'lucide-react'
import { getAdminSession } from '@/lib/admin-auth'
import { hasPermission } from '@/lib/permission-checker'
import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const session = await getAdminSession()
  if (!session || !hasPermission(session, 'DASHBOARD_ACCESS')) {
    redirect('/login')
  }

  const [totalLeads, newLeads, convertedLeads, recentLeads] = await Promise.all([
    db.lead.count(),
    db.lead.count({ where: { status: 'new', createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
    db.lead.count({ where: { status: 'converted' } }),
    db.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 8 })
  ])

  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0
  const canSeeLeadStats = hasPermission(session, 'LEADS_VIEW')
  const canSeeAnalytics = hasPermission(session, 'ANALYTICS_VIEW')

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Overview</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">Lead intelligence at a glance</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-brand-ink/70">Monitor leads, conversion progress, and the most recent enquiries without leaving the dashboard.</p>
      </div>

      {canSeeLeadStats ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard label="Total Leads" value={String(totalLeads)} hint="All records captured" icon={<Users className="h-5 w-5" />} />
          <StatsCard label="New This Week" value={String(newLeads)} hint="Fresh enquiries" icon={<Mail className="h-5 w-5" />} />
          <StatsCard label="Converted" value={String(convertedLeads)} hint="Closed opportunities" icon={<UserCheck className="h-5 w-5" />} />
          <StatsCard label="Conversion Rate" value={`${conversionRate}%`} hint="Converted / total" icon={<TrendingUp className="h-5 w-5" />} />
        </div>
      ) : (
        <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 text-sm text-brand-ink/65 shadow-md">You do not have access to lead metrics.</div>
      )}

      {canSeeAnalytics ? (
        <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-md">
          <h3 className="font-display text-2xl font-bold text-brand-navy">Analytics</h3>
          <p className="mt-2 text-sm text-brand-ink/65">Analytics widgets can be added here for users with ANALYTICS_VIEW permission.</p>
        </div>
      ) : null}

      {canSeeLeadStats ? (
        <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl font-bold tracking-[-0.02em] text-brand-navy">Recent leads</h3>
            <p className="mt-2 text-sm text-brand-ink/65">Latest submissions captured by the contact and quote request forms.</p>
          </div>
          <a href="/admin/leads" className="text-sm font-semibold text-brand-gold hover:text-brand-navy">View all leads</a>
        </div>
        <LeadsTable leads={recentLeads} />
        </div>
      ) : null}
    </div>
  )
}