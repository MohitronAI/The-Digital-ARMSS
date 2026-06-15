"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function ResetPasswordPage({ params }: { params: { id: string } }) {
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function resetPassword() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/team/${params.id}/reset-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error ?? 'Unable to reset password')
      }

      setNewPassword(data.newPassword)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to reset password')
    } finally {
      setLoading(false)
    }
  }

  async function copyPassword() {
    await navigator.clipboard.writeText(newPassword)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 rounded-[28px] border border-brand-navy/10 bg-white p-8 shadow-md">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-gold">Password Reset</p>
      <h2 className="font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">Password Reset</h2>
      <p className="text-sm text-brand-ink/65">Generate a new temporary password and share it with the member once.</p>

      {newPassword ? (
        <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-4">
          <p className="text-sm font-semibold text-brand-navy">Password has been reset</p>
          <p className="mt-2 break-all font-mono text-sm text-brand-navy">{newPassword}</p>
          <button onClick={copyPassword} type="button" className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-brand-gold px-4 font-semibold text-brand-navy">
            Copy password
          </button>
        </div>
      ) : null}

      {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      <div className="flex gap-3">
        <button type="button" onClick={resetPassword} disabled={loading} className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-gold px-5 font-semibold text-brand-navy disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        <Link href={`/admin/team/${params.id}`} className="inline-flex h-12 items-center justify-center rounded-lg border border-brand-navy/10 px-5 font-semibold text-brand-navy">
          Back to member
        </Link>
      </div>
    </div>
  )
}