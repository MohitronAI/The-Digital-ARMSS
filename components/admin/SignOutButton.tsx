"use client"

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="rounded-lg border border-brand-navy/10 px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-gold hover:text-brand-gold"
    >
      Sign out
    </button>
  )
}