"use client"

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PermissionGroup } from '@/components/admin/PermissionGroup'

type PermissionGroupData = Record<string, Array<{ name: string; description: string }>>

export function TeamMemberForm({
  mode,
  permissions,
  memberId,
  initialValues
}: {
  mode: 'create' | 'edit'
  memberId?: number
  permissions: PermissionGroupData
  initialValues?: {
    name: string
    email: string
    status?: 'ACTIVE' | 'DISABLED'
    permissions: Record<string, boolean>
  }
}) {
  const router = useRouter()
  const [name, setName] = useState(initialValues?.name ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [status, setStatus] = useState<'ACTIVE' | 'DISABLED'>(initialValues?.status ?? 'ACTIVE')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [permissionValues, setPermissionValues] = useState<Record<string, boolean>>(initialValues?.permissions ?? {})
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [submittedCredentials, setSubmittedCredentials] = useState<{ email: string; password: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const permissionGroups = useMemo(() => Object.entries(permissions), [permissions])

  function updatePermission(permissionName: string, checked: boolean) {
    setPermissionValues((current) => ({ ...current, [permissionName]: checked }))
  }

  function updateGroup(category: string, checked: boolean) {
    const next = { ...permissionValues }
    for (const permission of permissions[category] ?? []) {
      next[permission.name] = checked
    }
    setPermissionValues(next)
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (mode === 'create' && password !== confirmPassword) {
        throw new Error('Passwords do not match.')
      }

      const payload = {
        name,
        email,
        password,
        status,
        permissions: permissionValues
      }

      const response = await fetch(mode === 'create' ? '/api/admin/team' : `/api/admin/team/${memberId ?? ''}`,
        {
          method: mode === 'create' ? 'POST' : 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error ?? 'Unable to save team member.')
      }

      if (mode === 'create') {
        setSubmittedCredentials({ email, password })
        setSuccess('Team member created successfully.')
      } else {
        setSuccess('Team member updated successfully.')
        router.refresh()
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-[28px] border border-brand-navy/10 bg-white p-6 shadow-md sm:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-navy">Full Name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} className="input" required minLength={2} maxLength={100} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-navy">Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} className="input" type="email" required disabled={mode === 'edit'} />
        </label>
      </div>

      {mode === 'create' ? (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-navy">Password</span>
            <input value={password} onChange={(event) => setPassword(event.target.value)} className="input" type="password" required minLength={8} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-navy">Confirm Password</span>
            <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="input" type="password" required minLength={8} />
          </label>
        </div>
      ) : (
        <label className="block max-w-xs">
          <span className="mb-2 block text-sm font-semibold text-brand-navy">Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as 'ACTIVE' | 'DISABLED')} className="input">
            <option value="ACTIVE">ACTIVE</option>
            <option value="DISABLED">DISABLED</option>
          </select>
        </label>
      )}

      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">Permissions</p>
          <p className="mt-2 text-sm text-brand-ink/65">Select the exact actions this member can perform.</p>
        </div>
        <div className="space-y-4">
          {permissionGroups.map(([category, groupPermissions]) => (
            <PermissionGroup
              key={category}
              category={category}
              permissions={groupPermissions}
              values={permissionValues}
              onToggle={updatePermission}
              onToggleAll={(checked) => updateGroup(category, checked)}
            />
          ))}
        </div>
      </div>

      {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      {success ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div> : null}

      {submittedCredentials ? (
        <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-4 py-3 text-sm text-brand-navy">
          <p className="font-semibold">Share these credentials once:</p>
          <p className="mt-1">Email: {submittedCredentials.email}</p>
          <p>Password: {submittedCredentials.password}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={loading} className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-gold px-5 font-semibold text-brand-navy transition-all duration-300 hover:bg-[#dfb17f] disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? 'Saving...' : mode === 'create' ? 'Create Member' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.back()} className="inline-flex h-12 items-center justify-center rounded-lg border border-brand-navy/10 px-5 font-semibold text-brand-navy hover:border-brand-gold hover:text-brand-gold">
          Cancel
        </button>
      </div>
    </form>
  )
}