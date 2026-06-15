export const PERMISSIONS = {
  DASHBOARD_ACCESS: { name: 'DASHBOARD_ACCESS', category: 'Dashboard', description: 'Access Dashboard' },
  LEADS_VIEW: { name: 'LEADS_VIEW', category: 'Leads', description: 'View Leads' },
  LEADS_EDIT: { name: 'LEADS_EDIT', category: 'Leads', description: 'Edit Leads' },
  LEADS_DELETE: { name: 'LEADS_DELETE', category: 'Leads', description: 'Delete Leads' },
  LEADS_ADD_NOTES: { name: 'LEADS_ADD_NOTES', category: 'Leads', description: 'Add Notes to Leads' },
  LEADS_CHANGE_STATUS: { name: 'LEADS_CHANGE_STATUS', category: 'Leads', description: 'Change Lead Status' },
  LEADS_ASSIGN: { name: 'LEADS_ASSIGN', category: 'Leads', description: 'Assign Leads' },
  LEADS_EXPORT: { name: 'LEADS_EXPORT', category: 'Leads', description: 'Export Leads' },
  ANALYTICS_VIEW: { name: 'ANALYTICS_VIEW', category: 'Analytics', description: 'View Analytics Dashboard' },
  ANALYTICS_EXPORT: { name: 'ANALYTICS_EXPORT', category: 'Analytics', description: 'Export Reports' },
  MARKETING_VIEW: { name: 'MARKETING_VIEW', category: 'Marketing', description: 'View Marketing Section' },
  MARKETING_MANAGE: { name: 'MARKETING_MANAGE', category: 'Marketing', description: 'Manage Marketing Campaigns' },
  TEAM_VIEW: { name: 'TEAM_VIEW', category: 'Team', description: 'View Team Members' },
  TEAM_CREATE: { name: 'TEAM_CREATE', category: 'Team', description: 'Create Team Members' },
  TEAM_EDIT: { name: 'TEAM_EDIT', category: 'Team', description: 'Edit Team Members' },
  TEAM_DELETE: { name: 'TEAM_DELETE', category: 'Team', description: 'Delete Team Members' },
  TEAM_PERMISSIONS: { name: 'TEAM_PERMISSIONS', category: 'Team', description: 'Modify Team Permissions' },
  SETTINGS_VIEW: { name: 'SETTINGS_VIEW', category: 'Settings', description: 'View Settings' },
  SETTINGS_EDIT: { name: 'SETTINGS_EDIT', category: 'Settings', description: 'Edit Settings' }
} as const

export type PermissionName = keyof typeof PERMISSIONS

export const ALL_PERMISSION_NAMES = Object.keys(PERMISSIONS) as PermissionName[]

export function getAllPermissionsGrouped() {
  return Object.values(PERMISSIONS).reduce<Record<string, Array<{ name: string; description: string }>>>((groups, permission) => {
    if (!groups[permission.category]) {
      groups[permission.category] = []
    }

    groups[permission.category].push({ name: permission.name, description: permission.description })
    return groups
  }, {})
}