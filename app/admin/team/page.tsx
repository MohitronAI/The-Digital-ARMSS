import Link from 'next/link'
import { db } from '@/lib/db'
import { TeamMemberTable } from '@/components/admin/TeamMemberTable'
import { getAdminSession } from '@/lib/admin-auth'
import { isSuperAdmin } from '@/lib/super-admin-check'
import { redirect } from 'next/navigation'

export default async function TeamPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const session = await getAdminSession()
  if (!session || !isSuperAdmin(session)) {
    redirect('/admin/forbidden')
  }

  const page = Math.max(1, Number(searchParams.page ?? 1))
  const limit = 10
  const search = typeof searchParams.search === 'string' ? searchParams.search.trim() : ''

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
    db.teamMember.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit })
  ])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Team Members</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">Team Members</h2>
          <p className="mt-3 text-sm text-brand-ink/65">Search, review, and manage team access.</p>
        </div>
        <Link href="/admin/team/new" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-gold px-5 font-semibold text-brand-navy hover:bg-[#dfb17f]">
          Add New Member
        </Link>
      </div>

      <form className="flex gap-3" method="get">
        <input name="search" defaultValue={search} className="input max-w-md" placeholder="Search by name or email" />
        <button type="submit" className="inline-flex h-12 items-center justify-center rounded-lg border border-brand-navy/10 px-5 font-semibold text-brand-navy hover:border-brand-gold hover:text-brand-gold">
          Search
        </button>
      </form>

      <TeamMemberTable teamMembers={teamMembers} />

      <div className="flex items-center justify-between text-sm text-brand-ink/65">
        <p>Page {page} of {totalPages}</p>
        <div className="flex gap-2">
          <PagerLink disabled={page <= 1} href={`/admin/team?page=${Math.max(1, page - 1)}&search=${encodeURIComponent(search)}`}>Previous</PagerLink>
          <PagerLink disabled={page >= totalPages} href={`/admin/team?page=${Math.min(totalPages, page + 1)}&search=${encodeURIComponent(search)}`}>Next</PagerLink>
        </div>
      </div>
    </div>
  )
}

function PagerLink({ href, disabled, children }: { href: string; disabled?: boolean; children: React.ReactNode }) {
  return (
    <Link href={disabled ? '#' : href} aria-disabled={disabled} className={`rounded-lg border px-3 py-2 font-semibold ${disabled ? 'pointer-events-none border-brand-navy/10 text-brand-ink/35' : 'border-brand-navy/10 text-brand-navy hover:border-brand-gold hover:text-brand-gold'}`}>
      {children}
    </Link>
  )
}