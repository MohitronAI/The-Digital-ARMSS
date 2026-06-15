"use client"

import { PermissionCheckbox } from '@/components/admin/PermissionCheckbox'

export function PermissionGroup({ category, permissions, values, onToggle, onToggleAll }: { category: string; permissions: Array<{ name: string; description: string }>; values: Record<string, boolean>; onToggle: (permission: string, checked: boolean) => void; onToggleAll?: (checked: boolean) => void }) {
  const allEnabled = permissions.length > 0 && permissions.every((permission) => values[permission.name])

  return (
    <section className="rounded-[28px] border border-brand-navy/10 bg-brand-sand/20 p-5">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-display text-2xl font-semibold text-brand-navy">{category}</h4>
        {onToggleAll ? (
          <button type="button" onClick={() => onToggleAll(!allEnabled)} className="text-sm font-semibold text-brand-gold hover:text-brand-navy">
            {allEnabled ? 'Clear all' : 'Select all'}
          </button>
        ) : null}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {permissions.map((permission) => (
          <PermissionCheckbox
            key={permission.name}
            name={permission.name}
            label={permission.name}
            description={permission.description}
            checked={Boolean(values[permission.name])}
            onChange={(checked) => onToggle(permission.name, checked)}
          />
        ))}
      </div>
    </section>
  )
}