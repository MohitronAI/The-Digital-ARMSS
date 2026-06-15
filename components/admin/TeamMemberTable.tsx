"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type TeamMemberRow = {
  id: number
  name: string
  email: string
  status: 'ACTIVE' | 'DISABLED'
  createdAt: string | Date
}

export function TeamMemberTable({ teamMembers }: { teamMembers: TeamMemberRow[] }) {
  const router = useRouter()

  async function updateStatus(id: number, nextStatus: 'ACTIVE' | 'DISABLED') {
    const response = await fetch(`/api/admin/team/${id}/${nextStatus === 'ACTIVE' ? 'enable' : 'disable'}`, { method: 'POST' })
    if (response.ok) {
      router.refresh()
    }
  }

  async function deleteMember(id: number) {
    const confirmed = window.confirm('Delete this team member?')
    if (!confirmed) return

    const response = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
    if (response.ok) {
      router.refresh()
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-brand-navy/10 text-left">
          <thead className="bg-brand-sand/60 text-xs uppercase tracking-[0.24em] text-brand-ink/55">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/10">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-brand-sand/40">
                <td className="px-5 py-4 font-semibold text-brand-navy">{member.name}</td>
                <td className="px-5 py-4 text-sm text-brand-ink/70">{member.email}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${member.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-brand-ink/65">{new Date(member.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-3 text-sm font-semibold">
                    <Link href={`/admin/team/${member.id}`} className="text-brand-gold hover:text-brand-navy">Edit</Link>
                    <Link href={`/admin/team/reset-password/${member.id}`} className="text-brand-gold hover:text-brand-navy">Reset Password</Link>
                    <button type="button" onClick={() => updateStatus(member.id, member.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE')} className="text-brand-gold hover:text-brand-navy">
                      {member.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                    </button>
                    <button type="button" onClick={() => deleteMember(member.id)} className="text-rose-600 hover:text-rose-800">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}