import Link from 'next/link'
import type { LeadStatus } from '@prisma/client'

export type AdminLeadRow = {
  id: number
  name: string
  email: string
  serviceInterested: string
  status: LeadStatus
  createdAt: Date
  source: string
}

const statusStyles: Record<LeadStatus, string> = {
  new: 'bg-brand-gold/15 text-brand-navy',
  contacted: 'bg-blue-50 text-blue-700',
  converted: 'bg-emerald-50 text-emerald-700',
  lost: 'bg-rose-50 text-rose-700'
}

export function LeadsTable({ leads }: { leads: AdminLeadRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-brand-navy/10 text-left">
          <thead className="bg-brand-sand/60 text-xs uppercase tracking-[0.24em] text-brand-ink/55">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/10">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-brand-sand/40">
                <td className="px-5 py-4 font-semibold text-brand-navy">{lead.name}</td>
                <td className="px-5 py-4 text-sm text-brand-ink/70">{lead.email}</td>
                <td className="px-5 py-4 text-sm text-brand-ink/70">{lead.serviceInterested}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusStyles[lead.status]}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-brand-ink/65">{lead.createdAt.toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <Link href={`/admin/leads/${lead.id}`} className="text-sm font-semibold text-brand-gold hover:text-brand-navy">
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}