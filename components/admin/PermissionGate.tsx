"use client"

import type { ReactNode } from 'react'

export function PermissionGate({ allowed, children, fallback = null }: { allowed: boolean; children: ReactNode; fallback?: ReactNode }) {
  if (!allowed) {
    return <>{fallback}</>
  }

  return <>{children}</>
}