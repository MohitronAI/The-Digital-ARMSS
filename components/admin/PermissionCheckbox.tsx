"use client"

export function PermissionCheckbox({ name, label, description, checked, onChange }: { name: string; label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-navy/10 bg-white p-4 transition-colors hover:border-brand-gold/40">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-4 w-4 rounded border-brand-navy/20 text-brand-gold focus:ring-brand-gold" />
      <span>
        <span className="block text-sm font-semibold text-brand-navy">{label}</span>
        <span className="mt-1 block text-xs leading-6 text-brand-ink/60">{description}</span>
        <span className="sr-only">{name}</span>
      </span>
    </label>
  )
}