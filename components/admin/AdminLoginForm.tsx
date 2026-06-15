"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export function AdminLoginForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl
      })

      if (result?.error) {
        setError('Invalid email or password.')
        return
      }

      router.replace(result?.url ?? callbackUrl)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-[28px] border border-brand-navy/10 bg-white p-6 shadow-[0_20px_80px_rgba(0,31,63,0.12)] sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">Admin Login</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-brand-navy">Secure access for the dashboard</h1>
        <p className="mt-3 text-sm leading-7 text-brand-ink/65">Sign in with your admin credentials to review leads and manage records.</p>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-brand-navy">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="input"
          placeholder="admin@thedigitalarmss.com"
          autoComplete="email"
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-brand-navy">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="input"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />
      </label>

      {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand-gold px-5 font-semibold text-brand-navy shadow-sm transition-all duration-300 hover:bg-[#dfb17f] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}