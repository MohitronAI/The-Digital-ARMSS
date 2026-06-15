import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { LeadsTable } from '@/components/admin/LeadsTable'
import { adminLeadQuerySchema } from '@/lib/validation'
import { getAdminSession } from '@/lib/admin-auth'
import { hasPermission } from '@/lib/permission-checker'
import { redirect } from 'next/navigation'

export default async function LeadsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const session = await getAdminSession()
  if (!session || !hasPermission(session, 'LEADS_VIEW')) {
    redirect('/admin/forbidden')
  }

  const parsed = adminLeadQuerySchema.parse({
    page: searchParams.page,
    limit: searchParams.limit,
    status: searchParams.status,
    sortBy: searchParams.sortBy,
    search: searchParams.search
  })

  const where: Prisma.LeadWhereInput = {
    ...(parsed.status ? { status: parsed.status } : {}),
    ...(parsed.search
      ? {
          OR: [{ name: { contains: parsed.search, mode: 'insensitive' as const } }, { email: { contains: parsed.search, mode: 'insensitive' as const } }]
        }
      : {})
  }

  const [total, leads] = await Promise.all([
    db.lead.count({ where }),
    db.lead.findMany({
      where,
      orderBy: { [parsed.sortBy]: 'desc' },
      skip: (parsed.page - 1) * parsed.limit,
      take: parsed.limit
    })
  ])

  const totalPages = Math.max(1, Math.ceil(total / parsed.limit))

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Leads</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">All incoming leads</h2>
          <p className="mt-3 text-sm text-brand-ink/65">Search, filter, and review the full lead list.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin" className="text-sm font-semibold text-brand-gold hover:text-brand-navy">Back to overview</Link>
          {hasPermission(session, 'LEADS_EXPORT') ? (
            <button type="button" className="text-sm font-semibold text-brand-gold hover:text-brand-navy">Export CSV</button>
          ) : null}
        </div>
      </div>

      <LeadsTable leads={leads} />

      <div className="flex items-center justify-between text-sm text-brand-ink/65">
        <p>Page {parsed.page} of {totalPages}</p>
        <div className="flex gap-2">
          <PagerLink disabled={parsed.page <= 1} href={`/admin/leads?page=${Math.max(1, parsed.page - 1)}&limit=${parsed.limit}`}>Previous</PagerLink>
          <PagerLink disabled={parsed.page >= totalPages} href={`/admin/leads?page=${Math.min(totalPages, parsed.page + 1)}&limit=${parsed.limit}`}>Next</PagerLink>
        </div>
      </div>
    </div>
  )
}

function PagerLink({ href, disabled, children }: { href: string; disabled?: boolean; children: ReactNode }) {
  return (
    <Link href={disabled ? '#' : href} aria-disabled={disabled} className={`rounded-lg border px-3 py-2 font-semibold ${disabled ? 'pointer-events-none border-brand-navy/10 text-brand-ink/35' : 'border-brand-navy/10 text-brand-navy hover:border-brand-gold hover:text-brand-gold'}`}>
      {children}
    </Link>
  )
}