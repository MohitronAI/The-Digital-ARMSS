import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function getAdminSession() {
  const session = await auth()
  if (!session?.user) {
    return null
  }

  return session
}

export function unauthorizedJsonResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function redirectIfUnauthorized(callbackUrl = '/login') {
  const session = await getAdminSession()
  if (!session) {
    redirect(callbackUrl)
  }

  return session
}