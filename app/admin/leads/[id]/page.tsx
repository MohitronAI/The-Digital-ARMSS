import { notFound, redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getAdminSession } from '@/lib/admin-auth'
import { hasPermission } from '@/lib/permission-checker'

export default async function LeadDetailsPage({ params }: { params: { id: string } }) {
  const leadId = Number(params.id)
  if (Number.isNaN(leadId)) {
    notFound()
  }

  const session = await getAdminSession()
  if (!session) {
    redirect('/login')
  }

  if (!hasPermission(session, 'LEADS_VIEW')) {
    redirect('/admin/forbidden')
  }

  const lead = await db.lead.findUnique({ where: { id: leadId } })
  if (!lead) {
    notFound()
  }
  const currentLead = lead

  const canEditLead = hasPermission(session, 'LEADS_EDIT')
  const canAddNotes = hasPermission(session, 'LEADS_ADD_NOTES')
  const canChangeStatus = hasPermission(session, 'LEADS_CHANGE_STATUS')
  const canDeleteLead = hasPermission(session, 'LEADS_DELETE')

  async function updateLead(formData: FormData) {
    'use server'
    const session = await getAdminSession()
    if (!session) {
      redirect('/login')
    }

    if (!hasPermission(session, 'LEADS_EDIT') && !hasPermission(session, 'LEADS_CHANGE_STATUS') && !hasPermission(session, 'LEADS_ADD_NOTES')) {
      redirect('/admin/forbidden')
    }

    const status = String(formData.get('status') ?? currentLead.status)
    const notes = String(formData.get('notes') ?? '')
    await db.lead.update({
      where: { id: leadId },
      data: {
        ...(hasPermission(session, 'LEADS_CHANGE_STATUS') ? { status: status as typeof currentLead.status } : {}),
        ...(hasPermission(session, 'LEADS_ADD_NOTES') ? { notes } : {})
      }
    })
    redirect(`/admin/leads/${leadId}`)
  }

  async function deleteLead() {
    'use server'
    const session = await getAdminSession()
    if (!session) {
      redirect('/login')
    }

    if (!hasPermission(session, 'LEADS_DELETE')) {
      redirect('/admin/forbidden')
    }

    await db.lead.delete({ where: { id: leadId } })
    redirect('/admin/leads')
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Lead Details</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">{lead.name}</h2>
          <p className="mt-2 text-sm text-brand-ink/65">Captured on {lead.createdAt.toLocaleString()}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Detail label="Email" value={lead.email} />
          <Detail label="Phone" value={lead.phone ?? 'N/A'} />
          <Detail label="Company" value={lead.company ?? 'N/A'} />
          <Detail label="Service" value={lead.serviceInterested} />
          <Detail label="Budget" value={lead.budget ?? 'N/A'} />
          <Detail label="Source" value={lead.source} />
        </div>

        <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-md">
          <h3 className="font-display text-2xl font-bold text-brand-navy">Message</h3>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-brand-ink/72">{lead.message}</p>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-md">
          <h3 className="font-display text-2xl font-bold text-brand-navy">Update lead</h3>
          <form action={updateLead} className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-brand-navy">Status</span>
              <select name="status" defaultValue={lead.status} className="input" disabled={!canChangeStatus && !canEditLead}>
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="converted">converted</option>
                <option value="lost">lost</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-brand-navy">Notes</span>
              <textarea name="notes" defaultValue={lead.notes ?? ''} rows={6} className="input resize-none" placeholder="Add internal notes here" disabled={!canAddNotes && !canEditLead} />
            </label>
            {canEditLead || canAddNotes || canChangeStatus ? (
              <button type="submit" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-gold px-5 font-semibold text-brand-navy shadow-sm transition-all duration-300 hover:bg-[#dfb17f] hover:shadow-lg">
                Save changes
              </button>
            ) : null}
          </form>
        </div>

        <div className="rounded-2xl border border-brand-navy/10 bg-brand-navy p-6 text-white shadow-md">
          <h3 className="font-display text-2xl font-bold">Actions</h3>
          <p className="mt-3 text-sm leading-7 text-white/72">Use this record to keep follow-ups organized and manage the lead lifecycle.</p>
          {canDeleteLead ? (
            <form action={deleteLead} className="mt-5">
              <button type="submit" className="inline-flex h-12 items-center justify-center rounded-lg border border-white/15 px-5 font-semibold text-white transition-all duration-300 hover:border-brand-gold hover:text-brand-gold">
                Delete lead
              </button>
            </form>
          ) : null}
        </div>
      </aside>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">{label}</p>
      <p className="mt-2 text-sm font-medium text-brand-navy">{value}</p>
    </div>
  )
}