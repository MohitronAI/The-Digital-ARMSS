import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/admin-auth'
import { isSuperAdmin } from '@/lib/super-admin-check'
import { getAllPermissionsGrouped } from '@/lib/permission-definitions'
import { TeamMemberForm } from '@/components/admin/TeamMemberForm'

export default async function NewTeamMemberPage() {
  const session = await getAdminSession()
  if (!session || !isSuperAdmin(session)) {
    redirect('/admin/forbidden')
  }

  const groupedPermissions = getAllPermissionsGrouped()
  const initialPermissions = Object.values(groupedPermissions).flat().reduce<Record<string, boolean>>((accumulator, permission) => {
    accumulator[permission.name] = false
    return accumulator
  }, {})

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Team</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">Create New Team Member</h2>
      </div>
      <TeamMemberForm mode="create" permissions={groupedPermissions} initialValues={{ name: '', email: '', permissions: initialPermissions }} />
    </div>
  )
}