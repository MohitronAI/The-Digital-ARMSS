export function RoleIndicator({ role, name }: { role: string; name?: string }) {
  const label = role === 'SUPER_ADMIN' ? 'Super Admin' : 'Team Member'
  const className = role === 'SUPER_ADMIN' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-blue-200 bg-blue-50 text-blue-700'

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-semibold ${className}`}>
      <span>{label}</span>
      {name ? <span className="opacity-70">• {name}</span> : null}
    </span>
  )
}