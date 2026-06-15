import { notFound, redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getAdminSession } from '@/lib/admin-auth'
import { isSuperAdmin } from '@/lib/super-admin-check'
import { getAllPermissionsGrouped } from '@/lib/permission-definitions'
import { TeamMemberForm } from '@/components/admin/TeamMemberForm'

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const session = await getAdminSession()
  if (!session || !isSuperAdmin(session)) {
    redirect('/admin/forbidden')
  }

  const teamMemberId = Number(params.id)
  if (Number.isNaN(teamMemberId)) {
    notFound()
  }

  const teamMember = await db.teamMember.findUnique({
    where: { id: teamMemberId },
    include: { permissions: { include: { permission: true } } }
  })

  if (!teamMember) {
    notFound()
  }

  const groupedPermissions = getAllPermissionsGrouped()
  const permissionValues = Object.values(groupedPermissions).flat().reduce<Record<string, boolean>>((accumulator, permission) => {
    accumulator[permission.name] = teamMember.permissions.some((memberPermission) => memberPermission.permission.name === permission.name && memberPermission.enabled)
    return accumulator
  }, {})

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Team</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">Edit Team Member</h2>
      </div>

      <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-md">
        <div className="grid gap-3 text-sm text-brand-ink/70 sm:grid-cols-2">
          <p><span className="font-semibold text-brand-navy">Email:</span> {teamMember.email}</p>
          <p><span className="font-semibold text-brand-navy">Member Since:</span> {teamMember.createdAt.toLocaleDateString()}</p>
        </div>
      </div>

      <TeamMemberForm
        mode="edit"
        memberId={teamMember.id}
        permissions={groupedPermissions}
        initialValues={{
          name: teamMember.name,
          email: teamMember.email,
          status: teamMember.status,
          permissions: permissionValues
        }}
      />
    </div>
  )
}